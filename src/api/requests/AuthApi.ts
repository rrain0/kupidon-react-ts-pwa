import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes'
import { UserApi } from './UserApi'
import ax = AxiosConfig.ax
import CurrentUser = UserApi.CurrentUser
import handleResponse = ApiUtils.handleResponse



export namespace AuthApi {
  
  
  
  export interface LoginSuccessData {
    accessToken: string
    user: CurrentUser
  }
  export interface LoginErrorData {
    code: "INVALID_INPUT_BODY"|"NO_USER"
    msg: string
  }
  export type LoginPwd = {
    login: string,
    pwd: string
  }
  export const login = async (loginPwd: LoginPwd) =>
    handleResponse<LoginSuccessData, LoginErrorData>(ax.post(r.authLogin, loginPwd))
  
  
  
  
}