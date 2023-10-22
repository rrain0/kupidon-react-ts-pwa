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
        code: v,
        msg: 'Не найдено пользователя с таким логином-паролем',
        errorFields: ['login','pwd'],
        canSubmit: true,
      })
    }],
    
    [['fromServer'],([v])=>{
      if (v?.error.code==='connection-error') return new PartialFailureData({
        code: v,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        errorFields: [],
        canSubmit: true,
      })
    }],
    
    [['fromServer'],([v])=>{
      if (v) return new PartialFailureData({
        code: v,
        msg: 'Неизвестная ошибка',
        errorFields: [],
        canSubmit: true,
      })
    }],
    
  ]
  
  
}