import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const AccountSettingsUiText = {
  
  account: CommonUiText.account,
  
  id: [
    {
      value: 'id',
      lang: 'en-US',
      text: 'id',
    },
  ] satisfies UiText<'id'>[],
  
  
  email: [
    {
      value: 'email',
      lang: 'en-US',
      text: 'Email',
    },
  ] satisfies UiText<'email'>[],
  
  
  emailVerified: [
    {
      value: 'emailVerified',
      lang: 'en-US',
      text: 'Email verified',
    },{
      value: 'emailVerified',
      lang: 'ru-RU',
      text: 'Email верифицирован',
    },
  ] satisfies UiText<'emailVerified'>[],
  
  
  yes: CommonUiText.yes,
  no: CommonUiText.no,
  reset: CommonUiText.reset,
  
  
  newPwd: CommonUiText.newPwd,
  newPwdPlaceholder: CommonUiText.newPwdPlaceholder,
  repeatPwd: CommonUiText.repeatPwd,
  repeatPwdPlaceholder: CommonUiText.repeatPwdPlaceholder,
  
  
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  userCreated: [
    {
      value: 'userCreated',
      lang: 'en-US',
      text: 'User created',
    },{
      value: 'userCreated',
      lang: 'ru-RU',
      text: 'Пользователь создан',
    },
  ] satisfies UiText<'userCreated'>[],
  
  
  userUpdated: [
    {
      value: 'userUpdated',
      lang: 'en-US',
      text: 'User updated',
    },{
      value: 'userUpdated',
      lang: 'ru-RU',
      text: 'Пользователь обновлён',
    },
  ] satisfies UiText<'userUpdated'>[],
  
  
  pwdIsNotEntered: CommonUiText.pwdNotEntered,
  pwdFormatIsIncorrect: CommonUiText.pwdFormatIsIncorrect,
  pwdMaxLenIs200: CommonUiText.pwdMaxLenIs200,
  passwordsDoNotMatch: CommonUiText.passwordsDoNotMatch,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
  signOut: CommonUiText.signOut,
  
  
  deleteAccount: [
    {
      value: 'deleteAccount',
      lang: 'en-US',
      text: 'Delete Account',
    },{
      value: 'deleteAccount',
      lang: 'ru-RU',
      text: 'Удалить Аккаунт',
    },
  ] satisfies UiText<'deleteAccount'>[],
  
  
} satisfies UiTextContainer