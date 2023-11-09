import { AxiosError, AxiosResponse } from 'axios'



export namespace ApiUtils {
  
  
  
  export interface SuccessResponse<D = unknown> {
    success: true
    data: D
  }
  
  
  
  
  
  export interface ResponseError {
    code: string
    msg: string
    extra?: any
  }
  export interface ErrorResponse<E extends ResponseError> {
    success: false
    error: E
  }
  
  
  
  export type GenericError<E extends ResponseError>
    = E | ConnectionError | UnknownError
  export type GenericErrorResponse<E extends ResponseError>
    = ErrorResponse<GenericError<E>>
  
  
  
  export type ApiResponse<D, E extends ResponseError>
    = SuccessResponse<D> | GenericErrorResponse<E>
  
  
  
  
  export interface UnknownError extends ResponseError {
    code: 'unknown'
    msg: 'Unknown error'
    extra?: any
  }
  export interface UnknownErrorResponse extends ErrorResponse<UnknownError>{}
  export function getUnknownError(error?: any): UnknownErrorResponse {
    const unknown: UnknownErrorResponse = {
      success: false,
      error: {
        code: 'unknown',
        msg: 'Unknown error',
      }
    }
    if (error!==undefined) unknown.error.extra = error
    console.warn('Unknown response error',unknown)
    return unknown
  }
  
  
  
  export interface ConnectionError extends ResponseError {
    code: 'connection-error'
    msg: 'Connection error'
  }
  export interface ConnectionErrorResponse extends ErrorResponse<ConnectionError>{}
  export function getConnectionError(): ConnectionErrorResponse {
    return {
      success: false,
      error: {
        code: 'connection-error',
        msg: 'Connection error',
      }
    }
  }
  
  
  
  export function handleErrorResponse
  <E extends ResponseError>
  (ex: any)
  : GenericErrorResponse<E> {
    if (ex instanceof AxiosError && ex.response?.status===400) {
      return {
        success: false,
        error: ex.response.data as E
      } as ErrorResponse<E>
    }
    if (ex instanceof AxiosError && ex.code===AxiosError.ERR_NETWORK){
      return getConnectionError()
    }
    return getUnknownError(ex)
  }
  
  export function handleSuccessResponse
  <D = unknown>
  (response: AxiosResponse)
  : SuccessResponse<D> | UnknownErrorResponse {
    if (response.status===200) return {
      success: true,
      data: response.data as D,
    } as SuccessResponse<D>
    return getUnknownError(response)
  }
  
  export async function handleResponse
  <D, E extends ResponseError>
  (responsePromise: Promise<AxiosResponse>){
    try {
      const response = await responsePromise
      return handleSuccessResponse<D>(response)
    } catch (ex) {
      return handleErrorResponse<E>(ex)
    }
  }
  
  
  
  
  export interface NoUserResponseError extends ResponseError {
    code: "NO_USER"
    msg: string
  }
  
  
  
}