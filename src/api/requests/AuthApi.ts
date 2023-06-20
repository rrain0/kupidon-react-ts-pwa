import { AxiosConfig } from '../AxiosConfig';
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes';
import { UserApi } from './UserApi';
import { AxiosResponse } from 'axios';


export namespace AuthApi {
  import ax = AxiosConfig.ax
  import CurrentUser = UserApi.CurrentUser;
  
  
  
  
  export type LoginPwd = {
    login: string,
    pwd: string
  }
  export interface LoginRespS extends AxiosResponse{
    status: 200,
    data: {
      accessToken: string,
      user: CurrentUser
    }
  }
  export type LoginRespE = {
    status: 400,
    data: {
      code: "INVALID_INPUT_BODY"|"NO_USER"
      msg: string
    }
  }
  export const login = (loginPwd: LoginPwd): Promise<LoginRespS> => ax.post(r.authLogin, loginPwd)
  
  
  
}