import { UserApi } from 'src/api/requests/UserApi'
import { SignupPageUiText } from 'src/pages/Signup/uiText'
import { DateTime } from 'src/utils/DateTime'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText } from 'src/utils/lang/UiText'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import PartialFailureData = ValidationCore.PartialFailureData
import CreateErrorData = UserApi.CreateErrorData



export namespace SignupPageValidation {
  
  
  export type SeverErrorCode = CreateErrorData['code']
  
  
  export type FailureCode =
    'email-required'
    | 'email-incorrect'
    
    | 'pwd-required'
    | 'pwd-incorrect'
    
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    
    | 'name-required'
    
    | 'sex-required'
    
    | 'birth-date-required'
    | 'birth-date-incorrect-format'
    | 'birth-date-not-exists'
    | 'birth-date-younger-18'
    
    | "DUPLICATE_EMAIL"
    
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiText = {
    'email-required': SignupPageUiText.emailIsNotEntered,
    'email-incorrect': SignupPageUiText.emailFormatIsIncorrect,
    'pwd-required': SignupPageUiText.pwdIsNotEntered,
    'pwd-incorrect': SignupPageUiText.pwdFormatIsIncorrect,
    'repeated-pwd-required': SignupPageUiText.repeatPwd,
    'repeated-pwd-not-match': SignupPageUiText.passwordsDoNotMatch,
    'name-required': SignupPageUiText.firstNameIsNotEntered,
    'sex-required': SignupPageUiText.sexIsNotChosen,
    'birth-date-required': SignupPageUiText.birthDateIsNotEntered,
    'birth-date-incorrect-format': SignupPageUiText.birthDateHasIncorrectFormat,
    'birth-date-not-exists': SignupPageUiText.dateNotExists,
    'birth-date-younger-18': SignupPageUiText.youMustBeAtLeast18YearsOld,
    "DUPLICATE_EMAIL": SignupPageUiText.userWithSuchEmailAlreadyRegistered,
    'connection-error': SignupPageUiText.connectionError,
    'unknown-error': SignupPageUiText.unknownError,
  } satisfies Record<FailureCode, UiText[]>
  
  
  
  export type SexEnum = 'MALE'|'FEMALE'
  export type UserValues = {
    email: string
    pwd: string
    repeatPwd: string
    name: string
    sex: SexEnum|''
    birthDate: string // 2002-01-01 1999-12-31
    //notRobot: boolean
    //form: LoginRespE['data']['code'] | 'connection-error'|'unknown'|undefined
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
  }
  export type FormValues = UserValues & AuxiliaryValues
  
  
  
  export const userDefaultValues: UserValues = {
    email: '',
    pwd: '',
    repeatPwd: '',
    name: '',
    sex: '',
    birthDate: '',
  }
  export const auxiliaryDefaultValues: AuxiliaryValues = {
    fromServer: undefined,
  }
  export const defaultValues: FormValues = {
    ...userDefaultValues,
    ...auxiliaryDefaultValues,
  }
  
  
  
  const delay = 4000
  
  export const validators: Validators<FormValues> = [
    
    [['email'], (values)=>{
      const [v] = values as [UserValues['email']]
      const d = defaultValues.email
      if (v===d) return new PartialFailureData({
        code: 'email-required' satisfies FailureCode,
        msg: 'Email не введён',
        type: 'default',
      })
    }],
    [['email'], (values)=>{
      const [v] = values as [UserValues['email']]
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'email-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay,
      })
    }],
    
    
    
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      const d = defaultValues.pwd
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        type: 'default',
      })
    }],
    [['pwd'], (values)=>{
      const [v] = values as [UserValues['pwd']]
      if (!isValidPwd(v)) return new PartialFailureData({
        code: 'pwd-incorrect' satisfies FailureCode,
        msg: 'Пароль должен быть не короче 6 символов',
        delay,
      })
    }],
    
    
    
    [['repeatPwd'], (values)=>{
      const [v] = values as [UserValues['repeatPwd']]
      const d = defaultValues.repeatPwd
      if (v===d) return new PartialFailureData({
        code: 'repeated-pwd-required' satisfies FailureCode,
        msg: 'Повторите пароль',
        type: 'default',
      })
    }],
    [['pwd','repeatPwd'], (values)=>{
      const [pwd,repeatPwd] = values as [UserValues['pwd'],UserValues['repeatPwd']]
      if(pwd!==repeatPwd) return new PartialFailureData({
        code: 'repeated-pwd-not-match' satisfies FailureCode,
        msg: 'Пароли не совпадают',
        delay,
        errorFields: ['repeatPwd'],
      })
    }],
    
    
    
    [['name'], (values)=>{
      const [v] = values as [UserValues['name']]
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        type: 'default',
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
    
    
    
    [['sex'], (values)=>{
      const [v] = values as [UserValues['sex']]
      const d = defaultValues.sex
      if (v===d) return new PartialFailureData({
        code: 'sex-required' satisfies FailureCode,
        msg: 'Пол не выбран',
        type: 'default',
      })
    }],
    
    
    
    [['fromServer'], (values)=>{
      const [v] = values as [FromServerValue]
      if (v?.error.code==='DUPLICATE_EMAIL') return new PartialFailureData({
        code: v?.error.code satisfies FailureCode,
        msg: 'Пользователь с таким email уже зарегестрирован',
        errorFields: ['fromServer','email'],
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




