/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { Controller } from '@react-spring/core'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag, useHover } from '@use-gesture/react'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { CastUtils } from 'src/utils/common/CastUtils'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { eventBuilder } from 'src/utils/react/buildEvents'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
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
import combineRefs = ReactUtils.combineRefs
import arrIndices = ArrayUtils.arrIndices




const springStyle =
(dragIdx: number|undefined = undefined, active = false, dx = 0, dy = 0) =>
(index: number/* , ctrl: Controller */) => {
  if (dragIdx===index && active) return {
    x: dx,
    y: dy,
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
  
  const [swap, setSwap] = useState(undefined as undefined|[number,number])
  const [pressedIdx, setPressedIdx] = useState(undefined as number|undefined)
  const [playingProgressAnim, setPlayingProgressAnim] = useState(false)
  const [isDragging, setIsDragging, isDraggingRef] = useStateAndRef(false)
  
  
  useNoSelect(isPresent(pressedIdx)) // forbid content selection
  useNoTouchAction(isDragging) // forbid gesture interception by browser
  
  
  // swaps photos
  const swapPhotosEffectEvent = useEffectEvent(
    (swap: [number,number])=>{
      const newImages = [...images]
      newImages[swap[0]] = images[swap[1]]
      newImages[swap[1]] = images[swap[0]]
      setImages(newImages)
    }
  )
  useEffect(
    ()=>{
      if (!isDragging && swap){
        swapPhotosEffectEvent(swap)
        setSwap(undefined)
      }
    },
    [isDragging, swap]
  )
  
  
  // starts selection animation after timeout
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
  
  
  const photosGrid = useRef<HTMLDivElement>(null)
  const photoFrameRefs = useRef<Array<Element|null>>(arrIndices(6).map(i=>null))
  
  
  const [springs, springApi] = useSprings(images.length, springStyle(), images)
  const applyDragRef = useRef<()=>void>()
  const drag = useDrag(
    ({
       args: [index],
       active,
       movement: [dx,dy],
       values: [vpx,vpy], // viewport x, viewport y
       ...restState
    })=>{
      /* console.log(
        'idx:', index,
        'active:', active,
        //'dragging:', restState.dragging,
        //'hovering:', restState.hovering,
        'values', values // coordinates relative to viewport
      ) */
      const applyDrag = applyDragRef.current = ()=>{
        springApi.start(springStyle(index, isDraggingRef.current && active, dx, dy))
        if (active){
          const hoveredElements = document.elementsFromPoint(vpx,vpy)
          //console.log('hoveredElements',hoveredElements)
          if (!hoveredElements.includes(photosGrid.current as any)) {
            setSwap(undefined)
          } else {
            const otherIdx = photoFrameRefs.current.findIndex((el,i)=>{
              return hoveredElements.includes(el as any)
            })
            if (otherIdx==-1) {}
            else if (index!==otherIdx) setSwap([index,otherIdx])
            else setSwap(undefined)
          }
        }
      }
      applyDrag()
      if (!active) {
        setIsDragging(false)
        setPressedIdx(undefined)
      }
    }
  )
  useEffect(
    ()=>void applyDragRef.current?.(),
    [isDragging]
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
    ref={photosGrid}
  >
    {springs.map((springStyle,i) => {
      
      return <UseFakePointerRef key={images[i]} render={({ ref, ref2, ref3, ref4 })=><div
        css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
        ref={(value)=>photoFrameRefs.current[i]=value}
      >
        
          <div css={css`
            display: contents;
          `}
            ref={ref as any}
            {...function(){
              const onPointerDown = (ev: React.PointerEvent)=>{
                ev.currentTarget.releasePointerCapture(ev.pointerId)
                setPressedIdx(i)
              }
              const onPointerRemove = ()=>{
                if (!isDragging){
                  setPressedIdx(undefined)
                  setPlayingProgressAnim(false)
                }
              }
              return {
                onPointerDown,
                onPointerCancel: onPointerRemove,
                onPointerUp: onPointerRemove,
                onPointerOut: onPointerRemove,
              }
            }()}
          >
            
              <animated.div css={css`
                width: 100%;
                aspect-ratio: 1;
                border-radius: 14px;
                overflow: hidden;
                cursor: pointer;
              `}
                style={springStyle}
                {...drag(i)}
                ref={ref3 as any}
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
          </div>
        
        
        
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
              initial-value: ${t.photos.highlightFrameBgc[0]};
              inherits: false;
            }

            ${bgcBorderMask};
            background-image: conic-gradient(
                    var(--grad-color) 0turn var(--rotation),
                    transparent var(--rotation) 1turn
            );
            
            ${pressedIdx===i && playingProgressAnim && css`
              animation: ${progressAnim} 0.4s linear forwards;
            `}
            ${pressedIdx===i && !swap && isDragging && css`
              background-image: linear-gradient(
                      to bottom right,
                      ${t.photos.highlightFrameAccentBgc[0]} 0% 100%
              );
            `}
            ${swap?.[1]===i && css`
              background-image: linear-gradient(
                      to bottom right,
                      ${t.photos.highlightFrameAccentBgc[0]} 0% 100%
              );
            `}
          `}
        />
        
        
      </div>
    }/> })}
  </div>
  
})
export default ProfileImages



const radialGradKfs = (t:Themes.Theme)=>keyframes`
  0% {
    --rotation: 0turn;
    --grad-color: ${t.photos.highlightFrameBgc[0]};
  }
  100% {
    --rotation: 1.001turn;
    --grad-color: ${t.photos.highlightFrameBgc[0]};
  }
`


