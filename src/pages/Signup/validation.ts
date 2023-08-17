import { ValidationValidators } from 'src/form-validation/ValidationValidators'
import { ValidationCore } from 'src/form-validation/ValidationCore'
import { SignupDefaults } from './SignupPage';



export namespace SignupPageValidation {
  import Values = ValidationCore.Values
  import isValidEmail = ValidationValidators.isValidEmail
  import FailureData = ValidationCore.FailureData
  import Validators = ValidationCore.Validators
  import outer = ValidationCore.outer
  import isValidPwd = ValidationValidators.isValidPwd
  
  
  export interface FormValues extends Values {
    email: string
    pwd: string
    repeatPwd: string
    firstName: string
    lastName: string
    sex: 'MALE'|'FEMALE'|''
    birthDate: string // 2002-01-01 1999-12-31
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
    
    [['email'], ([v])=>{
      const d = SignupDefaults.values.email
      if (v===d) return new FailureData({
        code: 'email-required',
        msg: 'Email не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['email'], ([v])=>{
      if (!isValidEmail(v)) return new FailureData({
        code: 'email-incorrect',
        msg: 'Некорректный формат email',
        delay: 3000,
      })
    }],
    
    
    [['pwd'], ([v])=>{
      const d = SignupDefaults.values.pwd
      if (v===d) return new FailureData({
        code: 'pwd-required',
        msg: 'Пароль не введён',
        highlight: false,
        notify: false,
      })
    }],
    [['pwd'], ([v])=>{
      if (!isValidPwd(v)) return new FailureData({
        code: 'pwd-incorrect',
        msg: 'Пароль должен быть не короче 6 символов',
        delay: 3000,
      })
    }],
    
    
    [['pwd','repeatPwd'], ([pwd,repeatPwd])=>{
      if(pwd!==repeatPwd) return new FailureData({
        code: 'repeat-pwd-not-match',
        msg: 'Пароли не совпадают',
        delay: 3000,
        fields: ['repeatPwd'],
      })
    }],
    
    
    [['firstName'], ([v])=>{
      const d = SignupDefaults.values.firstName
      if (v===d) return new FailureData({
        code: 'firstName-required',
        msg: 'Имя не введено',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [['lastName'], ([v])=>{
      const d = SignupDefaults.values.lastName
      if (v===d) return new FailureData({
        code: 'lastName-required',
        msg: 'Фамилия не введена',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [['sex'], ([v])=>{
      const d = SignupDefaults.values.sex
      if (v===d) return new FailureData({
        code: 'sex-required',
        msg: 'Пол не выбран',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [['birthDate'], ([v])=>{
      const d = SignupDefaults.values.sex
      if (v===d) return new FailureData({
        code: 'birthDate-required',
        msg: 'Дата рождения не введена',
        highlight: false,
        notify: false,
      })
    }],
    
    
    [[outer,'email'],([v])=>{
    // todo types of values & codes
      if (v==='DUPLICATE_EMAIL') return new FailureData({
        code: v,
        msg: 'Пользователь с таким email уже зарегестрирован',
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
      return new FailureData({
        code: v,
        msg: 'Неизвестная ошибка',
      })
    }],
    
  ]
  
}