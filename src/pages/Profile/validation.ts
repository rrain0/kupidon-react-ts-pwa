import { UserApi } from 'src/api/requests/UserApi'
import { ProfileUiText } from 'src/pages/Profile/uiText'
import { DateTime } from 'src/utils/DateTime'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText } from 'src/utils/lang/UiText'
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData
import UpdateUserErrorData = UserApi.UpdateUserErrorData



export namespace ProfilePageValidation {
  
  
  export type SeverErrorCode = UpdateUserErrorData['code']
  
  
  export type FailureCode =
    'name-required'
    | 'name-not-changed'
    
    | 'birth-date-not-changed'
    | 'birth-date-required'
    | 'birth-date-incorrect-format'
    | 'birth-date-not-exists'
    | 'birth-date-younger-18'
    
    | 'NO_USER'
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'name-required': ProfileUiText.firstNameIsNotEntered,
    'name-not-changed': [],
    'birth-date-not-changed': [],
    'birth-date-required': ProfileUiText.birthDateIsNotEntered,
    'birth-date-incorrect-format': ProfileUiText.birthDateHasIncorrectFormat,
    'birth-date-not-exists': ProfileUiText.dateNotExists,
    'birth-date-younger-18': ProfileUiText.youMustBeAtLeast18YearsOld,
    'NO_USER': ProfileUiText.noUserWithSuchId,
    'connection-error': ProfileUiText.connectionError,
    'unknown-error': ProfileUiText.unknownError,
  } satisfies Record<FailureCode, UiText[]>
  
  
  
  export type UserValues = {
    name: string
    birthDate: string
  }
  export type FromServerValue = {
    values: UserValues // значения, отправленные на сервердля проверки
    error: { // ошибка с сервера
      code: SeverErrorCode
      msg?: string | undefined
      extra?: any | undefined
    }
  }
  export type AuxiliaryValues = {
    fromServer: undefined | FromServerValue
    initialValues: Partial<UserValues>
  }
  export type FormValues = UserValues & AuxiliaryValues
  
  
  export const userDefaultValues: UserValues = {
    name: '',
    birthDate: '',
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
    initialValues: {},
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  const delay = 4000
  
  export const validators: Validators<FormValues> = [
    
    
    
    [['name','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['name'],FormValues['initialValues']]
      //console.log('v:',v,'ivs:',ivs)
      if ('name' in ivs && v===ivs.name) return new PartialFailureData({
        code: 'name-not-changed' satisfies FailureCode,
        msg: 'Имя не изменено',
        type: 'initial',
        errorFields: ['name'],
      })
    }],
    [['name'], (values)=>{
      const [v] = values as [FormValues['name']]
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
      })
    }],
    
    
    
    [['birthDate','initialValues'], (values)=>{
      const [v,ivs] = values as [FormValues['birthDate'],FormValues['initialValues']]
      if (
        'birthDate' in ivs
        && DateTime.eqFrom_yyyy_MM_dd(v,ivs.birthDate)
      )
        return new PartialFailureData({
          code: 'birth-date-not-changed' satisfies FailureCode,
          msg: 'Birth date is not changed',
          type: 'initial',
          errorFields: ['birthDate'],
        })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const d = defaultValues.birthDate
      if (v===d) return new PartialFailureData({
        code: 'birth-date-required' satisfies FailureCode,
        msg: 'Birth date is not entered',
        type: 'default',
      })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (!parsed) return new PartialFailureData({
        code: 'birth-date-incorrect-format' satisfies FailureCode,
        msg: 'Birth date has incorrect format',
        delay,
      })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      const normalized = parsed?.copy().normalize()
      if (parsed && !parsed.eq(normalized))
        return new PartialFailureData({
          code: 'birth-date-not-exists' satisfies FailureCode,
          msg: 'This date does not exists',
          delay,
        })
    }],
    [['birthDate'], (values)=>{
      const [v] = values as [FormValues['birthDate']]
      const parsed = DateTime.from_yyyy_MM_dd(v)
      if (parsed && parsed.getAge()<18)
        return new PartialFailureData({
          code: 'birth-date-younger-18' satisfies FailureCode,
          msg: 'You must be at least 18 years old',
          delay,
        })
    }],
    
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким id',
        type: 'server',
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




