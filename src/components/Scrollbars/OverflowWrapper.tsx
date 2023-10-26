/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar
import { useContainerScrollState } from 'src/views/Scrollbar/useContainerScrollState'
import React, { HTMLAttributes, useRef } from 'react'
import centerAll = EmotionCommon.centerAll
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import classNames from 'classnames'




export type OverflowWrapperProps = {
  showVertical?: boolean|empty
  showHorizontal?: boolean|empty
  children?: React.ReactNode
  className?: HTMLAttributes<any>['className']
  style?: HTMLAttributes<any>['style']
}
const OverflowWrapper = (props: OverflowWrapperProps)=>{
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true
  
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  
  
  
  return <div
    css={css`
      min-width: 100%; min-height: 100%;
      width: 100%; height: 100%;
      max-width: 100%; max-height: 100%;
      ${centerAll};
      position: relative;
    `}
    className={classNames(props.className, 'rrainuiOverflowWrapper')}
    style={props.style}
  >
    
    
    
    <div // Scrollable Content Container
      // must be without margins & paddings!!!
      css={css`
        ${col};
        //place-self: stretch;
        
        min-width: 100%; min-height: 100%;
        width: 100%; height: 100%;
        max-width: 100%; max-height: 100%;
        
        overflow: auto;
        ${hideScrollbar};
      `}
      ref={scrollContainerRef}
      className={'rrainuiScrollContainer'}
    >
      <div // Scrollable Content Wrapper
        // must be without margins & paddings - just content wrapper!!!
        css={css`
          display: flex;
          flex-flow: column nowrap;
          //min-width: fit-content; min-height: fit-content;
          width: fit-content; height: fit-content;
          //max-width: fit-content; max-height: fit-content;
          //overflow: visible;
        `}
        ref={scrollContentRef}
        className={'rrainuiScrollContentWrap'}
      >
        
        { props.children }
      
      </div>
    </div>
    
    
    <UseScrollbars
      containerRef={scrollContainerRef}
      contentRef={scrollContentRef}
      render={(
        { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
      )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
        {...scrollbarProps}
        showVertical={showVertical && canScrollVertical}
        showHorizontal={showHorizontal && canScrollHorizontal}
      />}
    />
    
  
  </div>
  
}
export default OverflowWrapper