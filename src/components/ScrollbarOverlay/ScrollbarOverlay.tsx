/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar
import { useScrollbar } from 'src/views/Scrollbar/useScrollbar'
import Scrollbar from 'src/views/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import React, { HTMLAttributes, useRef } from 'react'
import centerAll = EmotionCommon.centerAll
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import classNames from 'classnames'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import abs = EmotionCommon.abs



export type ScrollbarOverlayProps = {
  showVertical?: boolean|empty
  showHorizontal?: boolean|empty
  children?: React.ReactNode
  className?: HTMLAttributes<any>['className']
  style?: HTMLAttributes<any>['style']
}
const ScrollbarOverlay = (props: ScrollbarOverlayProps)=>{
  const showVertical = props.showVertical ?? true
  const showHorizontal = props.showHorizontal ?? true
  
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  
  
  
  const {
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(scrollContainerRef, scrollContentRef)
  
  
  return <div
    css={css`
      min-width: 100%; min-height: 100%;
      width: 100%; height: 100%;
      max-width: 100%; max-height: 100%;
      ${centerAll};
      position: relative;
    `}
    className={classNames(props.className, 'rrainuiScrollOverlay')}
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
    
    
    
    
    
    <div // Scrollbars
      css={css`
        ${abs};
        display: grid;
        pointer-events: none;
        grid: '.. vs' 1fr
              'hs ..' auto
            / 1fr auto;
      `}
      className={'rrainuiScrollbarsContainer'}
    >
      
      { showVertical && canScrollVertical && <Scrollbar
        css={[ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: vs;
            place-self: stretch end;
            &[data-direction=vertical] {
              height: auto;
              width: 20px;
            }
            pointer-events: auto;
        }`]}
        {...scrollbarProps}
        direction="vertical"
      /> }
      
      { showHorizontal && canScrollHorizontal && <Scrollbar
        css={[ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: hs;
            place-self: end stretch;
            &[data-direction=horizontal]{
              height: 20px;
              width: auto;
            }
            pointer-events: auto;
          }`
        ]}
        {...scrollbarProps}
        direction='horizontal'
      /> }
    
    </div>
    
    
    
  
  </div>
  
}
export default ScrollbarOverlay