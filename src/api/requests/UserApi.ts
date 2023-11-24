import { ApiUtils } from 'src/api/ApiUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { AxiosConfig } from '../AxiosConfig'
import { ApiRoutes as r } from 'src/api/ApiRoutes'
import axAccess = AxiosConfig.axAccess
import ax = AxiosConfig.ax
import handleResponse = ApiUtils.handleResponse
import TechnicalError = ApiUtils.TechnicalError
import handleAuthenticatedResponse = ApiUtils.handleAuthenticatedResponse
import AuthenticationError = ApiUtils.AuthenticationError
import NoUserResponseError = ApiUtils.NoUserResponseError



export namespace UserApi {
  
  
  import PartialUndef = TypeUtils.PartialUndef
  export type GenderEnum = "MALE"|"FEMALE"
  export type CurrentUser = {
    id: string
    email: string
    emailVerified: boolean
    roles: string[]
    created: string
    updated: string
    name: string
    birthDate: string
    gender: GenderEnum
    aboutMe: string
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
    birthDate: string, // '2005-11-10T00:00:00.000+08:00'
  }
  export const create = async(user: UserToCreate, lang: string) =>
    handleResponse<CreateSuccessData,CreateErrorData>
    (ax.post(r.userCreate, user, { params: { lang } }))
  
  
  
  
  
  export type UpdateUserSuccessData = CurrentUserSuccessData
  export type UpdateUserErrorData =
    AuthenticationError | NoUserResponseError | TechnicalError | {
    code: "INVALID_PWD"
    msg: string
  }
  export type UserToUpdate = PartialUndef<{
    name: string
    birthDate: string // '2005-11-10T00:00:00.000+08:00'
    aboutMe: string
    currentPwd: string
    pwd: string
  }>
  export const update = async(user: UserToUpdate) =>
    handleAuthenticatedResponse<UpdateUserSuccessData, UpdateUserErrorData>
    (axAccess.put(r.userUpdate,user))
  
  
  
  
}