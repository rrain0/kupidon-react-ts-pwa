import { ValidationCore } from './ValidationCore';
import { Utils } from 'src/utils/Utils';



export namespace ValidationValidators {
  import empty = Utils.empty
  import Failure = ValidationCore.Failure
  import Validator = ValidationCore.Validator
  import FailureData = ValidationCore.FailureData
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  const isValidEmail = ({value}: {value: string|empty}) => value && emailPattern.test(value)
  export const emailValidator: Validator<string|empty> = ({value}) => {
    if (!isValidEmail({value}))
      return new FailureData({ code: 'incorrect', msg: 'Некорректный формат email' })
  }
  
  
  export const robotValidator = ({value}: {value: boolean|empty}): Failure|undefined => {
    if (!value) return Failure.of('required','Подтвердите, что вы не робот')
  }
  export const requiredValidator = ({value}: {value: string|empty}): Failure|undefined => {
    if (!value || !value.length) return Failure.of('required','Поле обязательно для заполнения')
  }
  export const pwdValidator: Validator<string|empty> = ({value}) => {
    if (!value || value.length<3)
      return new FailureData({ code: 'incorrect', msg: 'Минимальная длина пароля - 3 символов' })
  }
  
  
  
  
  const isPositiveInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>0
  }
  const isNonNegativeInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>=0
  }
  
  export const required = (value: string, message: string) =>
    value.length<=0 ? Failure.of('required', message) : undefined
  
  export const repeatPwdValidator = (pwd: string|undefined, repeatedPwd: string|undefined): Failure|undefined|'later' => {
    if (!pwd && !repeatedPwd) return 'later'
    if (pwd!==repeatedPwd)
      return Failure.of('incorrect','Пароли должны совпадать')
  }
  
  export const checkPositiveInteger = (value: string, message: string) => {
    const v = +value
    return !(Number.isSafeInteger(+v) && v>0) ? Failure.of('incorrect', message) : undefined
  }

}