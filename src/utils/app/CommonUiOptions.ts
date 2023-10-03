import { Lang } from 'src/recoil/state/LangRecoil'
import { UiOption } from 'src/utils/lang/UiOption'




export const CommonUiOptions = {
  
  
  loginEmailPlaceholder: [
    {
      value: 'loginPlaceholder',
      lang: 'en-US',
      text: 'login (email)',
    },
    {
      value: 'loginPlaceholder',
      lang: 'ru-RU',
      text: 'логин (email)',
    },
  ] satisfies UiOption<'loginPlaceholder'>[],
  
  
  pwdPlaceholder: [
    {
      value: 'pwdPlaceholder',
      lang: 'en-US',
      text: 'password',
    },
    {
      value: 'pwdPlaceholder',
      lang: 'ru-RU',
      text: 'пароль',
    },
  ] satisfies UiOption<'pwdPlaceholder'>[],
  
  
  login: [
    {
      value: 'login',
      lang: 'en-US',
      text: 'Login',
    },
    {
      value: 'login',
      lang: 'ru-RU',
      text: 'Вход',
    },
  ] satisfies UiOption<'login'>[],
  
  
  signIn: [
    {
      value: 'signIn',
      lang: 'en-US',
      text: 'Sign In',
    },
    {
      value: 'signIn',
      lang: 'ru-RU',
      text: 'Войти',
    },
  ] satisfies UiOption<'signIn'>[],
  
  
  signup: [
    {
      value: 'signup',
      lang: 'en-US',
      text: 'Sign up',
    },
    {
      value: 'signup',
      lang: 'ru-RU',
      text: 'Зарегистрироваться',
    },
  ] satisfies UiOption<'signup'>[],
  
  
  signOut: [
    {
      value: 'signOut',
      lang: 'en-US',
      text: 'Sign Out',
    },
    {
      value: 'signOut',
      lang: 'ru-RU',
      text: 'Выйти',
    },
  ] satisfies UiOption<'signOut'>[],
  
  
  profile: [
    {
      value: 'profile',
      lang: 'en-US',
      text: 'Profile',
    },
    {
      value: 'profile',
      lang: 'ru-RU',
      text: 'Профиль',
    },
  ] satisfies UiOption<'profile'>[],
  
  
  chat: [
    {
      value: 'chat',
      lang: 'en-US',
      text: 'Chat',
    },
    {
      value: 'chat',
      lang: 'ru-RU',
      text: 'Чат',
    },
  ] satisfies UiOption<'chat'>[],
  
  
  settings: [
    {
      value: 'settings',
      lang: 'en-US',
      text: 'Settings',
    },
    {
      value: 'settings',
      lang: 'ru-RU',
      text: 'Настройки',
    },
  ] satisfies UiOption<'settings'>[],
  
  
  theme: [
    {
      value: 'theme',
      lang: 'en-US',
      text: 'Theme',
    },
    {
      value: 'theme',
      lang: 'ru-RU',
      text: 'Тема',
    },
  ] satisfies UiOption<'theme'>[],
  
  
  language: [
    {
      value: 'language',
      lang: 'en-US',
      text: 'Language',
    },
    {
      value: 'language',
      lang: 'ru-RU',
      text: 'Язык',
    },
  ] satisfies UiOption<'language'>[],
  
  
  languageOptions: [
    {
      value: 'system',
      lang: 'en-US',
      text: 'System language',
    },
    {
      value: 'system',
      lang: 'ru-RU',
      text: 'Язык системы',
    },
    
    {
      value: 'ru-RU',
      lang: 'ru-RU',
      text: 'Русский',
    },
    {
      value: 'en-US',
      lang: 'en-US',
      text: 'English',
    },
  ] satisfies UiOption<Lang|'system'>[],
  
  
  reloading: [
    {
      value: 'reloading',
      lang: 'en-US',
      text: 'Reloading',
    },
    {
      value: 'reloading',
      lang: 'ru-RU',
      text: 'Перезагрузка',
    },
  ] satisfies UiOption<'reloading'>[],
  
  
  yes: [
    {
      value: 'yes',
      lang: 'en-US',
      text: 'Yes',
    },
    {
      value: 'yes',
      lang: 'ru-RU',
      text: 'Да',
    },
  ] satisfies UiOption<'yes'>[],
  
  
  no: [
    {
      value: 'no',
      lang: 'en-US',
      text: 'No',
    },
    {
      value: 'no',
      lang: 'ru-RU',
      text: 'Нет',
    },
  ] satisfies UiOption<'no'>[],
  
  
} satisfies Record<string, UiOption<any>[]>