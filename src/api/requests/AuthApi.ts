import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes'
import { UserApi } from './UserApi'
import ax = AxiosConfig.ax
import CurrentUser = UserApi.CurrentUser
import SuccessResponse = ApiUtils.SuccessResponse
import ErrorResponse = ApiUtils.ErrorResponse



export namespace AuthApi {
  
  
  
  export interface LoginRespS extends SuccessResponse {
    data: {
      accessToken: string,
      user: CurrentUser
    }
  }
  export interface LoginRespE extends ErrorResponse {
    data: {
      code: "INVALID_INPUT_BODY"|"NO_USER"
      msg: string
    }
  }
  export type LoginPwd = {
    login: string,
    pwd: string
  }
  export const login = (loginPwd: LoginPwd): Promise<LoginRespS> =>
    ax.post(r.authLogin, loginPwd)
  
  
  
}