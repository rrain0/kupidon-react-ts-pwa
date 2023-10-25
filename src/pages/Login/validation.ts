import { LoginPageUiOptions } from 'src/pages/Login/LoginPageUiOptions'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { UiOption } from 'src/utils/lang/UiOption'
import { LoginDefaults } from './LoginPage'
import isValidEmail = ValidationValidators.isValidEmail
import LoginRespE = AuthApi.LoginRespE
import Validators = ValidationCore.Validators
import PartialFailureData = ValidationCore.PartialFailureData



export namespace LoginPageValidation {
  
  
  export type SeverErrorCode = LoginRespE['data']['code']
    | 'connection-error' | 'unknown'
  
  
  export type FailureCode = 'login-required'
    | 'login-incorrect'
    | 'pwd-required'
    | 'NO_USER'
    | 'connection-error'
    | 'unknown-error'
  
  
  
  export const mapFailureCodeToUiOption = {
    'login-required': LoginPageUiOptions.loginNotEntered,
    'login-incorrect': LoginPageUiOptions.loginFormatIsIncorrect,
    'pwd-required': LoginPageUiOptions.pwdNotEntered,
    'NO_USER': LoginPageUiOptions.noUserWithSuchLoginPwd,
    'connection-error': LoginPageUiOptions.connectionError,
    'unknown-error': LoginPageUiOptions.unknownError,
  } satisfies Record<FailureCode, UiOption<any>[]>
  
  
  
  export type UserValues = {
    login: string
    pwd: string
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
  
  
  
  
  export const validators: Validators<FormValues> = [
    [['login'], ([v]: [UserValues['login']?,...any[]])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new PartialFailureData({
        code: 'login-required' satisfies FailureCode,
        msg: 'Email не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['login'], ([v]: [UserValues['login']?,...any[]])=>{
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'login-incorrect' satisfies FailureCode,
        msg: 'Некорректный формат email',
        delay: 3000,
      })
    }],
    
    
    
    [['pwd'], ([v]: [UserValues['pwd']?,...any[]])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new PartialFailureData({
        code: 'pwd-required' satisfies FailureCode,
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    
    
    
    [['fromServer'],([v]: [FromServerValue?,...any[]])=>{
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code satisfies FailureCode,
        msg: 'Не найдено пользователя с таким логином-паролем',
        usedFields: ['fromServer','login','pwd'],
        usedValues: [v, v.values.login, v.values.pwd],
        highlightFields: ['fromServer','login','pwd'],
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



