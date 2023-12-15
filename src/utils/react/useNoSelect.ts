import { useLayoutEffect } from 'react'
import commonCss from 'src/styles/common.module.scss'




export const useNoSelect = (
  lock: boolean|undefined = false,
  deps: any[]|undefined = []
)=>{
  useLayoutEffect(()=>{
    const root = document.documentElement // get html
    if (lock){
      root.classList.add(commonCss.noSelect)
      return ()=>{
        root.classList.remove(commonCss.noSelect)
      }
    } else {
      root.classList.remove(commonCss.noSelect)
    }
  },[lock, ...deps])
}