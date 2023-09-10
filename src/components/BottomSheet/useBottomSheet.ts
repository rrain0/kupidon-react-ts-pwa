import React, { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { GetDimensions } from 'src/utils/GetDimensions'
import { Utils } from 'src/utils/Utils'
import fitRange = Utils.fitRange
import cmcss from 'src/styles/common.module.scss'
import empty = Utils.empty
import inRange = Utils.inRange





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

export type UseBottomSheetOptions = {
  state: SheetState
  snapIdx: number
  setState: ((state: SheetState)=>void)
  setSnapIdx: (snapIdx: number)=>void
  snapPoints?: SheetSnapPoints | empty
  animationDuration?: number | empty
}
export const useBottomSheet = (
  bottomSheetFrameRef: React.RefObject<HTMLElement>,
  bottomSheetRef: React.RefObject<HTMLElement>,
  bottomSheetHeaderRef: React.RefObject<HTMLElement>,
  bottomSheetContentRef: React.RefObject<HTMLElement>,
  options: UseBottomSheetOptions
) => {
  
  const [animation, setAnimation] = useState<Animation|undefined>(undefined)
  const [dragStart, setDragStart] = useState(undefined as
    undefined|{ pointerId: number, clientY: number, height: number, timestamp: number }
  )
  const [receivedSheetState, _setReceivedSheetState] = useState({
    frameH: 0,
    sheetH: 0,
    headerH: 0,
    contentH: 0,
    headerAndContentH: 0,
  })
  
  
  const updateReceivedSheetState = useCallback(()=>{
    const frameD = new GetDimensions(bottomSheetFrameRef.current!)
    const headerD = new GetDimensions(bottomSheetHeaderRef.current!)
    const sheetD = new GetDimensions(bottomSheetRef.current!)
    const contentD = new GetDimensions(bottomSheetContentRef.current!)
    _setReceivedSheetState({
      frameH: frameD.heightRounded,
      sheetH: sheetD.heightRounded,
      headerH: headerD.heightRounded,
      contentH: contentD.heightRounded,
      headerAndContentH: headerD.heightRounded+contentD.heightRounded,
    })
  },[bottomSheetFrameRef.current, bottomSheetRef.current])
  
  
  useLayoutEffect(()=>{
    const container = bottomSheetFrameRef.current!
    const header = bottomSheetHeaderRef.current!
    const sheet = bottomSheetRef.current!
    const resizeObserver = new ResizeObserver(()=>updateReceivedSheetState())
    resizeObserver.observe(container)
    resizeObserver.observe(sheet)
    resizeObserver.observe(header)
    updateReceivedSheetState()
    return ()=>resizeObserver.disconnect()
  },[bottomSheetFrameRef.current, bottomSheetRef.current, updateReceivedSheetState])
  
  
  const stopCurrentAction = useCallback(()=>{
    animation?.commitStyles()
    animation?.cancel()
    setAnimation(undefined)
    setDragStart(undefined)
  },[animation,dragStart])
  
  
  const state = options.state
  const animationDuration = options.animationDuration ?? 400
  const snapPoints = useMemo(function(){
    if (!options.snapPoints || !options.snapPoints.length)
      return [0,'fit-content','50%']
    return options.snapPoints
  },[options.snapPoints])
  const snapPointsPx = useMemo<number[]>(()=>{
    const snapPointsPx = snapPoints.map(it=>{
      function parsingError(parsed: CSSStyleValue): never {
        throw new Error(
          "Supported units: 'px', '%', numbers (will be 'px'). " +
          "Supported keywords: 'fit-content'. " +
          `And your value: ${parsed.toString()}`
        )
      }
      const strValue = function(){
        if (typeof it === 'number') return it+'px'
        return it
      }()
      // todo - there will be exception if parsing failed
      const parsed = CSSStyleValue.parse('height',strValue)
      
      if (parsed instanceof CSSKeywordValue){
        if (parsed.value==='fit-content') {
          return receivedSheetState.headerAndContentH
        }
        parsingError(parsed)
      }
      else if (parsed instanceof CSSUnitValue){
        if (parsed.unit==='px') return parsed.value
        if (parsed.unit==='percent') return fitRange(
          0,
          Math.round(parsed.value/100*receivedSheetState.frameH),
          receivedSheetState.frameH
        )
        parsingError(parsed)
      }
      else parsingError(parsed)
    })
    snapPoints.forEach((it,i)=>{
      if (inRange(1,i,snapPoints.length-2) && it==='fit-content')
        snapPointsPx[i] = fitRange(
          snapPointsPx[i-1],snapPointsPx[i],snapPointsPx[i+1]
        )
    })
    return snapPointsPx
  },[snapPoints, receivedSheetState])
  const snapIdx = fitRange(0,options.snapIdx??0,snapPoints.length-1)
  const setState = options.setState
  const setSnapIdx = options.setSnapIdx
  
  
  /*useEffect(()=>{
    console.log('state,snapIdx:',state,snapIdx)
  },[state,snapIdx])*/
  /*useEffect(()=>{
    console.log('snapPointsPx',snapPointsPx)
  },[snapPointsPx])*/
  /*useEffect(()=>{
    console.log('receivedSheetState',receivedSheetState)
  },[receivedSheetState])*/
  
  
  const [newSheetStyle, setNewSheetStyle] = useState<CSSProperties>({
    height: 0
  })
  
  
  const runAnimation = useCallback(
    (startH: number, endH: number, endState: SheetState)=>{
      const sheet = bottomSheetRef.current!
      const animation = sheet.animate([
        { height: startH+'px' },
        { height: endH+'px' },
      ], {
        duration: animationDuration,
        fill: 'forwards',
        easing: "cubic-bezier(0.17,0.84,0.44,1)",
      })
      setAnimation(animation)
      animation.onfinish = ev=>{
        animation.commitStyles()
        animation.cancel()
        setAnimation(undefined)
        setState(endState)
        setNewSheetStyle({ height: endH })
      }
  },
    [bottomSheetRef.current, animationDuration, setState]
  )
  
  
  const reactOnState = useCallback(
    ()=>{
      const s = state
      const i = snapIdx
      const h = receivedSheetState.sheetH
      
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
          runAnimation(h,snapPointsPx[i],'opened')
        } else {
          setState('opened')
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
          runAnimation(h,0,'closed')
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
          runAnimation(h,snapPointsPx[i],'opened')
        }
      }
      
    },
    [
      state, setState, setSnapIdx, snapIdx,
      stopCurrentAction,
      receivedSheetState,
      snapPointsPx, runAnimation
    ]
  )
  // 'reactOnState' will always be updated when calling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(reactOnState,[state,snapIdx])
  
  

  
  const onPointerDown = useCallback(
    (ev: React.PointerEvent) => {
      console.log('onPointerDown',ev)
      if (ev.buttons===1){
        stopCurrentAction()
        setState('dragging')
        const sheetH = receivedSheetState.sheetH
        setNewSheetStyle({ height: sheetH, willChange: 'height' })
        setDragStart({
          pointerId: ev.pointerId,
          clientY: ev.clientY,
          height: sheetH,
          timestamp: ev.timeStamp,
        })
        ev.currentTarget.setPointerCapture(ev.pointerId)
      }
    },
    [receivedSheetState, stopCurrentAction]
  )
  
  
  // You MUST use css 'touch-state: none;' while dragging
  // to prevent browser gesture handling on mobile devices
  const onPointerMove = useCallback(
    (ev: React.PointerEvent)=>{
      if (dragStart?.pointerId===ev.pointerId){
        //console.log('onPointerMove',ev)
        const addHeight = -(ev.clientY-dragStart.clientY)
        const newHeight = dragStart.height + addHeight
        setNewSheetStyle({ height: newHeight, willChange: 'height' })
      }
    },
    [dragStart]
  )
  
  
  const onPointerEnd = useCallback((ev: React.PointerEvent)=>{
    //console.log('onPointerEnd',ev)
    if (dragStart?.pointerId===ev.pointerId){
      const addHeight = -(ev.clientY-dragStart.clientY)
      const newHeight = dragStart.height + addHeight
      setNewSheetStyle({ height: newHeight })
      setDragStart(undefined)
      
      const speed = (newHeight-dragStart.height)*1000/(ev.timeStamp-dragStart.timestamp)
      //console.log('speed',speed)
      // todo Учитывать перемещения в течение последних 200мс
      //   и только после последней смены направления
      if (Math.abs(speed)>700){
        if (speed>0){
          setState('snapping')
          setSnapIdx(snapPointsPx.length)
        } else {
          setState('closing')
        }
      } else {
        let newSnapIdx = snapPointsPx.length-1
        for (let i = 0; i < snapPointsPx.length-1; i++) {
          const threshold = Math.round((snapPointsPx[i]+snapPointsPx[i+1])/2)
          if (newHeight<threshold) {
            newSnapIdx = i
            break
          }
        }
        setState('snapping')
        setSnapIdx(newSnapIdx)
      }
    }
  },[dragStart, setState, setSnapIdx, snapPointsPx])
  
  
  
  // forbid content selection for all elements while dragging
  useLayoutEffect(()=>{
    if (dragStart){
      document.querySelector(':root')!.classList.add(cmcss.noSelect)
      return ()=>document.querySelector(':root')!.classList.remove(cmcss.noSelect)
    } else document.querySelector(':root')!.classList.remove(cmcss.noSelect)
  },[dragStart])
  
  
  
  return {
    sheetProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      style: newSheetStyle
    },
    receivedSheetState,
    snapPointsPx,
  } as const
}


