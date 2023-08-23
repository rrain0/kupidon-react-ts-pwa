import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import {GetDimensions} from "src/utils/GetDimensions"


export type UseScrollbarOptions = {

}
export const useScrollbar = (
  containerRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  options: UseScrollbarOptions = { }
) => {
  
  
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
  const setScrollProps = useCallback((container: HTMLElement) => {
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
  },[])
  
  
  const canScrollHorizontal = useMemo(
    ()=>scrollProps.clientWidth!==scrollProps.scrollWidth,
    [scrollProps]
  )
  const canScrollVertical = useMemo(
    ()=>scrollProps.clientHeight!==scrollProps.scrollHeight,
    [scrollProps]
  )
  
  
  useLayoutEffect(()=>{
    const container = containerRef.current!
    const content = contentRef.current!
    const containerResizeObserver = new ResizeObserver(()=>setScrollProps(container))
    containerResizeObserver.observe(container)
    const contentResizeObserver = new ResizeObserver(()=>setScrollProps(container))
    contentResizeObserver.observe(content)
    setScrollProps(container)
    return ()=>{
      containerResizeObserver.disconnect()
      contentResizeObserver.disconnect()
    }
  },[containerRef.current, contentRef.current, setScrollProps])
  
  
  const setContainerScroll = useCallback(
    (scroll: ScrollToOptions) => {
      containerRef.current!.scrollTo(scroll)
    },
    [containerRef.current]
  )
  
  const onContainerScroll = (ev: React.UIEvent<HTMLElement>) => {
    const container = ev.target as HTMLElement
    setScrollProps(container)
  }
  
  return {
    containerProps: { // for container
      onScroll: onContainerScroll,
    },
    scrollbarProps: { // for scrollbar
      scrollProps,
      setContainerScroll,
    },
    canScrollHorizontal, // for scrollbar
    canScrollVertical, // for scrollbar
  }
}