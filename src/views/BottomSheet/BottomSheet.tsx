/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useWindowScrollLock } from 'src/utils/react/useWindowScrollLock'
import { useUpNodesScrollLock } from 'src/utils/react/useUpNodesScrollLock'
import { ComputedBottomSheetDimens, SheetSnapPoints, SheetState, useBottomSheet } from 'src/views/BottomSheet/useBottomSheet'
import React, {
  useEffect, useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import Setter = TypeUtils.Setter




export type BottomSheetRefsProps = {
  bottomSheetFrameRef: React.RefObject<HTMLElement>
  bottomSheetRef: React.RefObject<HTMLElement>
  bottomSheetHeaderRef: React.RefObject<HTMLElement>
  bottomSheetContentRef: React.RefObject<HTMLElement>
  draggableElements: React.RefObject<HTMLElement>[]
}
export type BottomSheetOptionsProps = {
  state: SheetState
  snapIdx: number
  setState: (action: SheetState)=>void
  setSnapIdx: (snapIdx: number)=>void
  animationDuration?: number|empty
  snapPoints: SheetSnapPoints
  children?: React.ReactNode
  setComputedDimens?: Setter<ComputedBottomSheetDimens> | empty
  setSnapPointsPx?: Setter<number[]> | empty
}
export type BottomSheetProps = BottomSheetRefsProps & BottomSheetOptionsProps
const BottomSheet = (props: BottomSheetProps) => {
  let {
    state,
    setState,
    animationDuration,
    snapPoints,
    snapIdx,
    setSnapIdx,
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    draggableElements,
    setComputedDimens,
    setSnapPointsPx,
  } = props
  
  
  
  const { computedSheetDimens, snapPointsPx } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    draggableElements,
    {
      state: state,
      setState: setState,
      animationDuration: animationDuration,
      snapPoints: snapPoints,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
    }
  )
  useLayoutEffect(
    ()=>setComputedDimens?.(computedSheetDimens),
    [setComputedDimens, computedSheetDimens]
  )
  useLayoutEffect(
    ()=>setSnapPointsPx?.(snapPointsPx),
    [setSnapPointsPx, snapPointsPx]
  )
  
  
  const [openSnapIdx, setOpenSnapIdx] = useState(0)
  useEffect(()=>{
    if (['open','opening'].includes(state)) setOpenSnapIdx(snapIdx)
  },[state,snapIdx])
  
  
  const bgcDimHex = useMemo(()=>{
    return Math.trunc(
      Math.min(
        computedSheetDimens.sheetH,
        snapPointsPx[openSnapIdx]
      ) / snapPointsPx[openSnapIdx]
      * 256 * 0.6
    ).toString(16).padStart(2,'0')
  },[snapPointsPx,openSnapIdx])
  
  
  //useWindowScrollLock(state!=='closed')
  useUpNodesScrollLock(bottomSheetFrameRef, state!=='closed')
  
  
  /*
  // Frame Pointer Events processing
  const [framePointer, setFramePointer] = useState(
    undefined as undefined|{ pointerId: number }
  )
  const onFramePointerDown = useCallback(
    (ev: React.PointerEvent)=>{
      if (ev.buttons===1){
        setFramePointer({ pointerId: ev.pointerId })
      }
    },
    []
  )
  const onFramePointerEnd = useCallback(
    (ev: React.PointerEvent)=>{
      if (framePointer?.pointerId===ev.pointerId){
        setFramePointer(undefined)
        setState('closing')
      }
    },
    [framePointer]
  )
  */
  
  
  
  return <div // Frame
    css={css`
      position: fixed;
      inset: 0;
      z-index: 30;
      background: none;
      pointer-events: none;
      ${!['closed'].includes(state) && css`
        background: #000000${bgcDimHex};
        will-change: background;
      `}
      ${!['closed','closing'].includes(state) && css`
        pointer-events: auto;
      `}
      display: grid;
      place-items: end center;
      
      // padding from frame to sheet
      //padding: 4px 4px 0 4px;

      //touch-action: none;
    `}
    ref={bottomSheetFrameRef as any}
    onClick={ev=>setState('closing')}
    /*onPointerDown={onFramePointerDown}
    onPointerUp={onFramePointerEnd}
    onPointerCancel={onFramePointerEnd}*/
  >
    <div // Pointer & Wheel events consumer
      css={css`display: contents;`}
      onPointerDown={ev=>ev.stopPropagation()}
      onPointerMove={ev=>ev.stopPropagation()}
      onPointerUp={ev=>ev.stopPropagation()}
      onPointerCancel={ev=>ev.stopPropagation()}
      onClick={ev=>ev.stopPropagation()}
      onWheel={ev=>ev.stopPropagation()}
    >
      <div // Bottom Sheet
        css={css`
          display: grid;
          grid-template-rows: auto 1fr;
          justify-items: stretch;
          width: 100%;
          //overflow: hidden;

          will-change: height; // Must be
          // Must be to prevent browser gesture handling on mobile devices
          touch-action: none;
          max-height: 100%; // Must be
        `}
        ref={bottomSheetRef as any} // Must be
      >
        
        { props.children }
        
      </div>
    </div>
  </div>
}
export default ReactMemoTyped(BottomSheet)