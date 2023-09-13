/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { SheetSnapPoints, SheetState, useBottomSheet } from './useBottomSheet'
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import { Utils } from '../../utils/Utils';
import empty = Utils.empty;


/*
  todo
   1) 'fit-header'
   2) sort of 'fit-content' / 'fit-header'
   3) free height between two snap points
*/


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
  } = props
  
  
  
  const { receivedSheetState, snapPointsPx } = useBottomSheet(
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
  
  
  
  const [openSnapIdx, setOpenSnapIdx] = useState(0)
  useEffect(()=>{
    if (['open','opening'].includes(state)) setOpenSnapIdx(snapIdx)
  },[state,snapIdx])
  
  
  const bgcDimHex = useMemo(()=>{
    return Math.trunc(
      Math.min(
        receivedSheetState.sheetH,
        snapPointsPx[openSnapIdx]
      ) / snapPointsPx[openSnapIdx]
      * 256 * 0.6
    ).toString(16).padStart(2,'0')
  },[snapPointsPx,openSnapIdx])
  
  
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
      z-index: 2;
      ${!['closed'].includes(state)
        ? css`
          pointer-events: auto;
          background: #000000${bgcDimHex};
          will-change: background;
        `
        : css`
          pointer-events: none;
        `
      }
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