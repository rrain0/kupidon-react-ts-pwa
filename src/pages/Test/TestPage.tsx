/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar
import { useRef } from 'react'
import { useScrollbar } from 'src/components/Scrollbar/useScrollbar'
import Scrollbar from 'src/components/Scrollbar/Scrollbar'
import { Utils } from 'src/utils/Utils'
import empty = Utils.empty
import { ScrollbarStyle } from 'src/components/Scrollbar/ScrollbarStyle'




const TestPage = () => {
  
  return <div css={t=>css`
    ${col};
    gap: 20px;
    padding: 20px;
    background: ${t.type==='light'?'#f5f5f5':'#282c34'};
    color: ${t.page.text[0]};
  `}>
    
    
    <div>Test Page</div>
    
    
    <ScrollbarTest showVertical={true} showHorizontal={true} />
    <ScrollbarTest showVertical={true} />
    <ScrollbarTest showHorizontal={true} />
    
    
  </div>
}
export default TestPage




const ScrollbarTest = (
  props: {
    showVertical?: boolean|empty
    showHorizontal?: boolean|empty
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const {
    containerProps,
    scrollbarProps,
    canScrollHorizontal,
    canScrollVertical,
  } = useScrollbar(containerRef, contentRef)
  
  return <div css={t=>css`
    ${col};
    background: ${t.type==='light'?'white':'black'};
  `}>
    
    <div>Scrollbar Test</div>
    
    <div css={css`
        display: grid;
        grid: 'c';
      `}
    >
      <div css={css`
        grid-area: c;
        width: 340px; height: 340px;
        display: flex;
        //background: darkslategray;
        overflow: scroll;
        ${hideScrollbar};
      `}
        ref={containerRef}
        {...containerProps}
      >
        <div css={css`
          width: auto; height: auto;
          ${col};
        `}
          ref={contentRef}
        >
          {
            [...Array(60).keys()]
              .map(i=><div
                css={css`
                width: 1600px;
              `}
                key={i}
              >
                Item {i+1}
              </div>)
          }
        </div>
      </div>
      
      <div css={css`
          grid-area: c;
          place-self: stretch;
          display: grid;
          pointer-events: none;
          grid: '.. vs' 1fr
                'hs ..' auto
               / 1fr auto;
        `}
      >
        { props.showVertical && canScrollVertical && <Scrollbar css={[
          ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: vs;
            place-self: start end;
            &[data-direction=vertical]{
              width: 20px;
            }
            pointer-events: auto;
          }`]}
          {...scrollbarProps}
          direction='vertical'
        /> }
        { props.showHorizontal && canScrollHorizontal && <Scrollbar css={[
          ScrollbarStyle.scrollbar, css`
          &.rrainuiScrollbarTrack {
            grid-area: hs;
            place-self: end start;
            &[data-direction=horizontal]{
              height: 20px;
            }
            pointer-events: auto;
          }`]}
          {...scrollbarProps}
          direction='horizontal'
        /> }
      </div>
    
    </div>
    
  </div>
}