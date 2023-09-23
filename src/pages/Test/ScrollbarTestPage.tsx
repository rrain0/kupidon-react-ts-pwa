/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react'
import { useScrollbar } from 'src/views/Scrollbar/useScrollbar'
import { css } from '@emotion/react'
import Scrollbar from 'src/views/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/views/Scrollbar/ScrollbarStyle'
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import centerAll = EmotionCommon.centerAll
import hideScrollbar = EmotionCommon.hideScrollbar
import { SimplePage } from 'src/components/Page/SimplePage'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent



const ScrollbarTestPage = ()=>{
  return <Page>
    <PageContent>
      
      <div>Scrollbar Test Page</div>
      
      <ScrollbarTest showVertical={true} showHorizontal={true}/>
      <ScrollbarTest showVertical={true}/>
      <ScrollbarTest showHorizontal={true}/>
      
    </PageContent>
  </Page>
}
export default ScrollbarTestPage





const ScrollbarTest = (
  props: {
    showVertical?: boolean|empty
    showHorizontal?: boolean|empty
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const {
    //containerProps,
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(containerRef, contentRef)
  
  return <div
    css={css`
      ${col};
      gap: 10px;
      width: fit-content; height: fit-content;
    `}
  >
    
    <div>Scrollbar Test: {
      ['vertical','horizontal'].filter(it=>{
        if (it==='vertical' && props.showVertical && canScrollVertical) return true
        if (it==='horizontal' && props.showHorizontal && canScrollHorizontal) return true
        return false
      }).join(' & ')
    }
    </div>
    
    <div
      css={t=>css`
        width: auto; min-width: 200px; max-width: 400px;
        height: 340px;
        ${centerAll};
      `}
    >
      <div css={t=>css`
        width: 100%; height: 100%;
        display: flex;
        //background: darkslategray;
        overflow: scroll;
        ${hideScrollbar};
      `}
        ref={containerRef}
        //{...containerProps}
      >
        <div
          css={t=>css`
            width: fit-content; height: fit-content;
            ${col};
            background: linear-gradient(
              to bottom right,
              ${t.page.bgc2[0]} 0%,
              ${t.page.bgc2[1]} 50%,
              ${t.page.bgc2[2]} 100%
            );
          `}
          ref={contentRef}
        >
          {
            [...Array(40).keys()]
              .map(i=><div
                css={css`
                  width: 1200px;
                  height: auto;
                `}
                key={i}
              >
                Item {i+1}
              </div>)
          }
        </div>
      </div>
      
      <div
        css={css`
          place-self: stretch;
          display: grid;
          pointer-events: none;
          grid: '.. vs' 1fr
                'hs ..' auto
               / 1fr auto;
        `}
      >
        { props.showVertical && canScrollVertical && <Scrollbar
          css={[ScrollbarStyle.scrollbar, css`
            &.rrainuiScrollbarTrack {
              grid-area: vs;
              place-self: start end;
              &[data-direction=vertical]{
                width: 20px;
              }
              pointer-events: auto;
            }`
          ]}
          {...scrollbarProps}
          direction='vertical'
        /> }
        { props.showHorizontal && canScrollHorizontal && <Scrollbar
          css={[ScrollbarStyle.scrollbar, css`
            &.rrainuiScrollbarTrack {
              grid-area: hs;
              place-self: end start;
              &[data-direction=horizontal]{
                height: 20px;
              }
              pointer-events: auto;
            }`
          ]}
          {...scrollbarProps}
          direction='horizontal'
        /> }
      </div>
    
    </div>
  
  </div>
}


