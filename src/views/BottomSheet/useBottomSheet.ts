import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import BezierEasing from 'bezier-easing'
import React, {
  useCallback,
  useEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { GetDimensions } from 'src/utils/common/GetDimensions'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import fitRange = MathUtils.fitRange
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { CssUtils } from 'src/utils/common/CssUtils'
import parseCssValue = CssUtils.parseCssStringValue
import CssValue = CssUtils.CssValue
import inRangeExclusive = MathUtils.inRangeExclusive
import inRange = MathUtils.inRange
import PartialUndef = TypeUtils.PartialUndef
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import notExists = TypeUtils.notExists




/*
 maybe it’s worth adding the ability to go to a specific height, not just to snap point
*/



// % высоты viewport в секунду
const speedThreshold = 50
const defaultAutoAnimationDuration = 400
// 'cubic-bezier(0.17,0.84,0.44,1)'
const animationEasing = BezierEasing(0.17,0.84,0.44,1)


// px/ms => (percent of viewport height)/s
const pxPerMsToPercentVpHPerS = (pxPerMs: number)=>pxPerMs*1000 / window.innerHeight * 100


/*
bugs:
 todo Adjust sheet if real sheet height does not match state
 todo when dragging close, open button is not working for a long time
 todo Maybe move to callbacks instead of exposing state because of unnecessary rerenders
 */

// only 'opened' & 'closed' are stable states, others are intermediate
export type SheetState =
  |'opened' // sheet is opened
  |'closed' // sheet is closed
  
  |'open' // request to open instantly (if 'closed') (open to snap-index)
  |'close' // request to close instantly (if not 'closed' or not 'closing')
  |'snap' // request to snap to instantly (to snap-index)
  
  |'opening' // request to open animated / playing opening animation
  |'closing' // request to close animated / playing closing animation
  |'snapping' // request to snap animated / playing snapping animation
  
  |'dragging' // user is dragging the sheet
export type SheetSnapPoints = Array<number|string>
export type ComputedBottomSheetDimens = {
  frameH: number,
  sheetH: number,
  headerH: number,
  contentH: number,
  headerAndContentH: number,
}

export type UseBottomSheetOptions = {
  state: SheetState
  snapIdx: number
  setState: ((state: SheetState)=>void)
  setSnapIdx: (snapIdx: number)=>void
} & PartialUndef<{
  snapPoints: SheetSnapPoints
  //closeable?: boolean
  animationDuration: number
}>



export const useBottomSheet = (
  bottomSheetFrameRef: React.RefObject<HTMLElement>,
  bottomSheetRef: React.RefObject<HTMLElement>,
  bottomSheetHeaderRef: React.RefObject<HTMLElement>,
  bottomSheetContentRef: React.RefObject<HTMLElement>,
  draggableElements: React.RefObject<HTMLElement>[],
  options: UseBottomSheetOptions,
) => {
  
  const [lastSpeed, setLastSpeed] = useState(undefined as undefined|number)
  const [computedSheetDimens, setComputedSheetDimens, computedSheetDimensRef] =
    useStateAndRef<ComputedBottomSheetDimens>({
      frameH: 0,
      sheetH: 0,
      headerH: 0,
      contentH: 0,
      headerAndContentH: 0,
    })
  
  
  const updateComputedSheetDimens = useCallback(
    ()=>{
      const frame = bottomSheetFrameRef.current
      const sheet = bottomSheetRef.current
      const header = bottomSheetHeaderRef.current
      const content = bottomSheetContentRef.current
      if (frame && sheet && header && content){
        const frameD = new GetDimensions(frame)
        const sheetD = new GetDimensions(sheet)
        const headerD = new GetDimensions(header)
        const contentD = new GetDimensions(content)
        setComputedSheetDimens({
          frameH: frameD.height,
          sheetH: sheetD.height,
          headerH: headerD.height,
          contentH: contentD.height,
          headerAndContentH: headerD.height+contentD.height,
        })
      }
    },
    [
      bottomSheetFrameRef.current,
      bottomSheetRef.current,
      bottomSheetHeaderRef.current,
      bottomSheetContentRef.current,
    ]
  )
  
  
  useEffect(
    ()=>{
      updateComputedSheetDimens()
      const frame = bottomSheetFrameRef.current
      const sheet = bottomSheetRef.current
      const header = bottomSheetHeaderRef.current
      const content = bottomSheetContentRef.current
      if (frame || sheet || header || content){
        const resizeObserver = new ResizeObserver(()=>updateComputedSheetDimens())
        frame && resizeObserver.observe(frame)
        sheet && resizeObserver.observe(sheet)
        header && resizeObserver.observe(header)
        content && resizeObserver.observe(content)
        return ()=>resizeObserver.disconnect()
      }
    },
    [
      bottomSheetFrameRef.current,
      bottomSheetRef.current,
      bottomSheetHeaderRef.current,
      bottomSheetContentRef.current,
      updateComputedSheetDimens,
    ]
  )
  
  
  const state = options.state
  const stateRef = useRef(state); stateRef.current = state
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  
  const snapPoints = useMemo(
    ()=>{
      if (!options.snapPoints || !options.snapPoints.length)
        return [0,'fit-content','50%']
      return options.snapPoints
    },
    [...(options.snapPoints??[])]
  )
  
  
  const snapPointsPx = useMemo<number[]>(
    ()=>{
      const allowedUnits = ['px','',undefined,'%']
      const allowedKeywords = ['fit-content','fit-header','free']
      const snapPointsCssValues = snapPoints.map(it=>{
        const cssValue = parseCssValue(it+'')
        if (
          !cssValue
          || (cssValue.type==='keyword' && !allowedKeywords.includes(cssValue.value))
          || (cssValue.type==='numeric' && !allowedUnits.includes(cssValue.unit))
        ) cssValueParsingError(it, cssValue)
        return cssValue
      })
      
      const snapPointsPx: Array<number|undefined> = [...Array(snapPoints.length).keys()].map(it=>undefined)
      
      ;[['px','',undefined],['%'],['fit-content','fit-header'],['free']].forEach(units=>{
        snapPointsCssValues.forEach((cssValue,cssValueI)=>{
          
          if (
            (cssValue.type==='keyword' && !units.includes(cssValue.value))
            || (cssValue.type==='numeric' && !units.includes(cssValue.unit))
          ) return
          
          let computed = function(){
            if (cssValue.type==='keyword') {
              switch (cssValue.value) {
                case 'fit-content':
                  return computedSheetDimens.headerAndContentH
                case 'fit-header':
                  return computedSheetDimens.headerH
                case 'free':
                  return 0 // will be adjusted
                default:
                  cssValueParsingError(snapPoints[cssValueI], cssValue)
              }
            }
            if (cssValue.type==='numeric') {
              switch (cssValue.unit) {
                case 'px':
                case undefined:
                  return fitRange(
                    0,
                    +cssValue.value,
                    computedSheetDimens.frameH,
                  )
                case '%':
                  return fitRange(
                    0,
                    Math.round(+cssValue.value / 100 * computedSheetDimens.frameH),
                    computedSheetDimens.frameH,
                  )
                default:
                  cssValueParsingError(snapPoints[cssValueI], cssValue)
              }
            }
            cssValueParsingError(snapPoints[cssValueI], cssValue)
          }()
          
          const left = function(){
            for (let i = cssValueI-1; i>=0; i--) {
              if (snapPointsPx[i]!==undefined) return snapPointsPx[i]
            }
          }() ?? Number.NEGATIVE_INFINITY
          const right = function(){
            for (let i = cssValueI+1; i<snapPointsPx.length; i++) {
              if (snapPointsPx[i]!==undefined) return snapPointsPx[i]
            }
          }() ?? Number.POSITIVE_INFINITY
          computed = fitRange(left,computed,right)
          
          snapPointsPx[cssValueI] = computed
        })
      })
      return snapPointsPx as number[]
    },
    [snapPoints, computedSheetDimens]
  )
  
  const snapIdx = fitRange(0,options.snapIdx??0,snapPoints.length-1)
  const setState = options.setState
  const setSnapIdx = options.setSnapIdx
  //const closeable = options.closeable ?? false
  
  
  const [sheetSpring, sheetSpringApi] = useSpring(()=>({ height: 0 }))
  
  
  const runAnimation = useCallback(
    (startH: number, endH: number, startState: SheetState, endState: SheetState)=>{
      const duration = function(){
        if (!lastSpeed) return animationDuration
        const pathPercent = Math.abs(endH-startH)/window.innerHeight*100
        return pathPercent/lastSpeed*1.2*1000
      }()
      ;(async()=>{
        const animation = await sheetSpring.height.start(
          endH,
          {
            config: {
              duration: duration,
              easing: animationEasing,
            },
          }
        )
        //console.log('animation',{...animation})
        setLastSpeed(undefined)
        if (animation.finished) {
          if (stateRef.current===startState) setState(endState)
        }
      })()
    },
    [animationDuration, lastSpeed]
  )
  
  
  
  
  const reactOnState = useCallback(
    ()=>{
      const s = state
      const ph = snapPointsPx[snapIdx]
      const h = computedSheetDimens.sheetH
      
      // open instantly
      if (s==='open'){
        if (h===0 && ph!==0){
          //stopCurrentAction()
          sheetSpring.height.set(ph)
          setState('opened')
        } else {
          setState('closed')
        }
      }
      
      // open animated
      else if (s==='opening'){
        if (h===0 && ph!==0){
          //stopCurrentAction()
          runAnimation(h,ph,s,'opened')
        } else {
          setState('closed')
        }
      }
      
      // close instantly
      else if (s==='close'){
        if (h!==0){
          //stopCurrentAction()
          sheetSpring.height.set(0)
          setState('closed')
        } else {
          setState('closed')
        }
      }
      
      // close animated
      else if (s==='closing'){
        if (h!==0){
          //stopCurrentAction()
          runAnimation(h,0,s,'closed')
        } else {
          setState('closed')
        }
      }
      
      // snap instantly
      else if (s==='snap'){
        if (h===0){
          setState('open')
        }
        else if (ph===0){
          setState('close')
        }
        else {
          //stopCurrentAction()
          sheetSpring.height.set(ph)
          setState('opened')
        }
      }
      
      // snap animated
      else if (s==='snapping'){
        if (h===0){
          setState('opening')
        }
        else if (ph===0){
          setState('closing')
        }
        else {
          //stopCurrentAction()
          runAnimation(h,ph,s,'opened')
        }
      }
      
    },
    [
      state, snapIdx, /* closeable, */
      computedSheetDimens,
      snapPointsPx, runAnimation
    ]
  )
  const reactOnStateEffectEvent = useEffectEvent(()=>reactOnState())
  useEffect(reactOnStateEffectEvent,[state,snapIdx])
  
  
  
  
  
  /*
  useEffect(
    ()=>{
      const draggables = draggableElements
        .map(it=>it.current)
        .filter(it=>it) as HTMLElement[]
      draggables.forEach(it=>{
        it.classList.add(commonCss.noTouchAction)
        it.addEventListener('pointerdown',onPointerDown)
        it.addEventListener('pointermove',onPointerMove)
        it.addEventListener('pointerup',onPointerEnd)
        it.addEventListener('pointercancel',onPointerEnd)
      })
      return ()=>draggables.forEach(it=>{
        it.classList.remove(commonCss.noTouchAction)
        it.removeEventListener('pointerdown',onPointerDown)
        it.removeEventListener('pointermove',onPointerMove)
        it.removeEventListener('pointerup',onPointerEnd)
        it.removeEventListener('pointercancel',onPointerEnd)
      })
    },
    [
      ...draggableElements.map(it=>it.current),
      onPointerDown, onPointerMove, onPointerEnd,
    ]
  )
   */
  
  
  
  const dragStartStateRef = useRef({ sheetH: 0 })
  // You MUST use css 'touch-action: none;' before start dragging
  // to prevent browser gesture handling
  // noinspection JSVoidFunctionReturnValueUsed
  const sheetDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        movement: [mx,my],
        velocity: [spdx,spdy], // px/ms (nonnegative)
        direction: [dirx,diry], // positive for y is from top to bottom
        xy: [vpx,vpy], // viewport x, viewport y
      } = gesture
      
      /* console.log(
        'velocityY:', spdy,
        'directionY:', diry,
      ) */
      
      if (first) {
        setState('dragging')
        dragStartStateRef.current.sheetH = computedSheetDimensRef.current.sheetH
      }
      const newSheetH = dragStartStateRef.current.sheetH - my
      if (active) {
        sheetSpring.height.set(newSheetH)
      }
      if (last){
        //setState('opened')
        const speed = pxPerMsToPercentVpHPerS(spdy) // % высоты viewport в секунду
        if (speed>speedThreshold){
          setLastSpeed(speed)
          if (diry<0){
            setState('snapping')
            setSnapIdx(snapPointsPx.length)
          } else {
            setState('closing')
          }
        } else {
          let snapStart: undefined|number = undefined
          
          if (newSheetH<snapPointsPx[0])
            snapStart=-1
          else if (newSheetH>snapPointsPx[snapPointsPx.length-1])
            snapStart=snapPointsPx.length
          else for (let i = 0; i < snapPointsPx.length-1; i++) {
              if (inRangeExclusive(snapPointsPx[i],newSheetH,snapPointsPx[i+1])){
                snapStart = i
                break
              }
            }
          
          const notAdjust = notExists(snapStart) || (
            inRange(0,snapStart!,snapPointsPx.length-2)
            && snapPoints[snapStart!]==='free'
          )
          
          if (notAdjust){
            setState('opened')
          } else {
            let snap = snapStart!
            if (snap<=-1) snap=0
            else if (snap>=snapPoints.length-1) snap=snapPoints.length-1
            else {
              const threshold = Math.round((snapPointsPx[snap]+snapPointsPx[snap+1])/2)
              if (newSheetH>threshold) snap++
            }
            setState('snapping')
            setSnapIdx(snap)
          }
          
        }
      }
      
    }
  ) as (...args: any[]) => ReactDOMAttributes
  
  
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(state==='dragging')
  
  
  
  return {
    computedSheetDimens,
    snapPointsPx,
    sheetSpring,
    sheetDrag,
  } as const
}






function cssValueParsingError(raw: string|number, parsed: CssValue|undefined): never {
  throw new Error(
    `Supported units:
    ● 'px' - just raw pixels
    ● numbers - will be 'px' - just raw pixels typeof number
    ● '' - empty string - will be 'px'
    ● '%' - % of height of element in frameRef
    Supported keywords:
    ● 'fit-header' - height of element in headerRef
    ● 'fit-content' - height of element in headerRef + height of element in contentRef
    ● 'free' - indicates that between prev & next snap point
      bottom sheet won't be automatically snapped to nearest snap point after dragging
    And your input: {
      raw: ${raw},
      parsed: ${JSON.stringify(parsed)}
    }`
  )
}