import { LoginPageUiOptions } from 'src/pages/Login/LoginPageUiOptions'
import { ValidationValidators } from 'src/utils/form-validation/ValidationValidators'
import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/utils/form-validation/ValidationCore'
import { LoginDefaults } from './LoginPage'
import isValidEmail = ValidationValidators.isValidEmail
import LoginRespE = AuthApi.LoginRespE
import Validators = ValidationCore.Validators



export namespace LoginPageValidation {
  
  // todo
  import PartialFailureData = ValidationCore.PartialFailureData
  type OuterCode = LoginRespE['data']['code'] | 'connection-error' | 'unknown'
  
  
  export type UserValues = {
    login: string
    pwd: string
  }
  export type FromServerValue = {
    values: UserValues // значения, отправленные на сервердля проверки
    error: { // ошибка с сервера
      code: string
      msg?: string|undefined
    }
  }
  export type FormValues = UserValues & {
    fromServer?: undefined | FromServerValue
  }
  
  
  
  
  export const validators: Validators<FormValues> = [
    [['login'], ([v])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new PartialFailureData({
        code: 'login-required',
        msg: 'Email не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['login'], ([v])=>{
      if (!isValidEmail(v)) return new PartialFailureData({
        code: 'login-incorrect',
        msg: 'Некорректный формат email',
        delay: 3000,
      })
    }],
    
    
    [['pwd'], ([v])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new PartialFailureData({
        code: 'pwd-required',
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [['fromServer'],([v])=>{
      if (v?.error.code==='NO_USER') return new PartialFailureData({
        code: v.error.code,
        msg: 'Не найдено пользователя с таким логином-паролем',
        errorFields: ['fromServer','login','pwd'],
        canSubmit: true,
      })
    }],
    [['fromServer'],([v])=>{
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v.error.code,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        errorFields: ['fromServer'],
        canSubmit: true,
      })
    }],
    
    
    [['fromServer'],([v])=>{
      if (v) return new PartialFailureData({
        code: 'unknown-error',
        msg: 'Неизвестная ошибка',
        errorFields: ['fromServer'],
        canSubmit: true,
        extra: v,
      })
    }],
    
  ]
  
  
}




export const mapFailureCodeToUiOption = {
  'login-required': LoginPageUiOptions.emailNotEntered,
  'login-incorrect': LoginPageUiOptions.emailFormatIsIncorrect,
  'pwd-required': LoginPageUiOptions.pwdNotEntered,
  'NO_USER': LoginPageUiOptions.noUserWithSuchLoginPwd,
  'connection-error': LoginPageUiOptions.connectionError,
  'unknown-error': LoginPageUiOptions.unknownError,
}
