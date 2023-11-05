import { UserApi } from 'src/api/requests/UserApi'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText } from 'src/utils/lang/UiText'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserRespE = UserApi.UpdateUserRespE



export namespace ProfilePageValidation {
  
  
  export type SeverErrorCode = UpdateUserRespE['data']['code']
    | 'connection-error' | 'unknown'
  
  
  export type FailureCode = 'name-required'
    | 'name-not-changed'
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiOption = {
    'name-required': ProfileUiText.firstNameIsNotEntered,
    // todo
    'name-not-changed': [],
    'connection-error': ProfileUiText.connectionError,
    'unknown-error': ProfileUiText.unknownError,
  } satisfies Record<FailureCode, UiText<any>[]>
  
  
  
  export type UserValues = {
    name: string
  }
  export type FromServerValue = {
    values: UserValues // значения, отправленные на сервердля проверки
    error: { // ошибка с сервера
      code: SeverErrorCode
      msg?: string | undefined
      extra?: any | undefined
    }
  }
  export type FormValues = UserValues & {
    initialValues: Partial<UserValues>
    fromServer?: undefined | FromServerValue
  }
  
  
  export const defaultValues: FormValues = {
    name: '',
    initialValues: {},
  }
  
  
  
  export const validators: Validators<FormValues> = [
    
    
    
    [['name','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['name'],FormValues['initialValues']]
      if ('name' in ivs && v===ivs.name) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не изменено',
        type: 'initial',
      })
    }],
    [['name'], (values)=>{
      const [v] = values as [FormValues['name']]
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
      })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        type: 'server',
      })
    }],
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v) return new PartialFailureData({
        code: 'unknown-error' satisfies FailureCode,
        msg: 'Неизвестная ошибка',
        extra: v,
        type: 'server',
      })
    }],
    
  ]
  
}




