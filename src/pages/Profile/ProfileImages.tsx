/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import React, { useState } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { eventBuilder } from 'src/utils/react/buildEvents'
import { Themes } from 'src/utils/theme/Themes'
import center = EmotionCommon.center
import Card from 'src/views/Card'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import Mem = ReactUtils.Mem




export type ProfileImagesProps = {
  images: string[]
  setImages: Setter<string[]>
}
const ProfileImages = ({ images, setImages }: ProfileImagesProps)=>{
  
  
  const [pressedIdx, setPressedIdx] = useState(undefined as number|undefined)
  
  
  return <div css={t=>css`
    display: grid;
    width: 100%;
    max-width: 500px;
    height: auto;
    grid:
      'im1 im1 im2' auto
      'im1 im1 im3' auto
      'im4 im5 im6' auto
     / 1fr 1fr 1fr
    ;
    place-items: stretch;
    gap: 12px;
  `}>
    {images.map((im,i) => {
      
      return <div
        /*
        draggable
        onDragStart={ev => {
          ev.dataTransfer.setData('text/plain', im)
        }}
        
        onDragOver={ev => {
          ev.preventDefault()
          ev.dataTransfer.dropEffect = 'move'
        }}
        onDrop={ev => {
          ev.preventDefault()
          const data = ev.dataTransfer.getData('text/plain')
          const thisImIdx = images.findIndex(val => val === im)
          const droppedImIdx = images.findIndex(val => val === data)
          const newImages = [...images]
          newImages[thisImIdx] = data
          newImages[droppedImIdx] = im
          setImages(newImages)
        }}
        */
        key={im}
        css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
      >
        <div
          css={css`
            width: 100%;
            aspect-ratio: 1;
            border-radius: 14px;
            overflow: hidden;
            cursor: pointer;
            user-select: none;
          `}
          {...eventBuilder()
            .events('onPointerDown')
            .handlers(()=>setPressedIdx(i))
            .events('onPointerCancel','onPointerUp','onPointerOut')
            .handlers(()=>setPressedIdx(undefined))
            .build()
          }
          /* onPointerDown={()=>setPressedIdx(i)}
          onPointerCancel={()=>setPressedIdx(undefined)}
          onPointerUp={()=>setPressedIdx(undefined)}
          onPointerOut={()=>setPressedIdx(undefined)} */
        >
          <img
            src={im}
            alt={`Profile photo ${i+1}`}
            css={css`
              /* todo restore ability of save photos */
              pointer-events: none;
              width: 100%;
              aspect-ratio: 1;
              object-position: center;
              object-fit: cover;
            `}
          />
        </div>
        <div
          onAnimationEnd={ev=>console.log("onAnimationEnd: ",ev)}
          css={t=>css`
            pointer-events: none;
            ${abs};
            inset: -7px;
            border: 3px solid transparent;
            border-radius: 20px;
            @property --rotation {
              syntax: '<angle>';
              initial-value: 0turn;
              inherits: false;
            }
            @property --grad-color {
              syntax: '<color>';
              initial-value: ${t.photos.highlightFrameBgc};
              inherits: false;
            }
            background-image: conic-gradient(
                    var(--grad-color) 0turn var(--rotation),
                    transparent var(--rotation) 1turn
            );
            ${bgcBorderMask};
            ${pressedIdx===i && css`
              animation: ${radialGradKfs(t)} 0.5s linear forwards;
            `}
          `}
        />
      </div>
    })}
  </div>
}
export default Mem(ProfileImages)



const radialGradKfs = (t:Themes.Theme)=>keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
  13% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
  99%   {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
  100%   {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameAccentBgc};
  }
`


