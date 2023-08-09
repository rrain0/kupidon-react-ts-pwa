import { ValidationValidators } from 'src/form-validation-1/ValidationValidators'
import { AuthApi } from 'src/api/requests/AuthApi'
import { defaultLoginValues } from './LoginPage'
import { ValidationCore } from 'src/form-validation-1/ValidationCore'



export namespace LoginPageValidation {
  import Values = ValidationCore.Values
  import isValidEmail = ValidationValidators.isValidEmail
  import LoginRespE = AuthApi.LoginRespE
  import FailureData = ValidationCore.FailureData
  import Validators = ValidationCore.Validators
  import Failure = ValidationCore.Failure
  import outer = ValidationCore.outer;
  
  
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
      const d = defaultLoginValues.login
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
      const d = defaultLoginValues.login
      if (v===d) return new FailureData({
        code: 'pwd-required',
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    
    //[['pwd','repeatPwd'], ([pwd,repeatPwd])=>{}],
    
    [[outer,'login','pwd'],([v])=>{
      if (v==='NO_USER') return new FailureData({
        code: v,
        msg: 'Не найдено пользователя с таким логином-паролем',
      })
    }],
    [[outer],([v])=>{
      if (v==='connection-error') return new FailureData({
        code: v,
        extraCode: undefined,
        msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        highlight: true,
        notify: true,
      })
    }],
    [[outer],([v])=>{
      if (v==='unknown') return new FailureData({
        code: v,
        msg: 'Неизвестная ошибка',
      })
    }],
  ]
  
  
}