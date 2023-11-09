import { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import Values = ValidationCore.Values
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import ApiResponse = ApiUtils.ApiResponse
import ResponseError = ApiUtils.ResponseError
import GenericError = ApiUtils.GenericError






export type UseApiRequestProps
<Vs extends Values, D, E extends ResponseError
> = {
  values: Vs
  setValues: SetterOrUpdater<Vs>
  failedFields: (keyof Vs)[]
  prepareAndRequest: (values: Vs, failedFields: (keyof Vs)[])=>Promise<ApiResponse<D,E>>
  onSuccess: (data: D)=>void
}
export const useApiRequest =
<Vs extends Values, D, E extends ResponseError>
(props: UseApiRequestProps<Vs,D,E>)=>{
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
      data?: D
      error?: GenericError<E>
      usedValues: Vs
    }
  )
  
  
  
  useEffect(
    ()=>{
      if (response){
        const { data:d, error:e, usedValues } = response
        setResponse(undefined)
        //console.log('d',d,'e',e)
        if (d){
          onSuccess(d)
          setSuccess(true)
        } else if (e){
          setSuccess(false)
          setValues(vs=>({
            ...vs,
            fromServer: {
              values: usedValues,
              error: {
                code: e.code,
                msg: e.msg,
              }
            }
          }))
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
        if (response.success)
          setResponse({ data: response.data, usedValues: values })
        else
          setResponse({ error: response.error, usedValues: values })
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
