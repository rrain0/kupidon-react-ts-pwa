import { CommonUiText } from 'src/utils/lang/ui-values/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const PwdChangeUiText = {
  
  changePwd: CommonUiText.changePwd,
  
  
  reset: CommonUiText.reset,
  
  doChangePwd: CommonUiText.doChangePwd,
  pwdRecovery: CommonUiText.pwdRecovery,
  
  
  currentPwd: CommonUiText.currentPwd,
  currentPwdPlaceholder: CommonUiText.currentPwdPlaceholder,
  newPwd: CommonUiText.newPwd,
  newPwdPlaceholder: CommonUiText.newPwdPlaceholder,
  repeatPwd: CommonUiText.repeatPwd,
  repeatPwdPlaceholder: CommonUiText.repeatPwdPlaceholder,
  
  
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  
  
  currentPwdNotEntered: [
    {
      value: 'currentPwdNotEntered',
      lang: 'en-US',
      text: 'Current password not entered',
    },{
      value: 'currentPwdNotEntered',
      lang: 'ru-RU',
      text: 'Текущий пароль не введён',
    },
  ] satisfies UiText<'currentPwdNotEntered'>[],
  currentPwdMaxLenIs200: [
    {
      value: 'currentPwdMaxLenIs200',
      lang: 'en-US',
      text: 'Current password max length is 200 chars',
    },{
      value: 'currentPwdMaxLenIs200',
      lang: 'ru-RU',
      text: 'Максимальная длина текущего пароля - 200 символов',
    },
  ] satisfies UiText<'currentPwdMaxLenIs200'>[],
  pwdIsNotEntered: CommonUiText.pwdNotEntered,
  pwdFormatIsIncorrect: CommonUiText.pwdFormatIsIncorrect,
  pwdMaxLenIs200: CommonUiText.pwdMaxLenIs200,
  passwordsDoNotMatch: CommonUiText.passwordsDoNotMatch,
  invalidPwd: [
    {
      value: 'invalidPwd',
      lang: 'en-US',
      text: 'Wrong password',
    },{
      value: 'invalidPwd',
      lang: 'ru-RU',
      text: 'Неправильный пароль',
    },
  ] satisfies UiText<'invalidPwd'>[],
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
  
} satisfies UiTextContainer