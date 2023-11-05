import { AxiosResponse } from 'axios'


export namespace ApiUtils {
  
  
  export interface SuccessResponse extends AxiosResponse {
    status: 200
    data: unknown
  }
  
  export interface ErrorResponse {
    status: 400|401
    data: {
      code: string
      msg: string
    }
  }
  
  export interface NoUserErrorResponse extends ErrorResponse {
    status: 400,
    data: {
      code: "NO_USER"
      msg: string
    }
  }
  
}