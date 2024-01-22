/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useSpring, animated } from '@react-spring/web'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import UseFakePointerRef, { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { useUpNodesScrollLock } from 'src/utils/react/useUpNodesScrollLock'
import { AppTheme } from 'src/utils/theme/AppTheme'
import {
  ComputedBottomSheetDimens, SheetState,
  useBottomSheet, UseBottomSheetOptions,
} from 'src/views/BottomSheet/useBottomSheet'
import React, {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Callback1
import fixed = EmotionCommon.fixed
import PartialUndef = TypeUtils.PartialUndef
import contents = EmotionCommon.contents
import Callback1 = TypeUtils.Callback1
import exists = TypeUtils.exists
import stopPointerAndMouseEvents = ReactUtils.stopPointerAndMouseEvents
import combineRefs = ReactUtils.combineRefs
import onPointerClick = ReactUtils.onPointerClick




export type BottomSheetChildrenProps = {
  sheetDrag: (...args: any[]) => ReactDOMAttributes
}
export type BottomSheetRefsProps = {
  bottomSheetFrameRef: React.RefObject<HTMLElement>
  bottomSheetRef: React.RefObject<HTMLElement>
  bottomSheetHeaderRef: React.RefObject<HTMLElement>
  bottomSheetContentRef: React.RefObject<HTMLElement>
}
export type BottomSheetOptionsProps = UseBottomSheetOptions
& PartialUndef<{
  onComputedDimens: Callback1<ComputedBottomSheetDimens>
  onSnapPointsPx: Callback1<number[]>
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
    snapIdx,
    setSnapIdx,
    snapPoints,
    animationDuration,
    closeable,
    defaultOpenIdx,
    
    onComputedDimens,
    onSnapPointsPx,
    
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
  } = props
  
  
  
  
  
  const { computedSheetDimens, snapPointsPx, sheetSpring, sheetDrag } = useBottomSheet(
    bottomSheetFrameRef,
    bottomSheetRef,
    bottomSheetHeaderRef,
    bottomSheetContentRef,
    {
      state,
      setState,
      snapIdx,
      setSnapIdx,
      snapPoints,
      animationDuration,
      closeable,
      defaultOpenIdx,
    }
  )
  useLayoutEffect(
    ()=>onComputedDimens?.(computedSheetDimens),
    [computedSheetDimens]
  )
  useLayoutEffect(
    ()=>onSnapPointsPx?.(snapPointsPx),
    [snapPointsPx]
  )
  
  
  // TODO sheet
  const [openSnapIdx, setOpenSnapIdx] = useState((snapPoints??[0]).length-1)
  useLayoutEffect(
    ()=>{
      if ((['open','opening'] as SheetState[]).includes(state) && exists(snapIdx))
        setOpenSnapIdx(snapIdx)
    },
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
      if (!['closed',null].includes(state)) return `#000000${bgcDimHex}`
      else return 'none'
    }(),
    immediate: true,
  })
  
  
  useUpNodesScrollLock(bottomSheetFrameRef, !['closed',null].includes(state))
  
  
  //useLayoutEffect(()=>console.log('state',state),[state])
  
  
  useFakePointerRef([bottomSheetFrameRef,bottomSheetRef])
  
  
  return <UseFakePointerRef>{({ref, ref2, ref3})=>
    <div // Pointer & Wheel events consumer
      css={contents}
      ref={ref3 as any}
      {...stopPointerAndMouseEvents()}
    >
      
      <animated.div /* Frame */ css={frameStyle}
        style={{
          ...frameSpring,
          pointerEvents: ![null,'closed','closing'].includes(state) ? 'auto' : 'none',
        }}
        
        ref={bottomSheetFrameRef as any}
        
        // need to prevent click if dragged if frame is draggable
        onClick={ev=>{
          //console.log('dimmed background click')
          setState('closing')
        }}
      >
        <div // Pointer & Wheel events consumer
          css={contents}
          ref={ref2 as any}
          {...stopPointerAndMouseEvents()}
        >
          <animated.div /* Bottom Sheet */ css={sheetStyle}
            style={sheetSpring}
            ref={bottomSheetRef as any} // Must be
          >
            
            {props.children?.({ sheetDrag })}
          
          </animated.div>
        </div>
      </animated.div>
      
    </div>
  }</UseFakePointerRef>
})
export default BottomSheet



const frameStyle = css`
  ${fixed};
  z-index: 30;
  background: none;
  pointer-events: none;
  //touch-action: none;
  display: grid;
  place-items: end center;
`
const sheetStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: stretch;
  width: 100%;
  //overflow: hidden;
  pointer-events: auto;

  max-height: 100%; // Must be
`