/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  useCallback, useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from "classnames"
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { ElementProps } from 'src/utils/common/GetDimensions'
import { MathUtils } from 'src/utils/common/MathUtils'
import inRange = MathUtils.inRange
import fitRange = MathUtils.fitRange
import { ScrollProps } from 'src/views/Scrollbar/useContainerScrollState'
import reset = EmotionCommon.reset
import PartialUndef = TypeUtils.PartialUndef



// maybe it is worth to do min scrollbar width

export type ScrollDirection = 'horizontal'|'vertical'

export type ScrollbarCustomProps = {
  scrollProps: ScrollProps
  setContainerScroll: (scroll: ScrollToOptions)=>void
} & PartialUndef<{
  direction: ScrollDirection
}>
export type ScrollbarForwardRefProps = JSX.IntrinsicElements['div']
export type ScrollbarRefElement = HTMLDivElement

export type ScrollbarProps = ScrollbarCustomProps & ScrollbarForwardRefProps


const Scrollbar =
React.memo(
React.forwardRef<ScrollbarRefElement, ScrollbarProps>(
(props, forwardedRef) => {
  const {
    direction = 'vertical',
    scrollProps,
    setContainerScroll,
    className,
    ...restProps
  } = props
  
  
  const trackRef = useRef<ScrollbarRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>trackRef.current!, [])
  const thumbBoxRef = useRef<HTMLDivElement>(null)
  
  
  /*
  useEffect(()=>{
    console.log('scrollProps',scrollProps)
  },[scrollProps])
  */
  
  
  const [trackProps, setTrackProps] = useState({ width: 0, height: 0 })
  const updateTrackProps = useCallback(() => {
    const track = trackRef.current
    if (track){
      const d = ElementProps(track)
      setTrackProps({
        width: d.contentWidth,
        height: d.contentHeight,
      })
    }
  },[trackRef.current])
  
  const toTrackScale = useCallback((v: number) => {
    switch (direction) {
      case 'vertical':
        if (scrollProps.scrollHeight===0) return 0
        else return v/scrollProps.scrollHeight*trackProps.height
      case 'horizontal':
        if (scrollProps.scrollWidth===0) return 0
        else return v/scrollProps.scrollWidth*trackProps.width
    }
  },[direction, scrollProps, trackProps])
  const toScrollScale = useCallback((v: number) => {
    switch (direction) {
      case 'vertical':
        if (trackProps.height===0) return 0
        else return v/trackProps.height*scrollProps.scrollHeight
      case 'horizontal':
        if (trackProps.width===0) return 0
        else return v/trackProps.width*scrollProps.scrollWidth
    }
  },[direction, scrollProps, trackProps])
  
  const thumbBoxProps = useMemo(()=>{
    switch (direction){
      case 'vertical': return {
        top: toTrackScale(scrollProps.scrollTop),
        height: toTrackScale(scrollProps.clientHeight),
      }
      case 'horizontal': return {
        left: toTrackScale(scrollProps.scrollLeft),
        width: toTrackScale(scrollProps.clientWidth),
      }
    }
  },[direction, scrollProps, toTrackScale])
  
  
  // Track Resize Observer
  useEffect(()=>{
    updateTrackProps()
    const track = trackRef.current
    if (track){
      const trackResizeObserver = new ResizeObserver(()=>updateTrackProps())
      track && trackResizeObserver.observe(track)
      return ()=>trackResizeObserver.disconnect()
    }
  },[trackRef.current, updateTrackProps])
  
  
  const [dragStart, setDragStart] = useState(
    undefined as undefined | {
      client: number,
      scrollProgress: number // 0 <= scrollProgress <= 1
    }
  )
  const onPointerDown = useCallback(
    function (this: HTMLElement, ev: PointerEvent){
      const track = trackRef.current
      const thumbBox = thumbBoxRef.current
      if (track && thumbBox && ev.buttons===1){
        const trackD = ElementProps(track)
        const thumbBoxD = ElementProps(thumbBox)
        const drag = function(){
          const p = function(){
            switch (direction) {
              case 'vertical': return {
                start: thumbBoxD.clientYFloat,
                client: ev.clientY,
                end: thumbBoxD.clientBottomFloat,
                size: thumbBoxProps.height!,
                scroll: scrollProps.scrollTop,
                scrollMax: scrollProps.scrollTopMax,
                trackStart: trackD.clientYFloat,
              }
              case 'horizontal': return {
                start: thumbBoxD.clientXFloat,
                client: ev.clientX,
                end: thumbBoxD.clientRightFloat,
                size: thumbBoxProps.width!,
                scroll: scrollProps.scrollLeft,
                scrollMax: scrollProps.scrollLeftMax,
                trackStart: trackD.clientXFloat,
              }
            }
          }()
          if (inRange(p.start, p.client, p.end))
            return { client: p.client, scrollProgress: p.scroll / p.scrollMax }
          else {
            let newScroll = toScrollScale(p.client - p.size/2 - p.trackStart)
            newScroll = fitRange(0, newScroll, p.scrollMax)
            const newScrollProgress = fitRange(0, newScroll / p.scrollMax, 1)
            switch (direction){
              case 'vertical': setContainerScroll({ top: newScroll }); break
              case 'horizontal': setContainerScroll({ left: newScroll }); break
            }
            return { client: p.client, scrollProgress: newScrollProgress }
          }
        }()
        
        setDragStart(drag)
        this.setPointerCapture(ev.pointerId)
      }
    },
    [
      direction, thumbBoxRef.current, trackRef.current, scrollProps,
      thumbBoxProps, setContainerScroll, toScrollScale
    ]
  )
  
  // Using css 'touch-action: none;' to prevent browser gesture handling on mobile devices
  const onPointerMove = useCallback(
    (ev: PointerEvent)=>{
      if (dragStart && ev.buttons===1){
        const p = function(){
          switch (direction) {
            case 'vertical': return {
              client: ev.clientY,
              scrollMax: scrollProps.scrollTopMax,
            }
            case 'horizontal': return {
              client: ev.clientX,
              scrollMax: scrollProps.scrollLeftMax,
            }
          }
        }()
        const addTrack = p.client-dragStart.client
        let newScroll = dragStart.scrollProgress * p.scrollMax + toScrollScale(addTrack)
        newScroll = fitRange(0, newScroll, p.scrollMax)
        
        switch (direction){
          case 'vertical': setContainerScroll({ top: newScroll }); break
          case 'horizontal': setContainerScroll({ left: newScroll }); break
        }
      }
    },
    [direction, dragStart, toScrollScale, scrollProps, setContainerScroll]
  )
  
  const onPointerEnd = useCallback(
    (ev: PointerEvent)=>{
      setDragStart(undefined)
    },
    []
  )
  
  
  // forbid content selection for all elements while dragging scrollbar
  useNoSelect(!!dragStart,[dragStart])
  
  
  useEffect(
    ()=>{
      const track = trackRef.current
      if (track){
        track.addEventListener('pointerdown',onPointerDown)
        track.addEventListener('pointermove',onPointerMove)
        track.addEventListener('pointerup',onPointerEnd)
        track.addEventListener('pointercancel',onPointerEnd)
        
        return ()=>{
          track.removeEventListener('pointerdown',onPointerDown)
          track.removeEventListener('pointermove',onPointerMove)
          track.removeEventListener('pointerup',onPointerEnd)
          track.removeEventListener('pointercancel',onPointerEnd)
        }
      }
    },
    [trackRef.current, onPointerDown, onPointerMove, onPointerEnd]
  )
  
  
  
  return <ScrollbarTrack
    className={classNames(className,'rrainuiScrollbarTrack')}
    {...restProps}
    data-direction={direction}
    ref={trackRef}
  >
    <ScrollbarThumbBox
      className={'rrainuiScrollbarThumbBox'}
      ref={thumbBoxRef}
      style={thumbBoxProps}
    >
      <ScrollbarThumb
        className={'rrainuiScrollbarThumb'}
      />
    </ScrollbarThumbBox>
  </ScrollbarTrack>
}))
export default Scrollbar



type ScrollbarTrackProps = {
  // TODO Style
  'data-direction': ScrollDirection
}
const ScrollbarTrack = styled.div<ScrollbarTrackProps>`
  ${reset};
  position: relative;
  touch-action: none; // To prevent browser gesture handling on mobile devices

  // TODO Style
  &[data-direction=vertical]{ width: 10px; height: 100%; }
  // TODO Style
  &[data-direction=horizontal]{ width: 100%; height: 10px; }
  // TODO Style
  background: rgba(248,248,248,0.35);
  border-radius: 50%;
`



const ScrollbarThumbBox = styled.div`
  position: absolute;
  // TODO Style
  [data-direction=vertical]>&{
    will-change: top, height;
    left: 0; right: 0; top: 0; height: 0;
  }
  // TODO Style
  [data-direction=horizontal]>&{
    will-change: left, width;
    top: 0; bottom: 0; left: 0; width: 0;
  }
`




const ScrollbarThumb = styled.div`
  width: 100%; height: 100%;
  //pointer-events: none;

  // TODO Style
  background: rgba(248,248,248,0.5);
  border-radius: 27px;
`