/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { Controller } from '@react-spring/core'
import { config, useSprings, animated, UseSpringProps } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useRecoilValue } from 'recoil'
import ModalPortal from 'src/components/Modal/ModalPortal'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { AsyncUtils } from 'src/utils/common/AsyncUtils'
import { FileUtils } from 'src/utils/file/FileUtils'
import { MathUtils } from 'src/utils/common/MathUtils'
import { DataUrl } from 'src/utils/DataUrl'
import { ImageUtils } from 'src/utils/file/ImageUtils'
import { ActionUiText } from 'src/utils/lang/ui-values/ActionUiText'
import { useUiTextContainer } from 'src/utils/lang/useUiText'
import { Progress } from 'src/utils/Progress'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import UseFakePointerRef from 'src/components/ActionProviders/UseFakePointerRef'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { useNoTouchAction } from 'src/utils/react/useNoTouchAction'
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { useTimeout } from 'src/utils/react/useTimeout'
import { AppTheme } from 'src/utils/theme/AppTheme'
import center = EmotionCommon.center
import { TypeUtils } from 'src/utils/common/TypeUtils'
import BottomSheetBasic from 'src/views/BottomSheet/BottomSheetBasic'
import UseBottomSheetState from 'src/views/BottomSheet/UseBottomSheetState'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import PieProgress from 'src/views/PieProgress/PieProgress'
import { PieProgressStyle } from 'src/views/PieProgress/PieProgressStyle'
import SparkingLoadingLine from 'src/views/SparkingLoadingLine/SparkingLoadingLine'
import abs = EmotionCommon.abs
import bgcBorderMask = EmotionCommon.bgcInBorder
import arrIndices = ArrayUtils.ofIndices
import PlusIc = SvgIcons.PlusIc
import contents = EmotionCommon.contents
import row = EmotionCommon.row
import col = EmotionCommon.col
import CrossInCircleIc = SvgIcons.CrossInCircleIc
import resetH = EmotionCommon.resetH
import ArrowRefreshCwIc = SvgIcons.ArrowRefreshCwIc
import Txt = EmotionCommon.Txt
import * as uuid from 'uuid'
import blobToDataUrl = FileUtils.blobToDataUrl
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import trimExtension = FileUtils.trimExtension
import mapRange = MathUtils.mapRange
import Theme = AppTheme.Theme
import ifFoundByThenReplaceTo = ArrayUtils.replaceFirstToIfFoundBy
import findByAndMapTo = ArrayUtils.mapFirstToIfFoundBy
import throttle = AsyncUtils.throttle
import Download1Ic = SvgIcons.Download1Ic
import extensionFromMimeType = FileUtils.extensionFromMimeType
import noop = TypeUtils.noop





// todo restore ability of download / save photos


const progressAnimDuration = 400 // ms



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


export const DefaultOperation = {
  id: '',
  progress: 0, // 0..100
  showProgress: true,
  abort: noop,
}
export type Operation = typeof DefaultOperation


export const DefaultProfilePhoto = {
  id: '',
  type: 'remote' as
    |'remote' // photo from server
    |'local', // photo from local storage
  index: 0,
  isEmpty: false,
  
  name: '',
  mimeType: '',
  remoteUrl: '',
  dataUrl: '',
  
  isCompressed: false,
  compression: undefined as Operation|undefined,
  isDownloaded: false,
  download: undefined as Operation|undefined,
  upload: undefined as Operation|undefined,
}
export type ProfilePhoto = typeof DefaultProfilePhoto
export type ProfilePhotoArr = ProfilePhoto[]



export type ProfilePhotosProps = {
  images:ProfilePhotoArr
  setImages: SetterOrUpdater<ProfilePhotoArr>
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
  
  const [canShowFetchProgress, setCanShowFetchProgress] = useState(false)
  useTimeout(
    3000,
    ()=>setCanShowFetchProgress(true),
    []
  )
  
  const [lastIdx, setLastIdx] = useState(0)
  
  const [dragState, setDragState, dragStateRef] = useStateAndRef(
    undefined as undefined|'initialDelay'|'progressAnim'|'dragging'
  )
  const [progressAnimLockGestures, setProgressAnimLockGestures] = useState(false)
  const [swap, setSwap] = useState(undefined as undefined|[number,number])
  
  const [canClick, setCanClick] = useState(true)
  const [isMenuOpen,setMenuOpen] = useState(false)
  
  
  // forbid content selection
  useNoSelect(!!dragState)
  // forbid gesture interception by browser
  useNoTouchAction(dragState==='dragging' || progressAnimLockGestures)
  
  
  // swaps photos
  const swapPhotosEffectEvent = useEffectEvent(
    (swap: [number,number])=>{
      const newImages = [...images]
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
  
  useLayoutEffect(
    ()=>{
      if (dragState==='progressAnim') {
        const timerId = setTimeout(
          ()=>setProgressAnimLockGestures(true),
          progressAnimDuration - 300
        )
        return ()=>clearTimeout(timerId)
      }
      else setProgressAnimLockGestures(false)
    },
    [dragState]
  )
  
  
  const photosGrid = useRef<HTMLDivElement>(null)
  const photoFrameRefs = useRef<Array<Element|null>>(arrIndices(6).map(i=>null))
  
  
  const [springs, springApi] = useSprings(images.length, springStyle(), [images])
  const applyDragRef = useRef<()=>void>()
  // noinspection JSVoidFunctionReturnValueUsed
  const drag = useDrag(
    gesture=>{
      const [i] = gesture.args as [number]
      const {
        active, last,
        movement: [mx,my],
        xy: [vpx,vpy], // viewport x, viewport y
      } = gesture
      /* console.log(
        'idx:', i,
        'first:', gesture.first,
        'active:', active,
        'dragging:', gesture.dragging,
        //'hovering:', gesture.hovering,
        'last', gesture.last,
      ) */
      const applyDrag = ()=>{
        const isDragging = dragStateRef.current==='dragging' && active
        springApi.start(springStyle(i, isDragging, mx, my))
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
            else if (i!==otherIdx) setSwap([i,otherIdx])
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
  ) as (...args: any[]) => ReactDOMAttributes
  useEffect(
    ()=>{ if (dragState==='dragging') applyDragRef.current?.() },
    [dragState]
  )
  
  
  
  const onFilesSelected = useCallback(
    (files: File[])=>{
      const imgFiles = files.filter(it=>it.type.startsWith('image/'))
      if (imgFiles.length){
        const emptyCnt = images
          .filter((im,i)=>i===lastIdx || (i>=lastIdx && im.isEmpty)).length
        let filesI = 0
        const newImages = images.map((photo,i)=>{
          if (filesI < imgFiles.length &&
            (i===lastIdx ||
              (i>=lastIdx &&
                (imgFiles.length<=emptyCnt ? photo.isEmpty : true)
              )
            )
          ){
            const imgFile = imgFiles[filesI++]
            
            photo.download?.abort()
            photo.compression?.abort()
            
            const abortCtrl = new AbortController()
            const compressionStart = {
              isCompressed: false,
              compression: { ...DefaultOperation,
                id: uuid.v4(),
                abort: ()=>{
                  //console.log('compression was aborted')
                  abortCtrl.abort('compression was aborted')
                },
              },
            } satisfies Partial<ProfilePhoto>
            
            const processingPhoto = { ...photo, ...compressionStart }
            
            const updatePhotoNow = (p: Partial<ProfilePhoto>)=>{
              setImages(s=>findByAndMapTo(s,
                elem=>({...elem, ...p}),
                elem=>elem.compression?.id===compressionStart.compression.id
              ))
            }
            const updatePhoto = throttle(
              mapRange(Math.random(),[0,1],[1500,2000]),
              updatePhotoNow
            )
          
            ;(async()=>{
              try {
                const progress = new Progress(2,[95,5])
                const onProgress = (p: number|null)=>{
                  progress.progress = p??0
                  //console.log('progress',progress.value)
                  updatePhoto({ compression: {
                    ...compressionStart.compression,
                    progress: progress.value,
                  } })
                }
                
                //await wait(10000)
                //throw 'test error'
                
                const compressedFile = await ImageUtils.compress(imgFile,
                  { onProgress, abortCtrl }
                )
                abortCtrl.signal.throwIfAborted()
                
                //console.log('imgFile',imgFile)
                progress.stage++
                progress.progress = 0
                const imgDataUrl = await blobToDataUrl(compressedFile,
                  { onProgress, abortCtrl }
                )
                abortCtrl.signal.throwIfAborted()
                
                //console.log('imgDataUrl',imgDataUrl.length)
                //console.log('imgDataUrl',imgDataUrl.substring(0, 1000))
                const mimeType = new DataUrl(imgDataUrl).mimeType
                const newPhoto = {
                  ...DefaultProfilePhoto,
                  id: uuid.v4(),
                  type: 'local',
                  index: photo.index,
                  name: trimExtension(imgFile.name),
                  mimeType: mimeType,
                  dataUrl: imgDataUrl,
                  isCompressed: true,
                } satisfies ProfilePhoto
                setImages(s=>ifFoundByThenReplaceTo(s,
                  newPhoto,
                  elem=>elem.compression?.id===compressionStart.compression.id
                ))
              }
              catch (ex) {
                // TODO notify about error
                //console.log('compression error', ex)
                //console.log('photo', photo)
                updatePhoto({ compression: undefined })
              }
            })()
            
            return processingPhoto
          }
          
          return photo
        })
        setImages(newImages)
        setMenuOpen(false)
      }
    },
    [images, lastIdx, setImages]
  )
  
  /* {
    const index = 1
    useEffect(
      ()=>{
        console.log(`images[${index}]`,images[index])
      },
      [images[index]]
    )
  } */
  /* useEffect(
    ()=>{
      console.log(`images`,images)
    },
    [images]
  ) */
  
  
  return <>
    
    <div css={photosGridStyle}
      ref={photosGrid}
    >
      {springs.map((springStyle,i) => {
        const im = images[i]
        return <div css={contents} key={im.id}>
        <UseFakePointerRef>{({ ref, ref2, ref3, ref4 })=>
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
                if (ev.buttons===1){
                  ev.currentTarget.releasePointerCapture(ev.pointerId)
                  setLastIdx(i)
                  setDragState('initialDelay')
                  setCanClick(true)
                }
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
              if (canClick && !im.isEmpty) setMenuOpen(true)
            }}
          >
            
            <Dropzone
              onDrop={(files, rejectedFiles, ev)=>onFilesSelected(files)}
              onDragOver={()=>setLastIdx(i)}
              noClick={!im.isEmpty || !canClick}
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
                
                {function(){
                  if (false){}
                  else if (im.compression?.showProgress)
                    return <div css={photoPlaceholderStyle}>
                      <PieProgress css={profilePhotoPieProgress}
                        progress={
                          mapRange(im.compression.progress,[0,100],[5,95])
                        }
                      />
                    </div>
                    
                  else if (!canShowFetchProgress && im.type==='remote' && !im.isDownloaded)
                    return <div css={photoPlaceholderStyle}>
                      <SparkingLoadingLine/>
                    </div>
                  else if (im.download?.showProgress)
                    return <div css={photoPlaceholderStyle}>
                      <PieProgress css={profilePhotoPieProgress}
                        progress={
                          mapRange(im.download.progress,[0,100],[5,95])
                        }
                      />
                    </div>
                    
                  else if (im.isEmpty)
                    return <div css={photoPlaceholderStyle}>
                      <PlusIc css={photoPlaceholderIconStyle}/>
                    </div>
                  else if (im.type==='remote' && im.isDownloaded)
                    return <img css={photoImgStyle}
                      src={im.dataUrl}
                      alt={im.name}
                    />
                  else if (im.type==='local' && im.isCompressed)
                    return <img css={photoImgStyle}
                      src={im.dataUrl}
                      alt={im.name}
                    />
                  
                }()}
                
                { im.type==='local' && im.upload?.showProgress &&
                  <div css={photoDimmed}>
                    <PieProgress css={profilePhotoPieProgressAccent}
                      progress={
                        mapRange(im.upload.progress,[0,100],[5,95])
                      }
                    />
                  </div>
                }
                { isDraggingFiles && <>
                  { isDragAccept && <div css={photoDimmed}/> }
                  <div css={photoOnDragBorder}/>
                </>}
                
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
                animation: ${progressAnim} ${progressAnimDuration}ms linear forwards;
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
        }</UseFakePointerRef>
        </div>
      })}
    </div>
    
    
    
    
    
    
    <UseBottomSheetState
      open={isMenuOpen}
      onClosed={()=>setMenuOpen(false)}
    >
      {sheet =>
      <ModalPortal>
      <BottomSheetBasic {...sheet.sheetProps}>
        <OptionsContent>
          
          
          <Button css={ButtonStyle.bigRectTransparent}
            onClick={()=>{
              const im = images[lastIdx]
              im.download?.abort()
              im.compression?.abort()
              const newImages = [...images]
              newImages[lastIdx] = {
                ...DefaultProfilePhoto,
                id: uuid.v4(),
                type: 'local',
                isEmpty: true,
                index: newImages[lastIdx].index,
              } satisfies ProfilePhoto
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
            onDrop={(files, rejectedFiles, ev)=>onFilesSelected(files)}
            noDrag
            useFsAccessApi={false}
          >
            {({getRootProps, getInputProps}) =>
            <div css={contents} {...getRootProps()}>
              <input {...getInputProps()} />
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
          
          
          {/* TODO fullscreen */}
          {/* {function(){
            const im = images[lastIdx]
            if (im.type==='remote' && im.isDownloaded || im.type==='local' && im.isCompressed) {
              return <Button css={ButtonStyle.bigRectTransparent}
                onClick={()=>{
                  sheet.setClosing()
                }}
              >
                <OptionContainer>
                  <OptionTitle>{actionUiValues.fullScreenView[0].text}</OptionTitle>
                  <div css={optionIconBoxStyle}>
                    <FullscreenIc css={css`height: 120%;`}/>
                  </div>
                </OptionContainer>
              </Button>
            }
          }()} */}
          
          
          
          {function(){
            const im = images[lastIdx]
            if (im.type==='remote' && im.isDownloaded || im.type==='local' && im.isCompressed) {
              return <a href={im.dataUrl}
                download={`${im.name} ${im.id}.${extensionFromMimeType(im.mimeType)}`}
              >
                <Button css={ButtonStyle.bigRectTransparent}
                  onClick={sheet.setClosing}
                >
                  <OptionContainer>
                    <OptionTitle>{actionUiValues.download[0].text}</OptionTitle>
                    <div css={optionIconBoxStyle}>
                      <Download1Ic/>
                    </div>
                  </OptionContainer>
                </Button>
              </a>
            }
          }()}
          
          
        </OptionsContent>
      </BottomSheetBasic>
      </ModalPortal>
    }</UseBottomSheetState>
    
    
  </>
})
export default ProfilePhotos




const radialGradKfs = (t:Theme)=>keyframes`
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



const photoPlaceholderStyle = (t:AppTheme.Theme)=>css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  background: ${t.photos.bgc[0]};
  ${center};
`
const photoDimmed = (t:AppTheme.Theme)=>css`
  ${photoPlaceholderStyle(t)};
  background: #00000099;
`
const photoOnDragBorder = (t:AppTheme.Theme)=>css`
  ${abs};
  inset: -4px;
  border-radius: calc(14px + 4px);
  border: 10px dashed;
  border-color: ${t.photos.borderDrag[0]};
`
const photoPlaceholderIconStyle = (t:AppTheme.Theme)=>css`
  ${SvgIcStyle.El.thiz.icon}{
    ${SvgIcStyle.Prop.prop.color}: ${t.photos.content[0]};
    ${SvgIcStyle.Prop.prop.size}:  30%;
  }
`
const profilePhotoPieProgress = (t:AppTheme.Theme)=>css`
  ${PieProgressStyle.El.thiz.pieProgress}{
    ${PieProgressStyle.Prop.prop.progressColor}: transparent;
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.content[0]};
    height: 30%;
    aspect-ratio: 1;
  }
`
const profilePhotoPieProgressAccent = (t:AppTheme.Theme)=>css`
  ${profilePhotoPieProgress(t)};
  ${PieProgressStyle.El.thiz.pieProgress}{
    ${PieProgressStyle.Prop.prop.restColor}:     ${t.photos.bgc[0]};
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
