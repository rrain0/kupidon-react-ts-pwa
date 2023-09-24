import React, { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import cmcss from 'src/styles/common.module.scss'




export const useNoSelect = (
  lock?: boolean|empty,
  deps?: any[]|empty
)=>{
  useLayoutEffect(()=>{
    const root = document.querySelector('html')!
    if (lock){
      root.classList.add(cmcss.noSelect)
      return ()=>root.classList.remove(cmcss.noSelect)
    } else root.classList.remove(cmcss.noSelect)
  },[lock, ...(deps??[])])
}