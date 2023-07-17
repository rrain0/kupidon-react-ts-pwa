import { ValidationCore } from 'src/form-validation/ValidationCore';
import { ValidationValidators } from 'src/form-validation/ValidationValidators';
import { AuthApi } from 'src/api/requests/AuthApi';
import { defaultLoginValues } from './LoginPage';



export namespace LoginPageValidation {
  import Values = ValidationCore.Values;
  import Validators = ValidationCore.Validators;
  import emailValidator = ValidationValidators.emailValidator;
  import Failure = ValidationCore.Failure;
  import robotValidator = ValidationValidators.robotValidator;
  import pwdValidator = ValidationValidators.pwdValidator;
  import LoginRespE = AuthApi.LoginRespE;
  import FailureData = ValidationCore.FailureData;
  
  
  export interface FormValues extends Values {
    login: string //email: string
    pwd: string
    //notRobot: boolean
    form: LoginRespE['data']['code'] | 'connection-error'|'unknown'|undefined
  }
  
  export const validators: Validators<FormValues> = {
    
    login: [
      ({value:v, type:t})=>{
        const def =  defaultLoginValues.login
        if (t!=='submit' && v===def) return 'ok-stop'
        if (t==='submit' && v===def) return new FailureData({
          code: 'required',
          msg: 'Email не введён'
        })
      },
      emailValidator,
      ({values:vs})=>{
        if (vs.form==='NO_USER')
          return new FailureData({
            code: vs.form,
            msg: 'Не найдено пользователя с таким логином-паролем',
            notify: false,
          })
      }
    ],
    
    //notRobot: [robotValidator],
    
    pwd: [
      ({value:v, type:t})=>{
        const def =  defaultLoginValues.pwd
        if (t!=='submit' && v===def) return 'ok-stop'
        if (t==='submit' && v===def) return new FailureData({
          code: 'required',
          msg: 'Пароль не введён'
        })
      },
      pwdValidator,
      ({values:vs})=>{
        if (vs.form==='NO_USER') return new FailureData({
          code: vs.form,
          msg: 'Не найдено пользователя с таким логином-паролем',
          notify: false,
        })
      }
    ],
    
    form: [
      ({value:v})=>{switch(v){
        case 'NO_USER': return new FailureData({
          code: v,
          msg: 'Не найдено пользователя с таким логином-паролем',
        })
        case 'connection-error': return new FailureData({
          code: v,
          msg: 'Ошибка соединения с сервером, возможно что-то с интернетом',
        })
        case 'unknown': return new FailureData({
          code: v,
          msg: 'Неизвестная ошибка',
        })
      }}
    ]
    
  }
  
}