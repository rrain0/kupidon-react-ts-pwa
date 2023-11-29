/** @jsxImportSource @emotion/react */
import BottomSheet, { BottomSheetOptionsProps } from 'src/views/BottomSheet/BottomSheet'
import { css } from '@emotion/react'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import React, { useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import center = EmotionCommon.center
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem





export type BottomSheetBasicProps = BottomSheetOptionsProps & {
  header?: React.ReactNode
}
const BottomSheetBasic = (props: BottomSheetBasicProps)=>{
  
  const { header, children, ...restProps } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  
  const state = props.state
  
  
  
  return <BottomSheet
    {...restProps}
    bottomSheetFrameRef={bottomSheetFrameRef}
    bottomSheetRef={bottomSheetRef}
    bottomSheetHeaderRef={bottomSheetHeaderRef}
    bottomSheetContentRef={bottomSheetContentRef}
    draggableElements={[bottomSheetHeaderRef]}
  >
    
    <div // Header Component
      // Must be without margins!!!
      css={t=>css`
        background: ${t.bottomSheet.bgc[0]};
        border-radius: 16px 16px 0 0;
        color: ${t.page.content[0]};
        padding: 10px;
        ${col};
        align-items: center;
        gap: 6px;
        cursor: grab;
        ${state==='dragging' && css`cursor: grabbing;`}
      `}
      ref={bottomSheetHeaderRef as any}
    >
      <div
        css={t=>css`
          width: 44px;
          height: 4px;
          border-radius: 2px;
          background: ${t.bottomSheet.handle[0]};
          ${state==='dragging' && css`background: ${t.page.content[0]};`}
          will-change: background;
        `}
      />
      <div
        css={css`${center};`}
      >
        {header}
      </div>
    </div>
    
    <div // Body Component
      // Must be without margins & paddings!!!
      css={t=>css`
        display: flex;
        place-items: center;
        overflow: hidden;
        background: ${t.bottomSheet.bgc[0]};
        color: ${t.page.content[0]};
      `}
    >
      <OverflowWrapper
        css={OverflowWrapperStyle.list}
        showVertical={
          !['opening','closing','open','close','closed'].includes(state)
        }
      >
        <div // scrollable content
          // Must be without margins!!!
          css={css`
            width: 100%;
            padding: 0 10px 10px;
            ${col};
            height: fit-content;
            min-height: fit-content;
          `}
          ref={bottomSheetContentRef as any}
        >
          { children }
        </div>
      </OverflowWrapper>
    </div>
  </BottomSheet>
}
export default Mem(BottomSheetBasic)