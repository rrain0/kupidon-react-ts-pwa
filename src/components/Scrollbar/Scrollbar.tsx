import React, {
  useCallback, useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cmcss from 'src/styles/common.module.scss'
import classNames from "classnames"
import {GetDimensions} from "src/utils/GetDimensions"
import { MathUtils } from 'src/utils/MathUtils'
import inRange = MathUtils.inRange
import fitRange = MathUtils.fitRange
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import styled from 'styled-components'
import { StyledCommon } from 'src/styles/StyledCommon'
import reset = StyledCommon.reset
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import { ScrollProps } from './useScrollbar'



// todo min scrollbar width

export type ScrollDirection = 'horizontal'|'vertical'

export type ScrollbarProps = JSX.IntrinsicElements['div'] & {
  direction?: ScrollDirection|empty
  scrollProps: ScrollProps
  setContainerScroll: (scroll: ScrollToOptions)=>void
}
export type HorizontalScrollbarRef = HTMLDivElement

const Scrollbar = React.forwardRef<HorizontalScrollbarRef, ScrollbarProps>(
(props, forwardedRef) => {
  const {
    direction: _direction,
    scrollProps,
    setContainerScroll,
    ...restProps
  } = props
  const direction = _direction ?? 'vertical'
  
  const trackRef = useRef<HorizontalScrollbarRef>(null)
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
      const d = new GetDimensions(track)
      setTrackProps({
        width: d.contentWidthRounded,
        height: d.contentHeightRounded,
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
  useLayoutEffect(()=>{
    const track = trackRef.current!
    const trackResizeObserver = new ResizeObserver(()=>updateTrackProps())
    updateTrackProps()
    trackResizeObserver.observe(track)
    return ()=>trackResizeObserver.disconnect()
  },[trackRef.current])
  
  
  const [dragStart, setDragStart] = useState(
    undefined as undefined|{ client: number, scroll: number }
  )
  const onPointerDown = useCallback((ev: React.PointerEvent) => {
    if (ev.buttons===1){
      const trackD = new GetDimensions(trackRef.current!)
      const thumbBoxD = new GetDimensions(thumbBoxRef.current!)
      const drag = function(){
        //if (ev.target===thumbBoxRef.current!)
        const p = function(){
          switch (direction) {
            case 'vertical': return {
              start: thumbBoxD.top,
              client: ev.clientY,
              end: thumbBoxD.bottom,
              scroll: scrollProps.scrollTop,
              size: thumbBoxProps.height!,
              trackStart: trackD.top,
              scrollMax: scrollProps.scrollTopMax,
            }
            case 'horizontal': return {
              start: thumbBoxD.left,
              client: ev.clientX,
              end: thumbBoxD.right,
              scroll: scrollProps.scrollLeft,
              size: thumbBoxProps.width!,
              trackStart: trackD.left,
              scrollMax: scrollProps.scrollLeftMax,
            }
          }
        }()
        if (inRange(p.start, p.client, p.end))
          return { client: p.client, scroll: p.scroll }
        else {
          let newScroll = toScrollScale(p.client - p.size/2 - p.trackStart)
          newScroll = fitRange(0, newScroll, p.scrollMax)
          switch (direction){
            case 'vertical': setContainerScroll({ top: newScroll }); break
            case 'horizontal': setContainerScroll({ left: newScroll }); break
          }
          return { client: p.client, scroll: newScroll }
        }
      }()
      
      setDragStart(drag)
      ev.currentTarget.setPointerCapture(ev.pointerId)
    }
  },
    [
      direction,thumbBoxRef.current,trackRef.current,scrollProps,
      thumbBoxProps,setContainerScroll,toScrollScale
    ]
  )
  
  // Using css touch-action: none; to prevent browser gesture handling on mobile devices
  const onPointerMove = useCallback((ev: React.PointerEvent)=>{
    if (dragStart && ev.buttons===1){
      const p = function(){
        switch (direction) {
          case 'vertical': return {
            client: ev.clientY,
          }
          case 'horizontal': return {
            client: ev.clientX,
          }
        }
      }()
      const addTrack = p.client-dragStart.client
      const newScroll = dragStart.scroll + toScrollScale(addTrack)
      
      switch (direction){
        case 'vertical': setContainerScroll({ top: newScroll }); break
        case 'horizontal': setContainerScroll({ left: newScroll }); break
      }
    }
  },[direction,dragStart,toScrollScale,setContainerScroll])
  
  const onPointerEnd = useCallback((ev: React.PointerEvent)=>{
    setDragStart(undefined)
  },[])
  
  
  // forbid content selection for all elements while dragging scrollbar
  useLayoutEffect(()=>{
    if (dragStart){
      document.querySelector('*')!.classList.add(cmcss.noSelect)
      return ()=>document.querySelector('*')!.classList.remove(cmcss.noSelect)
    } else document.querySelector('*')!.classList.remove(cmcss.noSelect)
  },[dragStart,scrollProps,trackProps])
  
  /*const onTrackClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const evX = ev.clientX
    const thumbD = new GetDimensions(thumbBoxRef.current!)
    if (!inRange(thumbD.left, evX, thumbD.right)){
      const trackD = new GetDimensions(trackRef.current!)
      const newScrollLeft = fitRange(
        0,
        toScrollScale(evX - thumbBoxProps.width/2 - trackD.left),
        scrollProps.scrollLeftMax
      )
      setContainerScroll(newScrollLeft)
    }
  }*/
  
  
  
  
  return <ScrollbarTrack
    {...restProps}
    direction={direction}
    ref={trackRef}
    onPointerDown={useCallback(
      ev=>{onPointerDown(ev); props.onPointerDown?.(ev)},
      [onPointerDown,props.onPointerDown]
    )}
    onPointerMove={useCallback(
      ev=>{onPointerMove(ev); props.onPointerMove?.(ev)},
      [onPointerMove,props.onPointerMove]
    )}
    onPointerUp={useCallback(
      ev=>{onPointerEnd(ev); props.onPointerUp?.(ev)},
      [onPointerEnd,props.onPointerUp]
    )}
    onPointerCancel={useCallback(
      ev=>{onPointerEnd(ev); props.onPointerCancel?.(ev)},
      [onPointerEnd,props.onPointerCancel]
    )}
    //onClick={ev=>{onTrackClick(ev); props.onClick?.(ev)}}
  >
    <ScrollbarThumbBox
      ref={thumbBoxRef}
      style={thumbBoxProps}
    >
      <ScrollbarThumb />
    </ScrollbarThumbBox>
  </ScrollbarTrack>
})
export default ReactMemoTyped(Scrollbar)



type ScrollbarTrackProps = {
  direction: ScrollDirection
}
const ScrollbarTrack = ReactMemoTyped(
  styled.div.attrs<ScrollbarTrackProps>(p=>({
    className: classNames(p.className,'rrainuiScrollbarTrack'),
    'data-direction': p.direction,
  }))`
    ${reset};
    position: relative;
    touch-action: none; // To prevent browser gesture handling on mobile devices
    
    &[data-direction=vertical]{ width: 10px; height: 100%; }
    &[data-direction=horizontal]{ width: 100%; height: 10px; }
    background: rgba(248,248,248,0.35);
    border-radius: 50%;
  `
)



const ScrollbarThumbBox = ReactMemoTyped(
  styled.div.attrs(p=>({
    className: classNames(p.className,'rrainuiScrollbarThumbBox')
  }))`
    position: absolute;
    [data-direction=vertical]>&{
      will-change: top, height;
      left: 0; right: 0; top: 0; height: 0;
    }
    [data-direction=horizontal]>&{
      will-change: left, width;
      top: 0; bottom: 0; left: 0; width: 0;
    }
  `
)



const ScrollbarThumb = ReactMemoTyped(
  styled.div.attrs(p=>({
    className: classNames(p.className,'rrainuiScrollbarThumb')
  }))`
    width: 100%; height: 100%;
    //pointer-events: none;
    
    background: rgba(248,248,248,0.5);
    border-radius: 27px;
  `
)