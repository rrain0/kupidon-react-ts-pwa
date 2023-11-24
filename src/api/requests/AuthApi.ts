import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api/ApiRoutes'
import { UserApi } from './UserApi'
import ax = AxiosConfig.ax
import CurrentUser = UserApi.CurrentUser
import handleResponse = ApiUtils.handleResponse
import NoUserResponseError = ApiUtils.NoUserResponseError
import TechnicalError = ApiUtils.TechnicalError



export namespace AuthApi {
  
  
  
  
  export type LoginSuccessData = {
    accessToken: string
    user: CurrentUser
  }
  export type LoginErrorData = NoUserResponseError | TechnicalError
  export type LoginPwd = {
    login: string,
    pwd: string
  }
  export const login = async(loginPwd: LoginPwd) =>
    handleResponse<LoginSuccessData, LoginErrorData>
    (ax.post(r.authLogin,loginPwd))
  
  
  
  
}