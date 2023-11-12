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