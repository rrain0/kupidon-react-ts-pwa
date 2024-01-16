/** @jsxImportSource @emotion/react */
import { useFakePointerRef } from 'src/components/ActionProviders/UseFakePointerRef'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import BottomSheet, { BottomSheetOptionsProps } from 'src/views/BottomSheet/BottomSheet'
import { css } from '@emotion/react'
import OverflowWrapper from 'src/components/Scrollbars/OverflowWrapper'
import { OverflowWrapperStyle } from 'src/components/Scrollbars/OverflowWrapperStyle'
import React, { useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import center = EmotionCommon.center
import PartialUndef = TypeUtils.PartialUndef





export const BasicSheetSnaps = [0,'15%'/*200*/,'free','fit-content','free','50%','free','80%']
export const BasicSheetOpenIdx = 3



export type BottomSheetBasicProps =
  BottomSheetOptionsProps & PartialUndef<{
    header: React.ReactNode
    children: React.ReactNode
  }>



const BottomSheetBasic =
React.memo(
(props: BottomSheetBasicProps)=>{
  
  const { header, children, ...restProps } = props
  
  
  const bottomSheetFrameRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const bottomSheetHeaderRef = useRef<HTMLDivElement>(null)
  const bottomSheetContentRef = useRef<HTMLDivElement>(null)
  
  useFakePointerRef([bottomSheetHeaderRef])
  
  const state = props.state
  
  
  
  return <BottomSheet
    {...restProps}
    bottomSheetFrameRef={bottomSheetFrameRef}
    bottomSheetRef={bottomSheetRef}
    bottomSheetHeaderRef={bottomSheetHeaderRef}
    bottomSheetContentRef={bottomSheetContentRef}
    draggableElements={[bottomSheetHeaderRef/* ,bottomSheetFrameRef */]}
  >
    {({ sheetDrag })=><>
      {/*
       // Header Component
       // Must be without margins!!!
       */}
      <div css={t=>css`
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
        {...sheetDrag()}
      >
        
        <div /* Header handle */ css={t=>css`
          width: 44px;
          height: 4px;
          border-radius: 2px;
          background: ${t.bottomSheet.handle[0]};
          ${state==='dragging' && css`background: ${t.page.content[0]};`}
        `}/>
        
        <div css={css`
          ${center};
          min-height: 20px;
        `}>
          {header}
        </div>
      
      </div>
      
      {/*
       // Body Component
       // Must be without margins & paddings!!!
       */}
      <div css={t=>css`
        display: flex;
        place-items: center;
        overflow: hidden;
        background: ${t.bottomSheet.bgc[0]};
        color: ${t.page.content[0]};
      `}>
        <OverflowWrapper css={OverflowWrapperStyle.list}
          showVertical={
            !['opening','closing','open','close','closed'].includes(state)
          }
        >
          {/*
           // scrollable content
           // Must be without margins!!!
           */}
          <div css={css`
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
    </>}
    
  </BottomSheet>
})
export default BottomSheetBasic