/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar
import { useScrollbar } from 'src/components/Scrollbar/useScrollbar'
import Scrollbar from 'src/components/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/components/Scrollbar/ScrollbarStyle'
import React, { HTMLAttributes, useRef } from 'react'
import centerAll = EmotionCommon.centerAll
import { Utils } from 'src/utils/Utils'
import empty = Utils.empty
import classNames from 'classnames'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped



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
  
  
  
  /*
  useEffect(()=>{
    const content = scrollContentRef.current
    if (content){
      console.log(
        'computed style',
        content.computedStyleMap().get('overflow-y')
      )
    }
  },[])
  */
  
  
  const {
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(scrollContainerRef, scrollContentRef)
  
  
  return <div
    css={css`
      width: 100%; height: 100%;
      ${centerAll};
    `}
    className={classNames(props.className, 'rrainuiScrollOverlay')}
    style={props.style}
  >
    
    
    <div
      css={css`
        place-self: stretch;
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
    
    
    
    
    
    <div // Scroll Container
      // must be without margins & paddings!!!
      css={css`
        ${col};
        place-self: stretch;
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
          min-width: fit-content; min-height: fit-content;
          width: fit-content; height: fit-content;
        `}
        ref={scrollContentRef}
        className={'rrainuiScrollContentWrap'}
      >
        
        { props.children }
        
      </div>
    </div>
    
    
    
    
    
  
  </div>
  
}
export default ReactMemoTyped(ScrollbarOverlay)