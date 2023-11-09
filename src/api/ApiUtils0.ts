import { AxiosResponse } from 'axios'


export namespace ApiUtils0 {
  
  
  export interface SuccessResponse0 extends AxiosResponse {
    status: 200
    data: unknown
  }
  
  export interface ErrorResponse0 {
    status: 400|401
    data: {
      code: string
      msg: string
    }
  }
  
  export interface NoUserErrorResponse0 extends ErrorResponse0 {
    status: 400,
    data: {
      code: "NO_USER"
      msg: string
    }
  }
  
}