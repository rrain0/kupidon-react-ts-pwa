import { ValidationCore } from './ValidationCore'
import { Utils } from 'src/utils/Utils'



export namespace ValidationValidators {
  import empty = Utils.empty
  import FailureData = ValidationCore.FailureData
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  export const isValidEmail = (value: string|empty) => value && emailPattern.test(value)
  
  
  /*export const robotValidator = ({value}: {value: boolean|empty}): FailureData|undefined => {
    if (!value) return new FailureData({ code: 'required', msg: 'Подтвердите, что вы не робот' })
  }
  export const requiredValidator = ({value}: {value: string|empty}): FailureData|undefined => {
    if (!value || !value.length) return new FailureData({ code: 'required', msg: 'Поле обязательно для заполнения' })
  }*/
  
  
  
  
  const isPositiveInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>0
  }
  const isNonNegativeInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>=0
  }
  
  export const required = (value: string, message: string) =>
    value.length<=0 ? new FailureData({ code: 'required', msg: message }) : undefined
  
  /*export const repeatPwdValidator = (pwd: string|undefined, repeatedPwd: string|undefined): FailureData|undefined|'later' => {
    if (!pwd && !repeatedPwd) return 'later'
    if (pwd!==repeatedPwd)
      return new FailureData({ code: 'incorrect', msg: 'Пароли должны совпадать' })
  }*/
  
  export const checkPositiveInteger = (value: string, message: string) => {
    const v = +value
    return !(Number.isSafeInteger(+v) && v>0) ? new FailureData({ code: 'incorrect',  msg: message }) : undefined
  }

}
