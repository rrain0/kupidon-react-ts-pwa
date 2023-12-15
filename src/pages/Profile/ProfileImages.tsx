/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { Controller } from '@react-spring/core'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag, useHover } from '@use-gesture/react'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { eventBuilder } from 'src/utils/react/buildEvents'
import UseFakePointerRef from 'src/utils/react/UseFakePointerRef'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { useNoTouchAction } from 'src/utils/react/useNoTouchAction'
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { Themes } from 'src/utils/theme/Themes'
import center = EmotionCommon.center
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Setter = TypeUtils.Setter
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import isPresent = CastUtils.isPresent




const springStyle =
(dragIdx: number|undefined = undefined, active = false, x = 0, y = 0) =>
(index: number/* , ctrl: Controller */) => {
  if (dragIdx===index && active) return {
    x,
    y,
    opacity: 0.4,
    //scale: index===0 ? 0.5 : 1,
    zIndex: 1,
    immediate: (key: string)=>['zIndex'].includes(key),
    config: (key: string)=>['x','y'].includes(key) ? config.stiff : config.default
  } satisfies UseSpringProps
  
  return {
    x: 0,
    y: 0,
    opacity: 1,
    //scale: 1,
    zIndex: 0,
    //immediate: false,
  } satisfies UseSpringProps
}





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
  
  const [pointerOverIdx, setPointerOverIdx] = useState(undefined as number|undefined)
  const [pressedIdx, setPressedIdx] = useState(undefined as number|undefined)
  const [playingProgressAnim, setPlayingProgressAnim] = useState(false)
  const [isDragging, setIsDragging, isDraggingRef] = useStateAndRef(false)
  
  
  useNoSelect(isPresent(pressedIdx))
  useNoTouchAction(isDragging)
  
  
  useLayoutEffect(
    ()=>{
      if (isPresent(pressedIdx)){
        const timerId = setTimeout(
          ()=>{ setPlayingProgressAnim(true) },
          150
        )
        return ()=>clearTimeout(timerId)
      }
    },
    [pressedIdx]
  )
  
  const [springs, springApi] = useSprings(images.length, springStyle(), images)
  const applyDragRef = useRef<()=>void>()
  const drag = useDrag(
    ({ args: [index], active, movement: [x,y], ...restState})=>{
      console.log(
        'idx:', index,
        'active:', active,
        'dragging:', restState.dragging,
        'hovering:', restState.hovering,
      )
      const applyDrag =
        ()=>springApi.start(springStyle(index, isDraggingRef.current && active, x, y))
      applyDragRef.current = applyDrag
      applyDrag()
      if (!active) {
        setPressedIdx(undefined)
        setPlayingProgressAnim(false)
        setIsDragging(false)
      }
    }
  )
  useEffect(
    ()=>void applyDragRef.current?.(),
    [isDragging]
  )
  
  const hover = useHover(
    ({ args: [index], active, movement: [x,y], ...restState})=>{
      console.log(
        'idx:', index,
        'active:', active,
        'dragging:', restState.dragging,
        'hovering:', restState.hovering,
      )
    }
  )
  
  useEffect(
    ()=>{
      console.log('pointerOverIdx',pointerOverIdx)
    },
    [pointerOverIdx]
  )
  
  
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
  `}
  >
    {springs.map((springStyle,i) => {
      
      return <div
        key={images[i]}
        css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
      >
        
        <UseFakePointerRef render={({ ref })=>
          <div css={css`
            display: contents;
          `}
            ref={ref as any}
            {...eventBuilder<HTMLDivElement>()
              .events('onPointerDown')
              .handlers(ev=>{
                ev.currentTarget.releasePointerCapture(ev.pointerId)
                setPressedIdx(i)
              })
              .events('onPointerCancel','onPointerUp','onPointerOut')
              .handlers(()=>{
                if (!isDragging){
                  setPressedIdx(undefined)
                  setPlayingProgressAnim(false)
                }
              })
              .build()
            }
            //onPointerLeave={ev=>setPointerOverIdx(undefined)}
            //onPointerOver={ev=>setPointerOverIdx(i)}
            /* onPointerDown={()=>setPressedIdx(i)}
             onPointerCancel={()=>setPressedIdx(undefined)}
             onPointerUp={()=>setPressedIdx(undefined)}
             onPointerOut={()=>setPressedIdx(undefined)} */
          >
            <UseFakePointerRef render={({ ref })=>
              <animated.div css={css`
                width: 100%;
                aspect-ratio: 1;
                border-radius: 14px;
                overflow: hidden;
                cursor: pointer;
              `}
                ref={ref as any}
                {...drag(i)}
                style={springStyle}
              >
                
                
                <img
                  src={images[i]}
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
                
                
              </animated.div>
            }/>
          </div>
        }/>
        
        
        
        <div
          onAnimationEnd={ev=>{
            if (ev.animationName===progressAnim.name) {
              setIsDragging(true)
              setPlayingProgressAnim(false)
            }
          }}
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
            
            ${pressedIdx===i && playingProgressAnim && css`
              animation: ${progressAnim} 0.4s linear forwards;
            `}
            ${pressedIdx===i && isDragging && css`
              --rotation: 1.001turn;
              --grad-color: ${t.photos.highlightFrameAccentBgc};
            `}
            
            background-image: conic-gradient(
                    var(--grad-color) 0turn var(--rotation),
                    transparent var(--rotation) 1turn
            );
            ${bgcBorderMask};
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
  100% {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBgc};
  }
`


