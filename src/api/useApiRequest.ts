import { useCallback, useEffect, useState } from 'react'
import { ApiUtils } from 'src/api/ApiUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import Values = ValidationCore.Values
import SetterOrUpdater = TypeUtils.SetterOrUpdater
import ApiResponse = ApiUtils.ApiResponse
import ResponseError = ApiUtils.ResponseError
import GenericError = ApiUtils.GenericError





export type ResponseData
<Vs extends Values, D, E extends ResponseError> = {
  data?: D
  error?: GenericError<E>
  usedValues: Vs
}

export type UseApiRequestProps
<Vs extends Values, D, E extends ResponseError
> = {
  values: Vs
  setValues: SetterOrUpdater<Vs>
  failedFields: (keyof Vs)[]
  prepareAndRequest: (values: Vs, failedFields: (keyof Vs)[])=>Promise<ApiResponse<D,E>>
}
export const useApiRequest =
<Vs extends Values, D, E extends ResponseError>
(props: UseApiRequestProps<Vs,D,E>)=>{
  const {
    values,
    setValues,
    failedFields,
    prepareAndRequest,
  } = props
  
  
  
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const resetResponse = useCallback(
    ()=>{
      setIsSuccess(false)
      setIsError(false)
      setResponse(undefined)
    },
    []
  )
  
  
  const [response, setResponse] = useState(
    undefined as undefined | ResponseData<Vs,D,E>
  )
  
  
  
  
  
  const [doRequest, setDoRequest] = useState(false)
  const request = useCallback(
    ()=>setDoRequest(true),
    []
  )
  
  
  const tryRequest = useCallback(
    async()=>{
      if (isLoading) return
      setIsLoading(true)
      resetResponse()
      try {
        const response = await prepareAndRequest(values,failedFields)
        if (response.success){
          setResponse({ data: response.data, usedValues: values })
          setIsSuccess(true)
        }
        else {
          setResponse({ error: response.error, usedValues: values })
          setIsError(true)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, resetResponse, prepareAndRequest, values, failedFields]
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
    isLoading,
    isSuccess,
    isError,
    response,
    resetResponse,
  } as const
}
