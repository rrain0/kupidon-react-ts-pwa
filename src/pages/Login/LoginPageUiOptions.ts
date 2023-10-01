import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/react/lang/UiOption'




export const LoginPageUiOptions = {
  
  
  loginEmailPlaceholder: CommonUiOptions.loginEmailPlaceholder,
  
  
  pwdPlaceholder: CommonUiOptions.pwdPlaceholder,
  
  
  login: CommonUiOptions.login,
  
  
  signIn: CommonUiOptions.signIn,
  
  
  signup: CommonUiOptions.signup,
  
  
} satisfies Record<string, UiOption<any>[]>