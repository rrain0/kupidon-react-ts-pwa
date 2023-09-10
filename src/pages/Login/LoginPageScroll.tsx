/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react'
import { useScrollbar } from 'src/components/Scrollbar/useScrollbar'
import { css } from '@emotion/react'
import Scrollbar from 'src/components/Scrollbar/Scrollbar'
import { ScrollbarStyle } from 'src/components/Scrollbar/ScrollbarStyle'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import centerAll = EmotionCommon.centerAll
import hideScrollbar = EmotionCommon.hideScrollbar
import col = EmotionCommon.col



const LoginPageScroll = ()=>{
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const {
    //containerProps,
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(containerRef, contentRef)
  
  
  
  return <div
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
      { canScrollVertical && <Scrollbar
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
      { canScrollHorizontal && <Scrollbar
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
}
export default LoginPageScroll