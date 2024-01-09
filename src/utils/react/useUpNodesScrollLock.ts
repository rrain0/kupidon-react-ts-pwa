import React, { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import commonCss from 'src/styles/common.module.scss'




export const useUpNodesScrollLock = (
  elementRef: React.RefObject<HTMLElement>,
  lock?: boolean|empty,
)=>{
  useLayoutEffect(
    ()=>{
      const el = elementRef.current
      if (el && lock){
        // Setting overflow on body passes directly to WINDOW
        const x: Element[] = [document.body]
        const y: Element[] = [document.body]
        let up = el.parentElement
        while (up) {
          const getComputedStyle = function(){
            if (up.computedStyleMap as unknown)
              return (prop: string)=>up!.computedStyleMap().get(prop)
            return (prop: string)=>window.getComputedStyle(up!)[prop]
          }()
          if (['auto','scroll'].includes(
            getComputedStyle('overflow-x') as any
          )) x.push(up)
          if (['auto','scroll'].includes(
            getComputedStyle('overflow-y') as any
          )) y.push(up)
          up = up.parentElement
        }
        x.forEach(el=>el.classList.add(commonCss.noScrollX))
        y.forEach(el=>el.classList.add(commonCss.noScrollY))
        return ()=>{
          x.forEach(el=>el.classList.remove(commonCss.noScrollX))
          y.forEach(el=>el.classList.remove(commonCss.noScrollY))
        }
      }
    },
    [elementRef.current, lock]
  )
}