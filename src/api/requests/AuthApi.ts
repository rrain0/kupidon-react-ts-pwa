import { AxiosError } from 'axios'
import { ApiUtils } from 'src/api/ApiUtils'
import { ApiUtils0 } from 'src/api/ApiUtils0'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes'
import { UserApi } from './UserApi'
import ax = AxiosConfig.ax
import CurrentUser = UserApi.CurrentUser
import SuccessResponse0 = ApiUtils0.SuccessResponse0
import ErrorResponse0 = ApiUtils0.ErrorResponse0
import SuccessResponse = ApiUtils.SuccessResponse
import ErrorResponse = ApiUtils.ErrorResponse
import handleResponse = ApiUtils.handleResponse



export namespace AuthApi {
  
  
  
  
  export interface LoginRespS0 extends SuccessResponse0 {
    data: {
      accessToken: string,
      user: CurrentUser
    }
  }
  export interface LoginRespE0 extends ErrorResponse0 {
    data: {
      code: "INVALID_INPUT_BODY"|"NO_USER"
      msg: string
    }
  }
  export type LoginPwd = {
    login: string,
    pwd: string
  }
  export const login0 = (loginPwd: LoginPwd): Promise<LoginRespS0> =>
    ax.post(r.authLogin, loginPwd)
  
  
  
  
  export interface LoginSuccessData {
    accessToken: string
    user: CurrentUser
  }
  export interface LoginErrorData {
    code: "INVALID_INPUT_BODY"|"NO_USER"
    msg: string
  }
  export const login = async (loginPwd: LoginPwd) =>
    handleResponse<LoginSuccessData, LoginErrorData>(ax.post(r.authLogin, loginPwd))
  
  
  
  
}