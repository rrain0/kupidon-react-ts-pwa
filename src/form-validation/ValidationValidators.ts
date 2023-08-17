import { Utils } from 'src/utils/Utils'



export namespace ValidationValidators {
  import empty = Utils.empty
  
  
  const emailPattern = /^[^\s@]+@[^\s@]+$/
  export const isValidEmail = (email: string|empty) => email && emailPattern.test(email)
  
  
  export const isValidPwd = (pwd: string|empty) => pwd && pwd.length>=6
  
  
  const isPositiveInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>0
  }
  const isNonNegativeInteger = (i: number) => {
    return Number.isSafeInteger(i) && i>=0
  }
  

}
