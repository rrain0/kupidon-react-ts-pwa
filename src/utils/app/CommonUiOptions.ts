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
  ] as UiOption<'loginPlaceholder'>[],
  
  
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
  ] as UiOption<'pwdPlaceholder'>[],
  
  
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
  ] as UiOption<'login'>[],
  
  
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
  ] as UiOption<'signIn'>[],
  
  
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
  ] as UiOption<'signup'>[],
  
  
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
  ] as UiOption<'signOut'>[],
  
  
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
  ] as UiOption<'profile'>[],
  
  
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
  ] as UiOption<'chat'>[],
  
  
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
  ] as UiOption<'settings'>[],
  
  
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
  ] as UiOption<'theme'>[],
  
  
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
  ] as UiOption<'language'>[],
  
  
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
  ] as UiOption<Lang|'system'>[],
  
  
} satisfies Record<string, UiOption<any>[]>