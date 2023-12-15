import { useLayoutEffect } from 'react'



const onTouch = (ev: TouchEvent)=>ev.preventDefault()



/*
* Аналогично CSS 'touch-action: none;'
* но может отменить перехват жестов браузером уже ПОСЛЕ появления события.
* */
export const useNoTouchAction = (
  lock: boolean|undefined = false,
  deps: any[]|undefined = []
)=>{
  useLayoutEffect(
    ()=>{
      if (lock){
        window.addEventListener('touchstart',onTouch,{ passive: false })
        window.addEventListener('touchmove',onTouch,{ passive: false })
        return ()=>{
          window.removeEventListener('touchstart',onTouch)
          window.removeEventListener('touchmove',onTouch)
        }
      } else {
        return ()=>{
          window.removeEventListener('touchstart',onTouch)
          window.removeEventListener('touchmove',onTouch)
        }
      }
    },
    [lock, ...deps]
  )
}