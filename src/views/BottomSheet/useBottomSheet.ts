import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import BezierEasing from 'bezier-easing'
import React, {
  useCallback,
  useEffect, useLayoutEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
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
import Setter = TypeUtils.Setter
import findLastBy3 = ArrayUtils.findLastBy3
import exists = TypeUtils.exists
import findBy3 = ArrayUtils.findBy3
import fitRange2 = MathUtils.fitRange2
import Callback = TypeUtils.Callback




/*
 maybe it’s worth adding the ability to go to a specific height, not just to snap point
*/

export const DefaultSheetSnaps = [0,'15%'/*200*/,'free','fit-content','free','50%','free','80%']
export const DefaultSheetOpenIdx = 3


// % высоты viewport в секунду
const speedThreshold = 50
const defaultAutoAnimationDuration = 400
// 'cubic-bezier(0.17,0.84,0.44,1)'
const animationEasing = BezierEasing(0.17,0.84,0.44,1)


// px/ms => (percent of viewport height)/s
const pxPerMsToPercentVpHPerS = (pxPerMs: number)=>pxPerMs*1000 / window.innerHeight * 100


/*
bugs:
 todo Move to callbacks - new state via props, but actual state will be stored inside sheet
   with callbacks on state changes
 todo Maybe move to callbacks instead of exposing state because of unnecessary rerenders
 
 todo Adjust sheet if real sheet height does not match state
 todo when dragging close, open button is not working for a long time
 */

export type SheetStableState =
  |'opened' // sheet is opened
  |'closed' // sheet is closed
export type SheetIntermediateState =
  |'open' // request to open instantly (if 'closed') (open to snap-index)
  |'close' // request to close instantly (if not 'closed' or not 'closing')
  |'snap' // request to snap to instantly (to snap-index)
  
  |'opening' // request to open animated / playing opening animation
  |'closing' // request to close animated / playing closing animation
  |'snapping' // request to snap animated / playing snapping animation
  
  |'dragging' // user is dragging the sheet
export type SheetState = SheetStableState | SheetIntermediateState


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
  setState: Setter<SheetState>
  snapIdx: number
  setSnapIdx: Setter<number>
} & PartialUndef<{
  snapPoints: SheetSnapPoints
  animationDuration: number
  //closeable: boolean
  //initialState: SheetStableState
  //initialSnapIdx: number
}>



export const useBottomSheet = (
  bottomSheetFrameRef: React.RefObject<HTMLElement>,
  bottomSheetRef: React.RefObject<HTMLElement>,
  bottomSheetHeaderRef: React.RefObject<HTMLElement>,
  bottomSheetContentRef: React.RefObject<HTMLElement>,
  options: UseBottomSheetOptions,
) => {
  
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
  
  
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  //const closeable = options.closeable ?? true
  
  
  const snapPoints = useMemo(
    ()=>{
      if (!options.snapPoints || !options.snapPoints.length)
        return DefaultSheetSnaps
      return options.snapPoints
    },
    [...(options.snapPoints??[])]
  )
  
  
  const snapPointsPx = useMemo<number[]>(
    ()=>calculateSnapPointsPx(snapPoints,computedSheetDimens),
    [snapPoints, computedSheetDimens]
  )
  
  
  const [state,setState] = useState<SheetState>('closed')
  const [snapIdx, setSnapIdx] = useState(snapPoints.length-1)
  const dragStartStateRef = useRef({ isDragging: false, sheetH: 0 })
  //const setState = options.setState
  //const setSnapIdx = options.setSnapIdx
  //const closeable = options.closeable ?? false
  
  
  const newState = options.state
  const setNewState = options.setState
  const newSnapIdx = options.snapIdx
  const setNewSnapIdx = options.setSnapIdx
  
  
  const [lastSpeed, setLastSpeed] = useState(undefined as undefined|number)
  const [sheetSpring, sheetSpringApi] = useSpring(()=>({ height: 0 }))
  
  
  
  
  const runAnimation = useCallback(
    (startH: number, endH: number, onFinish: Callback)=>{
      const duration = function(){
        if (!lastSpeed) return animationDuration
        const pathPercent = Math.abs(endH-startH)/window.innerHeight*100
        return pathPercent/lastSpeed*1.2*1000
      }()
      ;(async()=>{
        const animation = await sheetSpring.height.start(
          endH,
          {
            /* config: {
              duration: duration,
              easing: animationEasing,
            }, */
            config: {
              mass: 1 * duration / 100,
              tension: 500,
              friction: 24,
              clamp: true,
            },
          }
        )
        console.log('animation',animation)
        setLastSpeed(undefined)
        if (animation.finished) onFinish()
      })()
    },
    [animationDuration, lastSpeed]
  )
  
  
  
  
  const reactOnState = useEffectEvent(
    ()=>{
      const currH = computedSheetDimens.sheetH
      const currClosed = state==='closed'
      const currPI = snapIdx
      
      let newS = newState
      // new point index
      const newPI = fitRange2(
        newSnapIdx??currPI,[0,snapPoints.length-1]
      )
      // new point height
      const newPH = snapPointsPx[newPI]
      
      const setStateAndIndex = (state: SheetState, index: number)=>{
        if (state!=='dragging') dragStartStateRef.current.isDragging = false
        setState(state)
        setNewState(state)
        setSnapIdx(index)
        setNewSnapIdx(index)
        console.log('set states:',state,index)
      }
      const setLocalNewState = (state: SheetState)=>{ newS = state }
      
      
      // prevent infinite loops
      for (let i = 0; i < 10; i++) {
        console.log('i',i)
        console.log({
          newS, state, newPI, newPH, snapIdx, currClosed
        })
        /* if (newS===state && newPI===snapIdx) {
          setStateAndIndex(newS,newPI)
          return
        } */
        
        if(false){}
        
        // open instantly
        else if (newS==='open'){
          if (currClosed && newPH!==0){
            sheetSpring.height.set(newPH)
            setStateAndIndex('opened',newPI)
            return
          }
          else if (currClosed && newPH===0) setLocalNewState('closed')
          else if (!currClosed && newPH!==0) setLocalNewState('snap')
          else if (!currClosed && newPH===0) setLocalNewState('close')
        }
        
        // open animated
        else if (newS==='opening'){
          if (currClosed && newPH!==0){
            setStateAndIndex('opening',newPI)
            runAnimation(currH,newPH, ()=>{
              setStateAndIndex('opened',newPI)
            })
            return
          }
          else if (currClosed && newPH===0) setLocalNewState('closed')
          else if (!currClosed && newPH!==0) setLocalNewState('snapping')
          else if (!currClosed && newPH===0) setLocalNewState('closing')
        }
        
        // close instantly
        else if (newS==='close'){
          if (!currClosed){
            sheetSpring.height.set(0)
            setStateAndIndex('closed',newPI)
            return
          }
          else if (currClosed) setLocalNewState('closed')
        }
        
        // close animated
        else if (newS==='closing'){
          if (!currClosed) {
            setStateAndIndex('closing',newPI)
            runAnimation(currH, 0, ()=>{
              setStateAndIndex('closed',newPI)
            })
            return
          }
          else if (currClosed) setLocalNewState('closed')
        }
        
        // snap instantly
        else if (newS==='snap'){
          if (!currClosed && newPH!==0) {
            sheetSpring.height.set(newPH)
            setStateAndIndex('opened',newPI)
            return
          }
          else if (!currClosed && newPH===0) setLocalNewState('close')
          else if (currClosed && newPH!==0) setLocalNewState('open')
          else if (currClosed && newPH===0) setLocalNewState('closed')
        }
        
        // snap animated
        else if (newS==='snapping'){
          if (!currClosed && newPH!==0) {
            setStateAndIndex('snapping',newPI)
            runAnimation(currH,newPH,()=>{
              setStateAndIndex('opened',newPI)
            })
            return
          }
          else if (!currClosed && newPH===0) setLocalNewState('closing')
          else if (currClosed && newPH!==0) setLocalNewState('opening')
          else if (currClosed && newPH===0) setLocalNewState('closed')
        }
        
        // dragging
        else if (newS==='dragging') {
          setStateAndIndex('dragging',newPI)
          return
        }
        
        // opened
        else if (newS==='opened') {
          setStateAndIndex('opened',newPI)
          return
        }
        
        // closed
        else if (newS==='closed') {
          setStateAndIndex('closed',newPI)
          return
        }
      }
      
      
      
    }
  )
  useEffect(
    ()=>reactOnState(),
    [newState, state, newSnapIdx, snapIdx]
  )
  
  
  
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
        setNewState('dragging')
        dragStartStateRef.current.isDragging = true
        dragStartStateRef.current.sheetH = computedSheetDimensRef.current.sheetH
      }
      const newSheetH = dragStartStateRef.current.sheetH - my
      if (active && dragStartStateRef.current.isDragging) {
        sheetSpring.height.set(newSheetH)
      }
      if (last && dragStartStateRef.current.isDragging){
        dragStartStateRef.current.isDragging = false
        const speed = pxPerMsToPercentVpHPerS(spdy) // % высоты viewport в секунду
        if (speed>speedThreshold){
          setLastSpeed(speed)
          if (diry<0){
            setNewState('snapping')
            setNewSnapIdx(snapPoints.length-1)
          } else {
            setNewState('closing')
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
            setNewState('opened')
          } else {
            let snap = snapStart!
            if (snap<=-1) snap=0
            else if (snap>=snapPoints.length-1) snap=snapPoints.length-1
            else {
              const threshold = Math.round((snapPointsPx[snap]+snapPointsPx[snap+1])/2)
              if (newSheetH>threshold) snap++
            }
            setNewState('snapping')
            setNewSnapIdx(snap)
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







function calculateSnapPointsPx(
  snapPoints: (number|string)[],
  computedSheetDimens: ComputedBottomSheetDimens,
): number[] {
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
  
  const snapPointsPx: (number|undefined)[] = Array(snapPoints.length).fill(undefined)
  
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
            case '':
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
      
      const left = findLastBy3({
        arr: snapPointsPx,
        filter: elem=>exists(elem),
        startIdx: cssValueI-1,
        orElse: Number.NEGATIVE_INFINITY,
      }).elem as number
      const right = findBy3({
        arr: snapPointsPx,
        filter: elem=>exists(elem),
        startIdx: cssValueI+1,
        orElse: Number.POSITIVE_INFINITY,
      }).elem as number
      computed = fitRange2(computed,[left,right])
      
      snapPointsPx[cssValueI] = computed
    })
  })
  return snapPointsPx as number[]
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