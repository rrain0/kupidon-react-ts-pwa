import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/lang/UiOption'



export const AccountSettingsUiOptions = {
  
  account: CommonUiOptions.account,
  
  id: [
    {
      value: 'id',
      lang: 'en-US',
      text: 'id',
    },
  ] satisfies UiOption<'id'>[],
  
  
  email: [
    {
      value: 'email',
      lang: 'en-US',
      text: 'Email',
    },
  ] satisfies UiOption<'email'>[],
  
  
  emailVerified: [
    {
      value: 'emailVerified',
      lang: 'en-US',
      text: 'Email verified',
    },
    {
      value: 'emailVerified',
      lang: 'ru-RU',
      text: 'Email верифицирован',
    },
  ] satisfies UiOption<'emailVerified'>[],
  
  
  yes: CommonUiOptions.yes,
  no: CommonUiOptions.no,
  
  
  userCreated: [
    {
      value: 'userCreated',
      lang: 'en-US',
      text: 'User created',
    },
    {
      value: 'userCreated',
      lang: 'ru-RU',
      text: 'Пользователь создан',
    },
  ] satisfies UiOption<'userCreated'>[],
  
  
  userUpdated: [
    {
      value: 'userUpdated',
      lang: 'en-US',
      text: 'User updated',
    },
    {
      value: 'userUpdated',
      lang: 'ru-RU',
      text: 'Пользователь обновлён',
    },
  ] satisfies UiOption<'userUpdated'>[],
  
  
  signOut: CommonUiOptions.signOut,
  
  
  deleteAccount: [
    {
      value: 'deleteAccount',
      lang: 'en-US',
      text: 'Delete Account',
    },
    {
      value: 'deleteAccount',
      lang: 'ru-RU',
      text: 'Удалить Аккаунт',
    },
  ] satisfies UiOption<'deleteAccount'>[],
  
  
} satisfies Record<string, UiOption<any>[]>