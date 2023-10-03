/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ValidationCore } from 'src/utils/react/form-validation/ValidationCore'
import Failures = ValidationCore.Failures
import Values = ValidationCore.Values
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import { Toasts } from 'src/utils/toasts/Toasts'
import { css } from '@emotion/react'



export const useToastFailures = <Vs extends Values>(failures: Failures<Vs>)=>{
  
  const [showingToasts, setShowingToasts, showingToastsRef] =
    useStateAndRef(()=>new Set<string>())
  
  useEffect(()=>{
    const showingIds = new Set(showingToasts)
    const failIds = new Set(failures.filter(el=>el.notifyNow).map(el=>el.id))
    
    showingIds.forEach(si=>{
      if (!failIds.has(si)){
        showingIds.delete(si)
        toast.dismiss(si)
      }
    })
    
    //console.log('notifications signupState', signupState)
    // todo priority
    const failToShow = failures.find(el=>el.notifyNow)
    if (failToShow){
      // showing only one toast
      if (!showingIds.has(failToShow.id)){
        showingIds.forEach(si=>{
          showingIds.delete(si)
          toast.dismiss(si)
        })
        showingIds.add(failToShow.id)
        Toasts.Error.show(failToShow.id,
          ()=><div css={t=>css`
          font: 400 14px/129% Roboto;
          color: var(--toastify-text-color-${t.type satisfies 'light'|'dark'});
          white-space: break-spaces;
        `}>
            Ошибка! {failToShow.msg}
          </div>
        )
      }
    }
    
    setShowingToasts(showingIds)
    
    // no need to add 'showingToasts' to deps array
  },[failures])
  
  useEffect(()=>()=>{
    showingToastsRef.current.forEach(id=>toast.dismiss(id))
    toast.dismiss(Toasts.Loading.id)
  },[])
  
}