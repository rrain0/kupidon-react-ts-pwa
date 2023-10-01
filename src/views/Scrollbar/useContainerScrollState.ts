import React, { useCallback, useEffect, useState } from 'react'
import {GetDimensions} from "src/utils/common/GetDimensions"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import Setter = TypeUtils.Setter



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
export type SetScrollProps = Setter<ScrollToOptions>

export type ContainerScrollStateOptions = (
  {
    containerIsWindow: true
    containerRef?: never | empty
  } | {
    containerIsWindow?: false | empty
    containerRef: React.RefObject<HTMLElement>
  }
) & {
  contentRef: React.RefObject<HTMLElement>
}
export const useContainerScrollState = ({
  containerIsWindow, containerRef, contentRef
}: ContainerScrollStateOptions)=>{
  
  
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
    const container = containerRef?.current
    const view = containerIsWindow ? window : container
    if (view){
      const d = new GetDimensions(view)
      //console.log('container.scrollWidth',container.scrollWidth)
      setScrollProps({
        clientWidth: d.contentWidth,
        scrollLeft: d.scrollLeft,
        scrollLeftMax: d.scrollLeftMax,
        scrollWidth: d.scrollWidth,
        clientHeight: d.contentHeight,
        scrollTop: d.scrollTop,
        scrollTopMax: d.scrollTopMax,
        scrollHeight: d.scrollHeight,
      })
    }
  },[containerIsWindow, containerRef?.current])
  
  
  
  const [canScrollHorizontal,setCanScrollHorizontal] = useState(false)
  const [canScrollVertical,setCanScrollVertical] = useState(false)
  useEffect(()=>{
    setCanScrollHorizontal(scrollProps.clientWidth!==scrollProps.scrollWidth)
    setCanScrollVertical(scrollProps.clientHeight!==scrollProps.scrollHeight)
  },[scrollProps])
  
  
  useEffect(()=>{
    updateScrollProps()
    const container = containerRef?.current
    const content = contentRef.current
    let clearActions = [] as Array<()=>void>
    if (container && !containerIsWindow || content){
      const resizeObserver = new ResizeObserver(()=>{
        updateScrollProps()
      })
      container && !containerIsWindow && resizeObserver.observe(container)
      content && resizeObserver.observe(content)
      clearActions.push(()=>resizeObserver.disconnect())
    }
    if (containerIsWindow){
      const onResize = function(this: Window, ev: UIEvent){
        updateScrollProps()
      }
      window.addEventListener('resize',onResize)
      clearActions.push(()=>window.removeEventListener('resize',onResize))
    }
    if (clearActions.length) return ()=>clearActions.forEach(it=>it())
  },[containerIsWindow, containerRef?.current, contentRef.current, updateScrollProps])
  
  
  const setContainerScroll = useCallback(
    (scroll: ScrollToOptions) => {
      const container = containerRef?.current
      const view = containerIsWindow ? window : container
      view?.scrollTo(scroll)
    },
    [containerIsWindow, containerRef?.current]
  )
  
  
  // adds onScroll handler to container
  useEffect(()=>{
    const container = containerRef?.current
    const view = containerIsWindow ? window : container
    if (view){
      view.addEventListener('scroll', updateScrollProps)
      return ()=>view.removeEventListener('scroll', updateScrollProps)
    }
  },[containerIsWindow, containerRef?.current, updateScrollProps])
  
  
  return {
    scrollProps,
    setContainerScroll,
    canScrollHorizontal,
    canScrollVertical,
  }
}