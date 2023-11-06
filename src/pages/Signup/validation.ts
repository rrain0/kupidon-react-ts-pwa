import { UserApi } from 'src/api/requests/UserApi'
import { SignupPageUiText } from 'src/pages/Signup/uiText'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiText } from 'src/utils/lang/UiText'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import CreateUserRespE = UserApi.CreateUserRespE
import PartialFailureData = ValidationCore.PartialFailureData



export namespace SignupPageValidation {
  
  
  export type SeverErrorCode = CreateUserRespE['data']['code']
    | 'connection-error' | 'unknown'
  
  
  export type FailureCode = 'email-required'
    | 'email-incorrect'
    | 'pwd-required'
    | 'pwd-incorrect'
    | 'repeated-pwd-required'
    | 'repeated-pwd-not-match'
    | 'name-required'
    | 'sex-required'
    | 'birthDate-required'
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
    'birthDate-required': SignupPageUiText.birthDateIsNotEntered,
    "DUPLICATE_EMAIL": SignupPageUiText.userWithSuchEmailAlreadyRegistered,
    'connection-error': SignupPageUiText.connectionError,
    'unknown-error': SignupPageUiText.unknownError,
  } satisfies Record<FailureCode, UiText[]>
  
  
  
  export type UserValues = {
    email: string
    pwd: string
    repeatPwd: string
    name: string
    sex: 'MALE'|'FEMALE'|''
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
  export type FormValues = UserValues & {
    fromServer?: undefined | FromServerValue
  }
  
  
  
  export const defaultValues: FormValues = {
    email: '',
    pwd: '',
    repeatPwd: '',
    name: '',
    sex: '',
    birthDate: '',
    fromServer: undefined,
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
      const [v] = values as [UserValues['birthDate']]
      const d = defaultValues.sex
      if (v===d) return new PartialFailureData({
        code: 'birthDate-required' satisfies FailureCode,
        msg: 'Дата рождения не введена',
        type: 'default',
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
        usedFields: ['fromServer','email'],
        usedValues: [v, v.values.email],
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




