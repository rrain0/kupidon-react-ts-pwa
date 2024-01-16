/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSpring, animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { useUpNodesScrollLock } from 'src/utils/react/useUpNodesScrollLock'
import {
  ComputedBottomSheetDimens,
  SheetSnapPoints,
  SheetState,
  useBottomSheet
} from 'src/views/BottomSheet/useBottomSheet'
import React, {
  useLayoutEffect,
  useState,
} from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Callback1
import fixed = EmotionCommon.fixed
import PartialUndef = TypeUtils.PartialUndef
import contents = EmotionCommon.contents




export type BottomSheetChildrenProps = {
  sheetDrag: (...args: any[]) => ReactDOMAttributes
}
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
  setState: Setter<SheetState>
  setSnapIdx: Setter<number>
  snapPoints: SheetSnapPoints
} & PartialUndef<{
  animationDuration: number
  setComputedDimens: Setter<ComputedBottomSheetDimens>
  setSnapPointsPx: Setter<number[]>
}>
export type BottomSheetChildren = PartialUndef<{
  children: (renderProps: BottomSheetChildrenProps)=>React.ReactNode
}>
export type BottomSheetProps =
  BottomSheetRefsProps & BottomSheetOptionsProps & BottomSheetChildren



const BottomSheet =
React.memo(
(props: BottomSheetProps) => {
  const {
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
  
  
  
  const { computedSheetDimens, snapPointsPx, sheetSpring, sheetDrag } = useBottomSheet(
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
    [computedSheetDimens]
  )
  useLayoutEffect(
    ()=>setSnapPointsPx?.(snapPointsPx),
    [snapPointsPx]
  )
  
  
  const [openSnapIdx, setOpenSnapIdx] = useState(0)
  useLayoutEffect(
    ()=>{ if (['open','opening'].includes(state)) setOpenSnapIdx(snapIdx) },
    [state,snapIdx]
  )
  
  
  
  const frameSpring = useSpring({
    background: function(){
      const bgcDimHex = function(){
        const maxDimHeight = snapPointsPx[openSnapIdx]
        const dimHeight = Math.min(computedSheetDimens.sheetH, maxDimHeight)
        return Math.trunc(dimHeight / maxDimHeight * 256 * 0.6)
          .toString(16).padStart(2,'0')
      }()
      if (state!=='close') return `#000000${bgcDimHex}`
      else return 'none'
    }(),
    immediate: true,
  })
  
  
  useUpNodesScrollLock(bottomSheetFrameRef, state!=='closed')
  
  
  //useEffect(()=>console.log('state',state),[state])
  
  
  useFakePointerRef([bottomSheetRef])
  
  
  return <animated.div /* Frame */ css={css`
    ${fixed};
    z-index: 30;
    background: none;
    pointer-events: none;
    //touch-action: none;
    display: grid;
    place-items: end center;
  `}
    style={{
      ...frameSpring,
      pointerEvents: !['closed','closing'].includes(state) ? 'auto' : 'none',
    }}
    ref={bottomSheetFrameRef as any}
    // todo prevent click if dragged
    onClick={ev=>{
      //console.log("dimmed background click")
      setState('closing')
    }}
  >
    <div // Pointer & Wheel events consumer
      css={contents}
      onPointerDown={ev=>ev.stopPropagation()}
      onPointerMove={ev=>ev.stopPropagation()}
      onPointerUp={ev=>ev.stopPropagation()}
      onPointerCancel={ev=>ev.stopPropagation()}
      onClick={ev=>ev.stopPropagation()}
      onWheel={ev=>ev.stopPropagation()}
    >
      <animated.div /* Bottom Sheet */ css={css`
        display: grid;
        grid-template-rows: auto 1fr;
        justify-items: stretch;
        width: 100%;
        //overflow: hidden;

        will-change: height; // Must be
        max-height: 100%; // Must be
      `}
        style={sheetSpring}
        ref={bottomSheetRef as any} // Must be
      >
        
        { props.children?.({ sheetDrag }) }
        
      </animated.div>
    </div>
  </animated.div>
})
export default BottomSheet