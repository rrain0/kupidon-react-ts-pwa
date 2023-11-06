import { AxiosError, AxiosResponse } from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { ValidationActions } from 'src/utils/form-validation/ValidationActions'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { ValidationValidate } from 'src/utils/form-validation/ValidationValidate'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import validate = ValidationValidate.validate
import Validators = ValidationCore.Validators
import updateFailures = ValidationActions.updateFailures
import ErrorResponse = ApiUtils.ErrorResponse
import Values = ValidationCore.Values
import FailureType = ValidationCore.FailureType






export type UseFormProps
<Vs extends Values, RP extends any[], R extends AxiosResponse>
= {
  defaultValues: Vs
  validators: Validators<Vs>
  getCanSubmit: (failedFields: (keyof Vs)[])=>boolean
  prepareRequestData: (values: Vs, failedFields: (keyof Vs)[])=>RP
  doRequest: (...args: RP)=>Promise<R>
  onSuccess: (data: R['data'])=>void
}
export const useForm =
<Vs extends Values, RP extends any[], R extends AxiosResponse>
(props: UseFormProps<Vs,RP,R>)=>{
  const {
    defaultValues,
    validators,
    getCanSubmit,
    prepareRequestData,
    doRequest,
    onSuccess,
  } = props
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [values, setValues] = useState(defaultValues)
  const [prevValues, setPrevValues] = useState(defaultValues)
  const [failures, setFailures] = useState(()=>validate(
    { values: defaultValues, validators: validators }
  ))
  
  
  
  const updateFailuresEffectEvent = useEffectEvent(
    (values: Vs)=>{
      //console.log('I prevValues',prevValues)
      //console.log('II values',values)
      //console.log('III prevFailures',failures)
      const newFailures = validate({
        values,
        prevValues,
        prevFailures: failures,
        validators
      })
      //console.log('IV newFailures',newFailures)
      setFailures(newFailures)
      setPrevValues(values)
    }
  )
  useEffect(
    ()=>updateFailuresEffectEvent(values),
    [values]
  )
  
  
  
  
  const [response, setResponse] = useState(
    undefined as undefined | {
      success?: R
      error?: any
      usedValues: Vs
    }
  )
  
  
  
  useEffect(()=>{
    if (response){
      const { success:s, error:e, usedValues } = response
      setResponse(undefined)
      //console.log('s',s,'e',e)
      if (s){
        onSuccess(s.data)
        setSuccess(true)
      } else if (e){
        setSuccess(false)
        
        if (e instanceof AxiosError && e.response?.status===400) {
          const response = e.response as ErrorResponse
          setValues(vs=>(
            { ...vs, fromServer: {
                values: usedValues,
                error: {
                  code: response.data.code,
                  msg: response.data.msg,
                  extra: e,
                }
              }}))
        }
        else if (e instanceof AxiosError && e.code===AxiosError.ERR_NETWORK){
          setValues(vs=>(
            { ...vs, fromServer: {
                values: usedValues,
                error: {
                  code: 'connection-error',
                  msg: 'Connection error',
                  extra: e,
                }
              }}))
        }
        else {
          setValues(vs=>(
            { ...vs, fromServer: {
                values: usedValues,
                error: {
                  code: 'unknown',
                  msg: 'Unknown error',
                  extra: e,
                }
              }}))
          console.warn('UNKNOWN ERROR',e)
        }
        
      }
    }
  },[response, onSuccess])
  
  
  
  
  
  
  const [canSubmit, setCanSubmit] = useState(false)
  const [failedFields, setFailedFields] = useState([] as (keyof Vs)[])
  useEffect(
    ()=>{
      const failed = [...failures
        .filter(f=>f.type!=='server')
        .reduce(
          (accum,f)=>{
            f.errorFields.forEach(f=>accum.add(f))
            return accum
          },
          new Set<keyof Vs>()
        )]
      setFailedFields(failed)
      setCanSubmit(getCanSubmit(failed))
    },
    [failures, getCanSubmit]
  )
  
  
  // It needs because of Chrome's autofill on Android: when browser pastes login/pwd,
  // failure state does not have time to update
  const [doSubmit, setDoSubmit] = useState(false)
  const onSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault()
      setDoSubmit(true)
    },
    []
  )
  
  const tryRequest = useCallback(
    async()=>{
      if (loading) return
      setLoading(true)
      const form = values
      try {
        const response = await doRequest(...prepareRequestData(form,failedFields))
        setResponse({ success: response, usedValues: form })
      } catch (e){
        setResponse({ error: e, usedValues: form })
      } finally {
        setLoading(false)
      }
    },
    [loading, values, doRequest, prepareRequestData, failedFields]
  )
  const tryRequestEffectEvent = useEffectEvent(()=>void tryRequest())
  
  const trySubmit = useCallback(
    ()=>{
      setSuccess(false)
      
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
      
      if (!getCanSubmit(failedFields)) return
      
      tryRequestEffectEvent()
    },
    [failures, getCanSubmit, failedFields, tryRequestEffectEvent]
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
  
  
  
  
  const validationProps = useMemo(
    ()=>({
      values,
      failures,
      setError: setFailures,
      setValues,
    }),
    [failures, values]
  )
  
  
  
  
  return {
    canSubmit: canSubmit,
    loading: loading,
    success: success,
    formValues: values,
    setFormValues: setValues,
    failures: failures,
    setFailures: setFailures,
    validationProps: validationProps,
    onSubmit: onSubmit,
    setDoSubmit: setDoSubmit,
  } as const
}
