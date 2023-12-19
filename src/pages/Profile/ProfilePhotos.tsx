/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Controller } from '@react-spring/core'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useRecoilValue } from 'recoil'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { FileUtils } from 'src/utils/common/FileUtils'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { useNoTouchAction } from 'src/utils/react/useNoTouchAction'
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { Themes } from 'src/utils/theme/Themes'
import center = EmotionCommon.center
import { TypeUtils } from 'src/utils/common/TypeUtils'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import UseModalSheetState from 'src/views/BottomSheet/UseModalSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import Setter = TypeUtils.Setter
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import arrIndices = ArrayUtils.arrIndices
import PlusIc = SvgIcons.PlusIc
import contents = EmotionCommon.contents
import row = EmotionCommon.row
import col = EmotionCommon.col
import CrossInCircleIc = SvgIcons.CrossInCircleIc
import resetH = EmotionCommon.resetH
import ArrowRefreshCwIc = SvgIcons.ArrowRefreshCwIc
import Txt = EmotionCommon.Txt
import Spinner8LinesIc = SvgIcons.Spinner8LinesIc
import * as uuid from 'uuid'
import readToDataUrl = FileUtils.readToDataUrl





// todo restore ability of download / save photos



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
    immediate: true,
  } satisfies UseSpringProps
}



export type ProfilePhoto = undefined | {
  id: string
  state: 'ready'|'reading'
  url: string|undefined
}
export interface ProfilePhotoArr extends Array<ProfilePhoto> { length: 6 }



export type ProfilePhotosProps = {
  images:ProfilePhotoArr
  setImages: Setter<ProfilePhotoArr>
}
const ProfilePhotos =
React.memo(
(props: ProfilePhotosProps)=>{
  const { images, setImages } = props
  const { theme } = useRecoilValue(ThemeRecoil)
  const { isDraggingFiles } = useRecoilValue(AppRecoil)
  const actionUiValues = useUiTextContainer(ActionUiText)
  
  
  const progressAnim = useMemo(
    ()=>radialGradKfs(theme),
    [theme]
  )
  
  const [lastIdx, setLastIdx] = useState(0)
  
  const [dragState, setDragState, dragStateRef] = useStateAndRef(
    undefined as undefined|'initialDelay'|'progressAnim'|'dragging'
  )
  const [swap, setSwap] = useState(undefined as undefined|[number,number])
  
  const [canClick, setCanClick] = useState(true)
  const [isMenuOpen,setMenuOpen] = useState(false)
  
  
  useNoSelect(!!dragState) // forbid content selection
  useNoTouchAction(dragState==='dragging') // forbid gesture interception by browser
  
  
  // swaps photos
  const swapPhotosEffectEvent = useEffectEvent(
    (swap: [number,number])=>{
      const newImages = [...images] as ProfilePhotoArr
      newImages[swap[0]] = images[swap[1]]
      newImages[swap[1]] = images[swap[0]]
      setImages(newImages)
    }
  )
  useLayoutEffect(
    ()=>{
      if (!dragState && swap){
        swapPhotosEffectEvent(swap)
        setSwap(undefined)
      }
    },
    [dragState, swap]
  )
  
  
  // starts selection animation after timeout
  useLayoutEffect(
    ()=>{
      if (dragState==='initialDelay'){
        const timerId = setTimeout(
          ()=>setDragState('progressAnim'),
          150
        )
        return ()=>clearTimeout(timerId)
      }
    },
    [dragState]
  )
  
  
  const photosGrid = useRef<HTMLDivElement>(null)
  const photoFrameRefs = useRef<Array<Element|null>>(arrIndices(6).map(i=>null))
  
  
  const [springs, springApi] = useSprings(images.length, springStyle(), [images])
  const applyDragRef = useRef<()=>void>()
  const drag = useDrag(
    ({
       args: [index],
       active, last,
       movement: [dx,dy],
       xy: [vpx,vpy], // viewport x, viewport y
       ...restState
    })=>{
      /* console.log(
        'idx:', index,
        'active:', active,
        //'dragging:', restState.dragging,
        //'hovering:', restState.hovering,
        'last', restState.last,
      ) */
      const applyDrag = ()=>{
        const isDragging = dragStateRef.current==='dragging' && active
        springApi.start(springStyle(index, isDragging, dx, dy))
        if (isDragging){
          const hoveredElements = document.elementsFromPoint(vpx,vpy)
          //console.log('hoveredElements',hoveredElements)
          if (!hoveredElements.includes(photosGrid.current as any)) {
            setSwap(undefined)
          } else {
            const otherIdx = photoFrameRefs.current.findIndex(el=>{
              return hoveredElements.includes(el as any)
            })
            if (otherIdx==-1) {/* nothing to do */}
            else if (index!==otherIdx) setSwap([index,otherIdx])
            else setSwap(undefined)
          }
        }
      }
      applyDrag()
      applyDragRef.current = applyDrag
      if (last) {
        setDragState(undefined)
        applyDragRef.current = undefined
      }
    }
  )
  useEffect(
    ()=>{ if (dragState==='dragging') applyDragRef.current?.() },
    [dragState]
  )
  
  
  
  const replacePhotoEffectEvent = useEffectEvent(
    (newPhoto: ProfilePhoto, oldPhoto: ProfilePhoto)=>{
      if (oldPhoto===undefined) return
      let found = false
      const newImages = images.map(it=>{
        if (it===oldPhoto) {
          found = true
          return newPhoto
        }
        return it
      }) as ProfilePhotoArr
      
      console.log({
        newPhoto,
        oldPhoto,
        images,
        found,
      })
      if (found) setImages(newImages)
    }
  )
  const onPhotoFiles = useCallback(
    (files: File[])=>{
      /* console.log({
        images: images,
        lastIdx: lastIdx,
        files: files,
      }) */
      const imgFile = files.find(it=>it.type.startsWith('image/'))
      if (imgFile){
        const readingPhoto: ProfilePhoto = {
          id: uuid.v4(),
          state: 'reading',
          url: undefined
        }
        const newImages = [...images] as ProfilePhotoArr
        newImages[lastIdx] = readingPhoto
        setImages(newImages)
        readToDataUrl(imgFile)
        .then(imgDataUrl=>{
          const newPhoto: ProfilePhoto = {
            id: uuid.v4(),
            state: 'ready',
            url: imgDataUrl
          }
          replacePhotoEffectEvent(newPhoto, readingPhoto)
          setMenuOpen(false)
        })
        .catch(()=>{
          replacePhotoEffectEvent(undefined, readingPhoto)
        })
      }
    },
    [images, lastIdx, setImages]
  )
  
  
  
  
  return <>
    
    <div css={photosGridStyle}
      ref={photosGrid}
    >
      {springs.map((springStyle,i) => {
        const im = images[i]
        return <div css={contents} key={im?.id??i}>
        <UseFakePointerRef render={({ ref, ref2, ref3, ref4 })=>
        <div css={css`
          grid-area: im${i+1};
          position: relative;
          ${center};
        `}
          ref={(value)=>photoFrameRefs.current[i]=value}
        >
          
          <div css={contents}
            ref={ref as any}
            {...function(){
              const onPointerDown = (ev: React.PointerEvent)=>{
                ev.currentTarget.releasePointerCapture(ev.pointerId)
                setLastIdx(i)
                setDragState('initialDelay')
                setCanClick(true)
              }
              const onPointerRemove = ()=>{
                if (dragState!=='dragging'){
                  setDragState(undefined)
                }
              }
              return {
                onPointerDown,
                onPointerCancel: onPointerRemove,
                onPointerUp: onPointerRemove,
                onPointerOut: onPointerRemove,
              }
            }()}
            onClick={ev=>{
              if (canClick && im) setMenuOpen(true)
            }}
          >
            
            <Dropzone
              onDrop={(files, rejectedFiles, ev)=>onPhotoFiles(files)}
              onDragOver={()=>setLastIdx(i)}
              noClick={!!im || !canClick}
              useFsAccessApi={false}
            >
            {({getRootProps, getInputProps, isDragAccept}) => {
              //console.log('getInputProps()',getInputProps())
              //console.log('isDragAccept',isDragAccept)
              return <div css={contents} {...getRootProps()}>
              <input {...getInputProps()} />
              <animated.label css={photoDraggableBox}
                style={springStyle}
                {...drag(i)}
                ref={ref2 as any}
              >
                
                { im
                  ? <img css={photoImgStyle}
                      src={im!.url!}
                      alt={`Profile photo ${i+1}`}
                    />
                  : <div css={photoPlaceholderStyle}>
                      <PlusIc css={photoPlaceholderIconStyle}/>
                    </div>
                }
                
                { im?.state==='reading' &&
                  <div css={photoPlaceholderStyle}>
                    <Spinner8LinesIc css={photoPlaceholderIconStyle}/>
                  </div>
                }
                
                { isDraggingFiles &&
                  <div css={t=>css`
                    ${abs};
                    border-radius: inherit;
                    overflow: hidden;
                    //background: #00000022;
                    ${ isDragAccept && css`background: #00000099;` }
                    ::after {
                      ${abs};
                      content: '';
                      inset: -4px;
                      border-radius: calc(14px + 4px);
                      border: 10px dashed;
                      border-color: ${t.photos.borderDrag[0]};
                    }
                  `}/>
                }
                
              </animated.label>
              </div>
            }}
          </Dropzone>
          
          </div>
          
          
          
          <div
            onAnimationEnd={ev=>{
              if (ev.animationName===progressAnim.name) {
                setDragState('dragging')
                setCanClick(false)
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
              
              ${lastIdx===i && dragState==='progressAnim' && css`
                animation: ${progressAnim} 0.4s linear forwards;
              `}
              ${lastIdx===i && !swap && dragState==='dragging' && css`
                background-image: none;
                background-color: ${t.photos.highlightFrameAccentBgc[0]};
              `}
              ${swap?.[1]===i && css`
                background-image: none;
                background-color: ${t.photos.highlightFrameAccentBgc[0]};
              `}
            `}
          />
          
          
        </div>
        }/>
        </div>
      })}
    </div>
    
    
    
    
    
    
    <UseModalSheetState
      open={isMenuOpen}
      onClosed={()=>setMenuOpen(false)}
      render={sheet =>
      <ModalPortal>
      <BottomSheetBasic {...sheet.sheetProps}>
        <OptionsContent>
          
          <Button css={ButtonStyle.bigRectTransparent}
            onClick={()=>{
              const newImages = [...images] as ProfilePhotoArr
              newImages[lastIdx] = undefined
              setImages(newImages)
              sheet.setClosing()
            }}
          >
            <OptionContainer>
              <OptionTitle>{actionUiValues.remove[0].text}</OptionTitle>
              <div css={optionIconBoxStyle}>
                <CrossInCircleIc css={css`height: 120%;`}/>
              </div>
            </OptionContainer>
          </Button>
          
          <Dropzone
            onDrop={(files, rejectedFiles, ev)=>onPhotoFiles(files)}
            noDrag
            useFsAccessApi={false}
          >
            {({getRootProps, getInputProps}) =>
            <div css={contents} {...getRootProps()}>
              <input {...getInputProps()}/>
              <Button css={ButtonStyle.bigRectTransparent}>
                
                <OptionContainer>
                  <OptionTitle>{actionUiValues.replace[0].text}</OptionTitle>
                  <div css={optionIconBoxStyle}>
                    <ArrowRefreshCwIc/>
                  </div>
                </OptionContainer>
              </Button>
            </div>
            }
          </Dropzone>
          
          
          {/* TODO download button*/}
          
          
        </OptionsContent>
      </BottomSheetBasic>
      </ModalPortal>
      }
    />
    
    
  </>
})
export default ProfilePhotos




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



const photosGridStyle = css`
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
  position: relative;
  
  //pointer-events: none;
  //user-select: none;
  //touch-action: none;
`


const photoDraggableBox = css`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`



const photoImgStyle = css`
  // todo restore ability of save photos
  pointer-events: none;
  //user-select: none;
  //touch-action: none;

  width: 100%;
  aspect-ratio: 1;
  object-position: center;
  object-fit: cover;
`



const photoPlaceholderStyle = (t:Themes.Theme)=>css`
  ${abs};
  pointer-events: none;
  background: ${t.photos.bgc[0]};
  ${center};
`
const photoPlaceholderIconStyle = (t:Themes.Theme)=>css`
  ${SvgIcStyle.El.thiz.icon}{
    ${SvgIcStyle.Prop.prop.color}: ${t.photos.content[0]};
    ${SvgIcStyle.Prop.prop.size}: 30%;
  }
`





const OptionsContent = styled.div`
  width: 100%;
  ${col};
  padding-bottom: 20px;
`
const OptionContainer = styled.div`
  width: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  ${row};
  gap: 0.3em;
  align-items: center;
`
const OptionTitle = styled.h6`
  ${resetH};
  ${Txt.large2};
  flex: 1;
  ${col};
  align-items: start;
`
const optionIconBoxStyle = css`
  ${center};
  height: 1.3em;
  width: 1.333em;
  >${SvgIcStyle.El.el.icon}{
    ${SvgIcStyle.Prop.prop.color}: ${ButtonStyle.Prop.varr.color};
  }
`
