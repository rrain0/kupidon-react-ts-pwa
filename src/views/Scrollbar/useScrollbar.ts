import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {GetDimensions} from "src/utils/GetDimensions"



export type ScrollProps = {
  clientWidth: number // container width
  scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
  scrollLeftMax: number // макс ширина проскроленного контента, который слева за границей контейнера
  scrollWidth: number // content width
  clientHeight: number // container height
  scrollTop: number // высота проскроленного контента, который сверху за границей контейнера
  scrollTopMax: number // макс высота проскроленного контента, который сверху за границей контейнера
  scrollHeight: number // content height
}

export type UseScrollbarOptions = {

}
export const useScrollbar = (
  containerRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  options: UseScrollbarOptions = { }
)=>{
  
  
  const [scrollProps, setScrollProps] = useState<ScrollProps>({
    clientWidth: 0,
    scrollLeft: 0,
    scrollLeftMax: 0,
    scrollWidth: 0,
    clientHeight: 0,
    scrollTop: 0,
    scrollTopMax: 0,
    scrollHeight: 0,
  })
  const updateScrollProps = useCallback(() => {
    const container = containerRef.current
    if (container){
      const d = new GetDimensions(container)
      //console.log('container.scrollWidth',container.scrollWidth)
      setScrollProps({
        clientWidth: d.contentWidthRounded,
        scrollLeft: d.scrollLeft,
        scrollLeftMax: d.scrollLeftMax,
        scrollWidth: d.scrollWidth,
        clientHeight: d.contentHeightRounded,
        scrollTop: d.scrollTop,
        scrollTopMax: d.scrollTopMax,
        scrollHeight: d.scrollHeight,
      })
    }
  },[containerRef.current])
  
  
  
  const [canScrollHorizontal,setCanScrollHorizontal] = useState(false)
  const [canScrollVertical,setCanScrollVertical] = useState(false)
  useEffect(()=>{
    setCanScrollHorizontal(scrollProps.clientWidth!==scrollProps.scrollWidth)
    setCanScrollVertical(scrollProps.clientHeight!==scrollProps.scrollHeight)
  },[scrollProps])
  
  
  useEffect(()=>{
    updateScrollProps()
    const container = containerRef.current!
    const content = contentRef.current!
    if (container || content){
      const resizeObserver = new ResizeObserver(()=>{
        //console.log('resize')
        updateScrollProps()
      })
      container && resizeObserver.observe(container)
      content && resizeObserver.observe(content)
      return ()=>resizeObserver.disconnect()
    }
  },[containerRef.current, contentRef.current, updateScrollProps])
  
  
  const setContainerScroll = useCallback(
    (scroll: ScrollToOptions) => {
      containerRef.current?.scrollTo(scroll)
    },
    [containerRef.current]
  )
  
  const onContainerScroll = useCallback(
    (ev: Event) => {
      updateScrollProps()
    },
    [updateScrollProps]
  )
  
  // add onScroll handler to container
  useEffect(()=>{
    const container = containerRef.current
    if (container){
      container.addEventListener('scroll', onContainerScroll)
      return ()=>container.removeEventListener('scroll', onContainerScroll)
    }
  },[containerRef.current, onContainerScroll])
  
  
  return {
    scrollbarProps: { // for scrollbar
      scrollProps,
      setContainerScroll,
    },
    canScrollHorizontal, // for scrollbar
    canScrollVertical, // for scrollbar
  }
}