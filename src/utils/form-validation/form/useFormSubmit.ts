import React, { useCallback, useEffect, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import updateFailures = ValidationActions.updateFailures
import Values = ValidationCore.Values
import FailureType = ValidationCore.FailureType
import Failures = ValidationCore.Failures
import SetterOrUpdater = TypeUtils.SetterOrUpdater






export type UseFormSubmitProps
<Vs extends Values>
= {
  failures: Failures<Vs>
  setFailures: SetterOrUpdater<Failures<Vs>>
  failedFields: (keyof Vs)[]
  getCanSubmit: (failedFields: (keyof Vs)[])=>boolean
  request: ()=>void
  loading: boolean
  resetSuccess: ()=>void
}
export const useFormSubmit =
<Vs extends Values>
(props: UseFormSubmitProps<Vs>)=>{
  const {
    failures,
    setFailures,
    failedFields,
    getCanSubmit,
    request,
    loading,
    resetSuccess,
  } = props
  
  
  
  
  
  
  const [canSubmit, setCanSubmit] = useState(false)
  useEffect(
    ()=>{
      setCanSubmit(getCanSubmit(failedFields))
    },
    [failedFields, getCanSubmit]
  )
  
  
  
  // It needs because of Chrome's autofill on Android: when browser pastes login/pwd,
  // failure state does not have time to update
  const [doSubmit, setDoSubmit] = useState(false)
  const onFormSubmitCallback = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault()
      setDoSubmit(true)
    },
    []
  )
  const submit = useCallback(
    ()=>setDoSubmit(true),
    []
  )
  
  
  const trySubmit = useCallback(
    ()=>{
      if (loading) return
      
      resetSuccess()
      
      const serverFailures = failures
        .filter(f=>f.type==='server' && (f.highlight || f.notify))
      if (serverFailures.length) setFailures(s=>updateFailures(
        s,
        { failures: serverFailures },
        { highlight: false, notify: false }
      ))
      
      const failsToShow = failures
        .filter(f=>(['default','normal'] as FailureType[]).includes(f.type))
        .filter(f=>!f.highlight || !f.notify || f.isDelayed)
      setFailures(s=>updateFailures(
        s,
        { failures: failsToShow },
        { highlight: true, notify: true, delay: 0 }
      ))
      
      if (!canSubmit) return
      
      request()
    },
    [loading, resetSuccess, failures, setFailures, canSubmit, request]
  )
  
  useEffect(
    ()=>{
      if (doSubmit){
        setDoSubmit(false)
        trySubmit()
      }
    },
    [doSubmit, trySubmit]
  )
  
  
  
  
  
  
  
  
  return {
    canSubmit,
    failedFields,
    onFormSubmitCallback,
    submit,
  } as const
}
