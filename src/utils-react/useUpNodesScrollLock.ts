import React, { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import cmcss from 'src/styles/common.module.scss'




export const useUpNodesScrollLock = (
  elementRef: React.RefObject<HTMLElement>,
  lock?: boolean|empty,
)=>{
  useLayoutEffect(()=>{
    const el = elementRef.current
    if (el && lock){
      const x: Element[] = []
      const y: Element[] = []
      let up = el.parentElement
      while (up) {
        if (['auto','scroll'].includes(
          up.computedStyleMap().get('overflow-x') as any
        )) x.push(up)
        if (['auto','scroll'].includes(
          up.computedStyleMap().get('overflow-y') as any
        )) y.push(up)
        up = up.parentElement
      }
      x.forEach(el=>el.classList.add(cmcss.noScrollX))
      y.forEach(el=>el.classList.add(cmcss.noScrollY))
      return ()=>{
        x.forEach(el=>el.classList.remove(cmcss.noScrollX))
        y.forEach(el=>el.classList.remove(cmcss.noScrollY))
      }
    }
  },[elementRef.current, lock])
}