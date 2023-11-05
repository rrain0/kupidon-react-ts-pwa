import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import ax = AxiosConfig.ax
import AccessRespE = AxiosConfig.AccessRespE
import SuccessResponse = ApiUtils.SuccessResponse
import ErrorResponse = ApiUtils.ErrorResponse



export namespace UserApi {
  
  
  
  import NoUserErrorResponse = ApiUtils.NoUserErrorResponse
  export type CurrentUser = {
    id: string,
    email: string,
    emailVerified: boolean,
    roles: string[],
    created: string,
    updated: string,
    enabled: boolean,
    name: string,
    birthDate: string,
    sex: "MALE"|"FEMALE"
  }
  export interface CurrentUserRespS extends SuccessResponse {
    status: 200,
    data: { user: CurrentUser }
  }
  export type CurrentUserRespE = AccessRespE | NoUserErrorResponse
  export const current = async(): Promise<CurrentUserRespS> =>
    axAccess.get(r.userCurrent)
  
  
  
  
  export interface CreateUserRespS extends SuccessResponse {
    status: 200,
    data: {
      accessToken: string,
      user: CurrentUser
    }
  }
  export interface CreateUserRespE extends ErrorResponse {
    status: 400,
    data: {
      code: "INVALID_INPUT_BODY"
        |"INVALID_INPUT_BODY__INVALID_EMAIL_FORMAT"
        |"INVALID_INPUT_BODY__INVALID_PWD_FORMAT"
        |"INVALID_INPUT_BODY__INVALID_NAME_FORMAT"
        |"INVALID_INPUT_BODY__INVALID_LAST_NAME_FORMAT"
        // data integrity errors:
        |"DUPLICATE_EMAIL"
      msg: string
    }
  }
  export type UserToCreate = {
    email: string,
    pwd: string,
    name: string,
    sex: "MALE"|"FEMALE",
    birthDate: string, // "2002-12-30" "1999-12-31"
  }
  export const create = async(user: UserToCreate): Promise<CreateUserRespS> =>
    ax.post(r.userCreate,user)
  
  
  
  
  export interface UpdateUserRespS extends CurrentUserRespS {}
  export interface UpdateUserRespEOwn extends ErrorResponse {
    status: 400,
    data: {
      code: "INVALID_INPUT_BODY"
        |"INVALID_INPUT_BODY__INVALID_NAME_FORMAT"
      msg: string
    }
  }
  export type UpdateUserRespE = AccessRespE | UpdateUserRespEOwn | NoUserErrorResponse
  export type UserToUpdate = {
    name?: string | undefined,
  }
  export const update = async(user: UserToUpdate): Promise<UpdateUserRespS> =>
    axAccess.put(r.userUpdate,user)
  
  
  
  
}