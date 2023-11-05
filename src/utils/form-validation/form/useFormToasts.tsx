import React, { useEffect, useMemo, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText } from 'src/utils/lang/UiText'
import { ToastMsg, ToastMsgData, useToasts } from 'src/utils/toasts/useToasts'
import Failure = ValidationCore.Failure
import Values = ValidationCore.Values
import awaitDelay = ValidationActions.awaitDelay
import Failures = ValidationCore.Failures
import updateFailures = ValidationActions.updateFailures
import Updater = TypeUtils.Updater



export type UseFormToastsProps
<Vs extends Values>
= {
  isLoading?: boolean | undefined, 
  loadingText?: UiText[] | undefined,
  isSuccess?: boolean | undefined, 
  successText?: UiText[] | undefined,
  failures: Failures<Vs>,
  setFailures: Updater<Failures<Vs>>
  failureCodeToUiText?: { [prop: string]: UiText[] } | undefined,
}
export const useFormToasts =
<Vs extends Values>
(props: UseFormToastsProps<Vs>)=>{
  const {
    isLoading = false,
    loadingText,
    isSuccess = false,
    successText,
    failures,
    setFailures,
    failureCodeToUiText,
  } = props
  
  
  const [userFailure, setUserFailure] =
    useState(undefined as undefined|Failure<Vs>)
  const [serverFailure, setServerFailure] =
    useState(undefined as undefined|Failure<Vs>)
  
  
  useEffect(()=>{
    setUserFailure(undefined)
    setServerFailure(undefined)
    const stale: [boolean] = [false]
    
    const userFailures = failures
      .filter(f=>!f.canSubmit && f.notify)
    awaitDelay(userFailures, stale, setUserFailure)
    
    const serverFailures = failures
      .filter(f=>f.canSubmit && f.notify)
    awaitDelay(serverFailures, stale, setServerFailure)
    
    return ()=>{ stale[0]=true }
  },[failures])
  
  const userFailureMsg = useMemo(
    ()=>{
      if (userFailure) return new ToastMsgData({
        type: 'danger',
        msg: <ToastMsg
          uiOption={failureCodeToUiText?.[userFailure.code]}
          defaultText={userFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (userFailure.notify) setFailures(s=>updateFailures(
            s,
            { failures: [userFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [failureCodeToUiText, userFailure]
  )
  const serverFailureMsg = useMemo(
    ()=>{
      if (serverFailure) return new ToastMsgData({
        type: 'danger',
        msg: <ToastMsg
          uiOption={failureCodeToUiText?.[serverFailure.code]}
          defaultText={serverFailure.msg}
        />,
        closeOnUnmount: true,
        showCloseButton: true,
        dragToClose: true,
        onClose: ()=>{
          if (serverFailure.notify) setFailures(s=>updateFailures(
            s,
            { failures: [serverFailure] },
            { notify: false }
          ))
        }
      })
      return undefined
    },
    [failureCodeToUiText, serverFailure]
  )
  const [loadingMsg] = useState(()=>new ToastMsgData({
    type: 'loading',
    msg: <ToastMsg uiOption={loadingText}/>,
    closeOnUnmount: true,
  }))
  const [loginSuccessMsg] = useState(()=>new ToastMsgData({
    type: 'ok',
    msg: <ToastMsg uiOption={successText}/>,
    lifetime: 1500,
    dragToClose: true,
  }))
  
  
  useToasts({ toasts: [
    userFailureMsg,
    isLoading && loadingMsg,
    isSuccess && loginSuccessMsg,
    serverFailureMsg,
  ]})
  
  
}