import { AxiosConfig } from '../AxiosConfig';
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes';
import { AxiosResponse } from 'axios';


export namespace UserApi {
  import axAccess = AxiosConfig.axAccess
  import ax = AxiosConfig.ax
  import AccessRespE = AxiosConfig.AccessRespE;
  
  
  
  export type CurrentUser = {
    id: string,
    email: string,
    emailVerified: boolean,
    roles: string[],
    created: string,
    updated: string,
    enabled: boolean,
    firstName: string,
    lastName: string,
    birthDate: string,
    sex: "MALE"|"FEMALE"
  }
  export interface CurrentUserRespS extends AxiosResponse{
    status: 200,
    data: { user: CurrentUser }
  }
  export type CurrentUserRespE = AccessRespE | {
    status: 400,
    data: {
      code: "NO_USER"
      msg: string
    }
  }
  export const current = async (): Promise<CurrentUserRespS> => axAccess.get(r.userCurrent)
  
  
  
  
  export type UserToCreate = {
    email: string,
    pwd: string,
    firstName: string,
    lastName: string,
    sex: "MALE"|"FEMALE",
    birthDate: string, // "2002-12-30" "1999-12-31"
  }
  export interface CreateUserRespS extends AxiosResponse {
    status: 200,
    data: {
      accessToken: string,
      user: CurrentUser
    }
  }
  export type CreateUserRespE = {
    status: 400,
    data: {
      code: "INVALID_INPUT_BODY"
      extraCode: "INVALID_EMAIL_FORMAT"
        |"INVALID_PWD_FORMAT"
        |"INVALID_FIRST_NAME_FORMAT"
        |"INVALID_LAST_NAME_FORMAT"
      msg: string
    } | {
      code: "DUPLICATE_EMAIL"
      msg: string
    }
  }
  export const create = (user: UserToCreate): Promise<CreateUserRespS> => ax.post(r.userCreate,user)
  
  
  
  
}