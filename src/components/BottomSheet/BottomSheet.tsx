/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import col = EmotionCommon.col
import hideScrollbar = EmotionCommon.hideScrollbar


const BottomSheet = () => {
  
  return <div // Frame
    css={css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 400px;
      ${center};
    `}
  >
    <div // Bottom Sheet
      css={css`
        ${col};
        height: 400px; min-height: auto;
        width: 300px;
      `}
    >
      <div // Some Header Component
        css={css`
          background: #282c34bb;
          color: white;
        `}
      >
        Header
      </div>
      <div // Some Body Component
        onScroll={ev=>{
          console.log('onScroll item list',ev)
        }}
        css={css`
          height: auto; min-height: auto;
          background: white;
          padding: 10px;
          overflow-y: auto;
          ${col};
        `}
      >
        <div
          css={css`
            ${col};
            height: auto; min-height: auto;
          `}
        >
          {
            [...Array(30).keys()]
              .map(i=><div key={i}>Item</div>)
          }
        </div>
      </div>
    </div>
  </div>
}
export default BottomSheet