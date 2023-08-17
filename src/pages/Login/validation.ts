import { ValidationValidators } from 'src/form-validation/ValidationValidators'
import { AuthApi } from 'src/api/requests/AuthApi'
import { ValidationCore } from 'src/form-validation/ValidationCore'
import { LoginDefaults } from './LoginPage';



export namespace LoginPageValidation {
  import Values = ValidationCore.Values
  import isValidEmail = ValidationValidators.isValidEmail
  import LoginRespE = AuthApi.LoginRespE
  import FailureData = ValidationCore.FailureData
  import Validators = ValidationCore.Validators
  import outer = ValidationCore.outer
  
  type OuterCode = LoginRespE['data']['code'] | 'connection-error' | 'unknown'
  
  
  export interface FormValues extends Values {
    login: string //email: string
    pwd: string
    //notRobot: boolean
    //form: LoginRespE['data']['code'] | 'connection-error'|'unknown'|undefined
  }
  
  
  
  /*
    Если ошибка для одного из указанных полей уже есть, то вадидатор не запускается.
    
    Если функция валидации увидела изменение значения, то все валидаторы (до первой ошибки),
    использующие это значение, перезапустятся для перепроверки.
    
    Как узнать, что поле было проврено?
    Никак, программист задаёт порядок валидаторов, располагая их так,
    что если предыдущие валидаторы для данных входных полей не выдали ошибок,
    значит поле готово для текущего валидатора.
    
    [
      [fields to use to validate],
      validator function: ([fields to use to validate])=>{}
    ]
  */
  export const validators: Validators<FormValues> = [
    [['login'], ([v])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new FailureData({
        code: 'login-required',
        msg: 'Email не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['login'], ([v])=>{
      if (!isValidEmail(v)) return new FailureData({
        code: 'login-incorrect',
        msg: 'Некорректный формат email',
        delay: 3000,
      })
    }],
    
    
    [['pwd'], ([v])=>{
      const d = LoginDefaults.values.login
      if (v===d) return new FailureData({
        code: 'pwd-required',
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [[outer,'login','pwd'],([v]: [OuterCode?,...any])=>{
      if (v==='NO_USER') return new FailureData({
        code: v,
        msg: 'Не найдено пользователя с таким логином-паролем',
      })
    }],
    
    [[outer],([v]: [OuterCode?,...any])=>{
      if (v==='connection-error') return new FailureData({
        code: v,
        extraCode: undefined,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        highlight: true,
        notify: true,
      })
    }],
    
    [[outer],([v]: [OuterCode?,...any])=>{
      return new FailureData({
        code: v,
        msg: 'Неизвестная ошибка',
      })
    }],
    
  ]
  
  
}