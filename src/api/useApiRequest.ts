import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { ApiUtils0 } from 'src/api/ApiUtils0'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import ErrorResponse = ApiUtils0.ErrorResponse0
import Values = ValidationCore.Values
import SetterOrUpdater = TypeUtils.SetterOrUpdater






export type UseApiRequestProps
<Vs extends Values, R extends AxiosResponse>
= {
  values: Vs
  setValues: SetterOrUpdater<Vs>
  failedFields: (keyof Vs)[]
  prepareAndRequest: (values: Vs, failedFields: (keyof Vs)[])=>Promise<R>
  onSuccess: (data: R['data'])=>void
}
export const useApiRequest =
<Vs extends Values, R extends AxiosResponse>
(props: UseApiRequestProps<Vs,R>)=>{
  const {
    values,
    setValues,
    failedFields,
    prepareAndRequest,
    onSuccess,
  } = props
  
  
  
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const resetSuccess = useCallback(
    ()=>setSuccess(false),
    []
  )
  
  
  
  
  const [response, setResponse] = useState(
    undefined as undefined | {
      success?: R
      error?: any
      usedValues: Vs
    }
  )
  
  
  
  useEffect(
    ()=>{
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
    },
    [response, onSuccess, setValues]
  )
  
  
  
  
  
  
  const [doRequest, setDoRequest] = useState(false)
  const request = useCallback(
    ()=>setDoRequest(true),
    []
  )
  
  
  const tryRequest = useCallback(
    async()=>{
      if (loading) return
      setLoading(true)
      try {
        const response = await prepareAndRequest(values,failedFields)
        setResponse({ success: response, usedValues: values })
      } catch (e){
        setResponse({ error: e, usedValues: values })
      } finally {
        setLoading(false)
      }
    },
    [loading, values, prepareAndRequest, failedFields]
  )
  
  
  useEffect(
    ()=>{
      if (doRequest){
        setDoRequest(false)
        void tryRequest()
      }
    },
    [doRequest, tryRequest]
  )
  
  
  
  
  return {
    request,
    loading,
    success,
    resetSuccess,
  } as const
}
