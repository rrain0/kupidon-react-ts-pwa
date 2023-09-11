import React, { useLayoutEffect } from 'react'
import { Utils } from 'src/utils/Utils'
import empty = Utils.empty
import cmcss from 'src/styles/common.module.scss'




export const useNoSelect = (
  lock?: boolean|empty,
)=>{
  useLayoutEffect(()=>{
    const root = document.querySelector(':root')!
    if (lock){
      root.classList.add(cmcss.noSelect)
      return ()=>root.classList.remove(cmcss.noSelect)
    } else root.classList.remove(cmcss.noSelect)
  },[lock])
}