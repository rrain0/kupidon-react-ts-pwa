/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import React, { useLayoutEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { eventBuilder } from 'src/utils/react/buildEvents'
import UseFakePointerRef from 'src/utils/react/UseFakePointerRef'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { Themes } from 'src/utils/theme/Themes'
import center = EmotionCommon.center
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import isPresent = CastUtils.isPresent




export type ProfileImagesProps = {
  images: string[]
  setImages: Setter<string[]>
}
const ProfileImages =
React.memo(
(props: ProfileImagesProps)=>{
  const { images, setImages } = props
  const theme = useRecoilValue(ThemeRecoil).theme
  
  const progressAnim = useMemo(
    ()=>radialGradKfs(theme),
    [theme]
  )
  
  const [pressedIdx, setPressedIdx] = useState(undefined as number|undefined)
  const [playProgressAnim, setPlayProgressAnim] = useState(false)
  
  useLayoutEffect(
    ()=>{
      if (isPresent(pressedIdx)){
        const timerId = setTimeout(
          ()=>{ setPlayProgressAnim(true) },
          150
        )
        return ()=>clearTimeout(timerId)
      }
    },
    [pressedIdx]
  )
  
  
  useNoSelect(isPresent(playProgressAnim) && playProgressAnim)
  
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

    //pointer-events: none;
    //user-select: none;
    //touch-action: none;
  `}>
    {images.map((im,i) => {
      
      return <div
        key={im}
        css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
      >
        
        <UseFakePointerRef render={({ ref })=>
          <div css={css`
            width: 100%;
            aspect-ratio: 1;
            border-radius: 14px;
            overflow: hidden;
            cursor: pointer;
            position: relative;
          `}
            {...eventBuilder()
              .events('onPointerDown')
              .handlers(ev=>{
                ev.currentTarget.setPointerCapture(ev.pointerId)
                setPressedIdx(i)
              })
              .events('onPointerCancel','onPointerUp')
              .handlers(()=>{
                setPressedIdx(undefined)
                setPlayProgressAnim(false)
              })
              .build()
            }
            ref={ref as any}
            /* onPointerDown={()=>setPressedIdx(i)}
             onPointerCancel={()=>setPressedIdx(undefined)}
             onPointerUp={()=>setPressedIdx(undefined)}
             onPointerOut={()=>setPressedIdx(undefined)} */
          >
            
            
            <img
              src={im}
              alt={`Profile photo ${i+1}`}
              css={css`
              // todo restore ability of save photos
              
              pointer-events: none;
              //user-select: none;
              //touch-action: none;
              
              width: 100%;
              aspect-ratio: 1;
              object-position: center;
              object-fit: cover;
            `}
            />
            
            
          </div>
        }/>
        
        
        
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
            ${pressedIdx===i && playProgressAnim && css`
              animation: ${progressAnim} 0.4s linear forwards;
            `}
          `}
        />
        
        
      </div>
    })}
  </div>
})
export default ProfileImages



const radialGradKfs = (t:Themes.Theme)=>keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
  99.999%   {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
  100%   {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameAccentBgc};
  }
`


