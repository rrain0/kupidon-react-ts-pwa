import { AxiosError, AxiosResponse } from 'axios'


export namespace ApiUtils {
  
  
  
  export interface SuccessResponse {
    success: true
    data: unknown
  }
  
  export interface ErrorResponse {
    success: false
    error: {
      code: string
      msg: string
    }
  }
  
  export type ApiResponse = SuccessResponse | ErrorResponse
  
  
  
  export interface UnknownError extends ErrorResponse {
    error: {
      code: 'unknown'
      msg: 'Unknown error'
      extra?: any
    }
  }
  export function getUnknownError(error?: any){
    const unknown = {
      success: false,
      error: {
        code: 'unknown',
        msg: 'Unknown error',
      }
    } as UnknownError
    if (error!==undefined) unknown.error.extra = error
    console.warn('Unknown response error',unknown)
    return unknown
  }
  
  
  
  export interface ConnectionError extends ErrorResponse {
    error: {
      code: 'connection-error'
      msg: 'Connection error'
    }
  }
  export function getConnectionError(){
    return {
      success: false,
      error: {
        code: 'connection-error',
        msg: 'Connection error',
      }
    } as ConnectionError
  }
  
  
  
  export function handleErrorResponse
  <ER extends ErrorResponse>
  (ex: any){
    if (ex instanceof AxiosError && ex.response?.status===400) {
      return {
        success: false,
        error: ex.response.data
      } as ER
    }
    if (ex instanceof AxiosError && ex.code===AxiosError.ERR_NETWORK){
      return getConnectionError()
    }
    return getUnknownError(ex)
  }
  
  export function handleSuccessResponse
  <SR extends SuccessResponse>
  (response: AxiosResponse){
    if (response.status===200) return {
      success: true,
      data: response.data,
    } as SR
    return getUnknownError(response)
  }
  
  export async function handleResponse
  <SR extends SuccessResponse, ER extends ErrorResponse>
  (responsePromise: Promise<AxiosResponse>){
    try {
      const response = await responsePromise
      return handleSuccessResponse<SR>(response)
    } catch (ex) {
      return handleErrorResponse<ER>(ex)
    }
  }
  
  
  
  
  export interface NoUserErrorResponse extends ErrorResponse {
    error: {
      code: "NO_USER"
      msg: string
    }
  }
  
  
  
}