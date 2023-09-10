import React, { useCallback, useLayoutEffect, useState } from 'react'
import {GetDimensions} from "src/utils/GetDimensions"



export type UseScrollbarOptions = {

}
export const useScrollbar = (
  containerRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  options: UseScrollbarOptions = { }
)=>{
  
  
  const [scrollProps, _setScrollProps] = useState({
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
      _setScrollProps({
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
  useLayoutEffect(()=>{
    setCanScrollHorizontal(scrollProps.clientWidth!==scrollProps.scrollWidth)
    setCanScrollVertical(scrollProps.clientHeight!==scrollProps.scrollHeight)
  },[scrollProps])
  
  
  useLayoutEffect(()=>{
    updateScrollProps()
    const container = containerRef.current!
    const content = contentRef.current!
    if (container || content){
      const resizeObserver = new ResizeObserver(()=>{
        console.log('resize')
        updateScrollProps()
      })
      container && resizeObserver.observe(container)
      content && resizeObserver.observe(content)
      return ()=>resizeObserver.disconnect()
    }
  },[containerRef.current, contentRef.current, updateScrollProps])
  
  
  const setContainerScroll = useCallback(
    (scroll: ScrollToOptions) => {
      containerRef.current!.scrollTo(scroll)
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
  useLayoutEffect(()=>{
    const container = containerRef.current
    if (container){
      container.addEventListener('scroll', onContainerScroll)
      return ()=>container.removeEventListener('scroll', onContainerScroll)
    }
  },[containerRef.current, onContainerScroll])
  
  
  return {
    /*containerProps: { // for container
      onScroll: onContainerScroll,
    },*/
    scrollbarProps: { // for scrollbar
      scrollProps,
      setContainerScroll,
    },
    canScrollHorizontal, // for scrollbar
    canScrollVertical, // for scrollbar
  }
}