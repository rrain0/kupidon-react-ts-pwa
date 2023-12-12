import { useLayoutEffect } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import commonCss from 'src/styles/common.module.scss'




export const useNoSelect = (
  lock?: boolean|empty,
  deps?: any[]|empty
)=>{
  useLayoutEffect(()=>{
    const root = document.documentElement // get html
    //const all = document.querySelectorAll('*')
    if (lock){
      root.classList.add(commonCss.noSelect)
      //all.forEach(it=>it.classList.add(commonCss.noTouchAction))
      return ()=>{
        root.classList.remove(commonCss.noSelect)
        //all.forEach(it=>it.classList.remove(commonCss.noTouchAction))
      }
    } else {
      root.classList.remove(commonCss.noSelect)
      //all.forEach(it=>it.classList.remove(commonCss.noTouchAction))
    }
  },[lock, ...(deps??[])])
}