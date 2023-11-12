import { ApiUtils } from 'src/api/ApiUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api-routes/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import ax = AxiosConfig.ax
import handleResponse = ApiUtils.handleResponse
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError
import NoUserResponseError = ApiUtils.NoUserResponseError



export namespace UserApi {
  
  
  export type GenderEnum = "MALE"|"FEMALE"
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
    gender: GenderEnum
  }
  export type CurrentUserSuccessData = {
    user: CurrentUser
  }
  export type CurrentUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError
  export const current = async() =>
    handleAuthenticatedResponse<CurrentUserSuccessData, CurrentUserErrorData>
    (axAccess.get(r.userCurrent))
    
  
  
  
  
  
  
  export interface CreateSuccessData {
    accessToken: string
    user: CurrentUser
  }
  export type CreateErrorData = TechnicalError | {
    code: "DUPLICATE_EMAIL"
    msg: string
  }
  export type UserToCreate = {
    email: string,
    pwd: string,
    name: string,
    gender: "MALE"|"FEMALE",
    birthDate: string, // "2002-12-30" "1999-12-31"
  }
  export const create = async(user: UserToCreate) =>
    handleResponse<CreateSuccessData,CreateErrorData>
    (ax.post(r.userCreate,user))
  
  
  
  
  
  export type UpdateUserSuccessData = CurrentUserSuccessData
  export type UpdateUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError
  export type UserToUpdate = {
    name?: string | undefined,
    birthDate?: string | undefined, // "2002-12-30" "1999-12-31"
  }
  export const update = async(user: UserToUpdate) =>
    handleAuthenticatedResponse<UpdateUserSuccessData, UpdateUserErrorData>
    (axAccess.put(r.userUpdate,user))
  
  
  
  
}