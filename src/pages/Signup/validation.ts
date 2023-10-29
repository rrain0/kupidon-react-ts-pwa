import { UserApi } from 'src/api/requests/UserApi'
import { SignupPageUiOptions } from 'src/pages/Signup/SignupPageUiOptions'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiOption } from 'src/utils/lang/UiOption'
import isValidEmail = ValidationValidators.isValidEmail
import Validators = ValidationCore.Validators
import isValidPwd = ValidationValidators.isValidPwd
import CreateUserRespE = UserApi.CreateUserRespE



export namespace SignupPageValidation {
  
  
  import PartialFailureData = ValidationCore.PartialFailureData
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
  
  
  
  export const mapFailureCodeToUiOption = {
    'email-required': SignupPageUiOptions.emailIsNotEntered,
    'email-incorrect': SignupPageUiOptions.emailFormatIsIncorrect,
    'pwd-required': SignupPageUiOptions.pwdIsNotEntered,
    'pwd-incorrect': SignupPageUiOptions.pwdFormatIsIncorrect,
    'repeated-pwd-required': SignupPageUiOptions.repeatPwd,
    'repeated-pwd-not-match': SignupPageUiOptions.passwordsDoNotMatch,
    'name-required': SignupPageUiOptions.firstNameIsNotEntered,
    'sex-required': SignupPageUiOptions.sexIsNotChosen,
    'birthDate-required': SignupPageUiOptions.birthDateIsNotEntered,
    "DUPLICATE_EMAIL": SignupPageUiOptions.userWithSuchEmailAlreadyRegistered,
    'connection-error': SignupPageUiOptions.connectionError,
    'unknown-error': SignupPageUiOptions.unknownError,
  } satisfies Record<FailureCode, UiOption<any>[]>
  
  
  
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
  
  
  
  export const validators: Validators<FormValues> = [
    
    [['email'], ([v]: [UserValues['email']?,...any[]])=>{
      const d = defaultValues.email
      if (v===d) return new PartialFailureData({
        code: 'email-required' satisfies FailureCode,
        msg: 'Email не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['email'], ([v]: [UserValues['email']?,...any[]])=>{
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'email-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay: 3000,
      })
    }],
    
    
    
    [['pwd'], ([v]: [UserValues['pwd']?,...any[]])=>{
      const d = defaultValues.pwd
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['pwd'], ([v]: [UserValues['pwd']?,...any[]])=>{
      if (!isValidPwd(v)) return new PartialFailureData({
        code: 'pwd-incorrect' satisfies FailureCode,
        msg: 'Пароль должен быть не короче 6 символов',
        delay: 3000,
      })
    }],
    
    
    
    [['repeatPwd'], ([v]: [UserValues['repeatPwd']?,...any[]])=>{
      const d = defaultValues.repeatPwd
      if (v===d) return new PartialFailureData({
        code: 'repeated-pwd-required' satisfies FailureCode,
        msg: 'Повторите пароль',
        highlight: false,
        notify: false,
      })
    }],
    [['pwd','repeatPwd'], ([pwd,repeatPwd]: [UserValues['pwd']?,UserValues['repeatPwd']?,...any[]])=>{
      if(pwd!==repeatPwd) return new PartialFailureData({
        code: 'repeated-pwd-not-match' satisfies FailureCode,
        msg: 'Пароли не совпадают',
        delay: 3000,
        highlightFields: ['repeatPwd'],
      })
    }],
    
    
    
    [['name'], ([v]: [UserValues['name']?,...any[]])=>{
      const d = defaultValues.name
      if (v===d) return new PartialFailureData({
        code: 'name-required' satisfies FailureCode,
        msg: 'Имя не введено',
        highlight: false,
        notify: false,
      })
    }],
    
    
    
    [['birthDate'], ([v]: [UserValues['birthDate']?,...any[]])=>{
      const d = defaultValues.sex
      if (v===d) return new PartialFailureData({
        code: 'birthDate-required' satisfies FailureCode,
        msg: 'Дата рождения не введена',
        highlight: false,
        notify: false,
      })
    }],
    
    
    
    [['sex'], ([v]: [UserValues['sex']?,...any[]])=>{
      const d = defaultValues.sex
      if (v===d) return new PartialFailureData({
        code: 'sex-required' satisfies FailureCode,
        msg: 'Пол не выбран',
        highlight: false,
        notify: false,
      })
    }],
    
    
    
    [['fromServer'],([v]: [FromServerValue?,...any[]])=>{
      if (v?.error.code==='DUPLICATE_EMAIL') return new PartialFailureData({
        code: v?.error.code satisfies FailureCode,
        msg: 'Пользователь с таким email уже зарегестрирован',
        usedFields: ['fromServer','email'],
        usedValues: [v, v.values.email],
        highlightFields: ['fromServer','email'],
        canSubmit: true,
      })
    }],
    
    
    
    [['fromServer'],([v]: [FromServerValue?,...any[]])=>{
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        canSubmit: true,
      })
    }],
    [['fromServer'],([v]: [FromServerValue?,...any[]])=>{
      if (v) return new PartialFailureData({
        code: 'unknown-error' satisfies FailureCode,
        msg: 'Неизвестная ошибка',
        canSubmit: true,
        extra: v,
      })
    }],
    
  ]
  
}




