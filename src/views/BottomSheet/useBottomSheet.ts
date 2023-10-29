import React, {
  useCallback,
  useEffect, useLayoutEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { GetDimensions } from 'src/utils/common/GetDimensions'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import empty = TypeUtils.empty
import fitRange = MathUtils.fitRange
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { CssUtils } from 'src/utils/common/CssUtils'
import parseCssValue = CssUtils.parseCssStringValue
import CssValue = CssUtils.CssValue
import inRangeExclusive = MathUtils.inRangeExclusive
import inRange = MathUtils.inRange




/*
 maybe it’s worth adding the ability to go to a specific height, not just to snap point
*/



const movementTime = 200
const speedThreshold = 50 // % высоты viewport в секунду
const defaultAutoAnimationDuration = 400




/*
bugs:
 todo It is slow - try use react spring
 todo Adjust sheet if real sheet height does not match state
 todo Animation end rewrites state changes that have happened while animation run
 todo when dragging close, open button is not working for a long time
 todo Maybe move to callbacks instead of exposing state because of unnecessary rerenders
 */

// only 'open' & 'close' are stable states, others are intermediate
export type SheetState =
  'opened' // sheet is opened
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
  snapPoints?: SheetSnapPoints | empty
  //closeable?: boolean | empty
  animationDuration?: number | empty
}
export const useBottomSheet = (
  bottomSheetFrameRef: React.RefObject<HTMLElement>,
  bottomSheetRef: React.RefObject<HTMLElement>,
  bottomSheetHeaderRef: React.RefObject<HTMLElement>,
  bottomSheetContentRef: React.RefObject<HTMLElement>,
  draggableElements: React.RefObject<HTMLElement>[],
  options: UseBottomSheetOptions,
) => {
  
  const [animation, setAnimation] = useState<Animation|undefined>(undefined)
  const [lastSpeed, setLastSpeed] = useState(undefined as undefined|number)
  const [dragStart, setDragStart] = useState(undefined as
    undefined|{ pointerId: number, clientY: number, height: number, timestamp: number }
  )
  const [computedSheetDimens, setComputedSheetDimens] =
    useState<ComputedBottomSheetDimens>({
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
    },[
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
    },[
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
  
  const snapPoints = useMemo(function(){
    if (!options.snapPoints || !options.snapPoints.length)
      return [0,'fit-content','50%']
    return options.snapPoints
  },[...(options.snapPoints??[])])
  
  
  const snapPointsPx = useMemo<number[]>(()=>{
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
  },[snapPoints, computedSheetDimens])
  
  const snapIdx = fitRange(0,options.snapIdx??0,snapPoints.length-1)
  const setState = options.setState
  const setSnapIdx = options.setSnapIdx
  //const closeable = options.closeable ?? false
  
  
  const setNewSheetStyle = (style: { height: number })=>{
    const sheet = bottomSheetRef.current
    if (sheet){
      sheet.style.height = style.height+'px'
    }
  }
  useEffect(()=>setNewSheetStyle({ height: 0 }),[])
  
  
  const runAnimation = useCallback(
    (startH: number, endH: number, startState: SheetState, endState: SheetState)=>{
      const sheet = bottomSheetRef.current
      if (sheet){
        const duration = function(){
          if (!lastSpeed) return animationDuration
          const path = Math.abs(endH-startH)/window.innerHeight*100
          return path/Math.abs(lastSpeed*1.2)*1000
        }()
        const animation = sheet.animate([
          { height: startH+'px' },
          { height: endH+'px' },
        ], {
          duration: duration,
          fill: 'forwards',
          easing: "cubic-bezier(0.17,0.84,0.44,1)",
        })
        setAnimation(animation)
        animation.onfinish = ev=>{
          animation.commitStyles()
          animation.cancel()
          setAnimation(undefined)
          if (stateRef.current===startState) setState(endState)
        }
        animation.oncancel = ev=>{
          setLastSpeed(undefined)
        }
      }
    },
    [bottomSheetRef.current, animationDuration, setState, lastSpeed]
  )
  
  
  const stopCurrentAction = useCallback(()=>{
    animation?.commitStyles()
    animation?.cancel()
    setAnimation(undefined)
    setDragStart(undefined)
  },[animation/* ,bottomSheetRef.current */])
  
  
  const reactOnState = useCallback(
    ()=>{
      const s = state
      const i = snapIdx
      const h = computedSheetDimens.sheetH
      
      // open instantly
      if (s==='open'){
        if (h===0 && snapPointsPx[i]!==0){
          stopCurrentAction()
          setNewSheetStyle({ height: snapPointsPx[i] })
          setState('opened')
        } else {
          setState('closed')
        }
      }
      
      // open animated
      else if (s==='opening'){
        if (h===0 && snapPointsPx[i]!==0){
          stopCurrentAction()
          runAnimation(h,snapPointsPx[i],s,'opened')
        } else {
          setState('closed')
        }
      }
      
      // close instantly
      else if (s==='close'){
        if (h!==0){
          stopCurrentAction()
          setNewSheetStyle({ height: 0 })
          setState('closed')
        } else {
          setState('closed')
        }
      }
      
      // close animated
      else if (s==='closing'){
        if (h!==0){
          stopCurrentAction()
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
        else if (snapPointsPx[i]===0){
          setState('close')
        }
        else {
          stopCurrentAction()
          setNewSheetStyle({ height: snapPointsPx[i] })
          setState('opened')
        }
      }
      
      // snap animated
      else if (s==='snapping'){
        if (h===0){
          setState('opening')
        }
        else if (snapPointsPx[i]===0){
          setState('closing')
        }
        else {
          stopCurrentAction()
          runAnimation(h,snapPointsPx[i],s,'opened')
        }
      }
      
    },
    [
      state, setState, setSnapIdx, snapIdx, /* closeable, */
      stopCurrentAction,
      computedSheetDimens,
      snapPointsPx, runAnimation
    ]
  )
  const reactOnStateEffectEvent = useEffectEvent(()=>reactOnState())
  useEffect(reactOnStateEffectEvent,[state,snapIdx])
  
  
  
  const movementRef = useRef([] as Array<{ clientY: number, timestamp: number }>)
  const resetAndAddMovement = useCallback(
    (ev: { clientY: number, timeStamp: number })=>{
      movementRef.current = [{
        clientY: ev.clientY,
        timestamp: ev.timeStamp
      }]
    },
    []
  )
  const checkAndAddMovement = useCallback(
    (ev: { clientY: number, timeStamp: number })=>{
      movementRef.current = movementRef.current
        .filter(it=>(it.timestamp+movementTime)>=(document.timeline.currentTime as number|null??0))
      movementRef.current.push({
        clientY: ev.clientY,
        timestamp: ev.timeStamp
      })
    },
    []
  )
  
  
  const onPointerDown = useCallback(
    function(this: HTMLElement, ev: PointerEvent){
        //console.log('onPointerDown',ev)
        if (ev.buttons===1){
          stopCurrentAction()
          setState('dragging')
          const sheetH = computedSheetDimens.sheetH
          setNewSheetStyle({ height: sheetH })
          setDragStart({
            pointerId: ev.pointerId,
            clientY: ev.clientY,
            height: sheetH,
            timestamp: ev.timeStamp,
          })
          resetAndAddMovement(ev)
          const currentTarget = this ?? ev.currentTarget
          currentTarget.setPointerCapture(ev.pointerId)
        }
      },
    [computedSheetDimens, stopCurrentAction]
  )
  
  
  // You MUST use css 'touch-state: none;' while dragging
  // to prevent browser gesture handling on mobile devices
  const onPointerMove = useCallback(
    function(this: HTMLElement, ev: PointerEvent){
      if (dragStart?.pointerId===ev.pointerId){
        //console.log('onPointerMove',ev)
        const addHeight = -(ev.clientY-dragStart.clientY)
        const newHeight = dragStart.height + addHeight
        setNewSheetStyle({ height: newHeight })
        checkAndAddMovement(ev)
      }
    },
    [dragStart]
  )
  
  
  const onPointerEnd = useCallback(
    function(this: HTMLElement, ev: PointerEvent){
      //console.log('onPointerEnd',ev)
      if (dragStart?.pointerId===ev.pointerId){
        const addHeight = -(ev.clientY-dragStart.clientY)
        const newHeight = dragStart.height + addHeight
        setNewSheetStyle({ height: newHeight })
        setDragStart(undefined)
        checkAndAddMovement(ev)
        
        {
          let speed = 0 // % высоты viewport в секунду
          const mvs = movementRef.current
          //console.log('mvs',mvs)
          if (mvs.length>=2){
            let i = mvs.length-2
            let direction = 0
            for(; i>=0; i--){
              const d = Math.sign(mvs[i+1].clientY - mvs[i].clientY)
              if (!direction && d) direction = d
              else if (direction && d && d!==direction) break
            }
            if (direction){
              for(; i>=0; i--){
                const d = Math.sign(mvs[i+1].clientY - mvs[i].clientY)
                if (d!==0 && d!==direction) break
              }
              i++
              speed = -(mvs[mvs.length-1].clientY - mvs[i].clientY)/window.innerHeight*100/movementTime*1000
            }
          }
          movementRef.current = []
          //console.log('speed',speed)
          
          if (Math.abs(speed)>speedThreshold){
            setLastSpeed(speed)
            if (speed>0){
              setState('snapping')
              setSnapIdx(snapPointsPx.length)
            } else {
              setState('closing')
            }
          } else {
            let snapStart: undefined|number = undefined
            
            if (newHeight<snapPointsPx[0])
              snapStart=-1
            else if (newHeight>snapPointsPx[snapPointsPx.length-1])
              snapStart=snapPointsPx.length
            else for (let i = 0; i < snapPointsPx.length-1; i++) {
              if (inRangeExclusive(snapPointsPx[i],newHeight,snapPointsPx[i+1])){
                snapStart = i
                break
              }
            }
            
            const notAdjust = snapStart===undefined || (
              inRange(0,snapStart,snapPointsPx.length-2)
              && snapPoints[snapStart]==='free'
            )
            
            if (notAdjust){
              setState('opened')
            } else {
              let snap = snapStart!
              if (snap<=-1) snap=0
              else if (snap>=snapPoints.length-1) snap=snapPoints.length-1
              else {
                const threshold = Math.round((snapPointsPx[snap]+snapPointsPx[snap+1])/2)
                if (newHeight>threshold) snap++
              }
              setState('snapping')
              setSnapIdx(snap)
            }
            
          }
        }
      }
    },
    [dragStart, setState, setSnapIdx, snapPoints, snapPointsPx]
  )
  
  
  
  
  useEffect(
    ()=>{
      const draggables = draggableElements
        .map(it=>it.current)
        .filter(it=>it) as HTMLElement[]
      draggables.forEach(it=>{
        it.addEventListener('pointerdown',onPointerDown)
        it.addEventListener('pointermove',onPointerMove)
        it.addEventListener('pointerup',onPointerEnd)
        it.addEventListener('pointercancel',onPointerEnd)
      })
      return ()=>draggables.forEach(it=>{
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
  
  
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(!!dragStart)
  
  
  
  return {
    computedSheetDimens,
    snapPointsPx,
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
    ●  'free' - indicates that between prev & next snap point
      bottom sheet won't be automatically snapped to nearest snap point after dragging
    And your input: {
      raw: ${raw},
      parsed: ${JSON.stringify(parsed)}
    }`
  )
}