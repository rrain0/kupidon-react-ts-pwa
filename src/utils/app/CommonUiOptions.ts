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
  
  
  doLogin: [
    {
      value: 'doLogin',
      lang: 'en-US',
      text: 'Login',
    },
    {
      value: 'doLogin',
      lang: 'ru-RU',
      text: 'Войти',
    },
  ] satisfies UiOption<'doLogin'>[],
  
  
  loggingIn: [
    {
      value: 'loggingIn',
      lang: 'en-US',
      text: 'Logging In',
    },
    {
      value: 'loggingIn',
      lang: 'ru-RU',
      text: 'Вход',
    },
  ] satisfies UiOption<'loggingIn'>[],
  
  
  loginCompleted: [
    {
      value: 'loginCompleted',
      lang: 'en-US',
      text: 'Login is completed',
    },
    {
      value: 'loginCompleted',
      lang: 'ru-RU',
      text: 'Вход выполнен',
    },
  ] satisfies UiOption<'loginCompleted'>[],
  
  
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
  
  
  signingUp: [
    {
      value: 'signingUp',
      lang: 'en-US',
      text: 'Signing up',
    },
    {
      value: 'signingUp',
      lang: 'ru-RU',
      text: 'Регистрация',
    },
  ] satisfies UiOption<'signingUp'>[],
  
  
  userSuccessfullyRegistered: [
    {
      value: 'userSuccessfullyRegistered',
      lang: 'en-US',
      text: 'User successfully registered',
    },
    {
      value: 'userSuccessfullyRegistered',
      lang: 'ru-RU',
      text: 'Пользователь успешно зарегистрирован',
    },
  ] satisfies UiOption<'userSuccessfullyRegistered'>[],
  
  
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
  
  
  emailNotEntered: [
    {
      value: 'emailNotEntered',
      lang: 'en-US',
      text: 'Email is not entered',
    },
    {
      value: 'emailNotEntered',
      lang: 'ru-RU',
      text: 'Email не введён',
    },
  ] satisfies UiOption<'emailNotEntered'>[],
  
  
  emailFormatIsIncorrect: [
    {
      value: 'emailFormatIsIncorrect',
      lang: 'en-US',
      text: 'Email format is incorrect',
    },
    {
      value: 'emailFormatIsIncorrect',
      lang: 'ru-RU',
      text: 'Некорректный формат email',
    },
  ] satisfies UiOption<'emailFormatIsIncorrect'>[],
  
  
  pwdNotEntered: [
    {
      value: 'pwdNotEntered',
      lang: 'en-US',
      text: 'Password not entered',
    },
    {
      value: 'pwdNotEntered',
      lang: 'ru-RU',
      text: 'Пароль не введён',
    },
  ] satisfies UiOption<'pwdNotEntered'>[],
  
  
  noUserWithSuchLoginPwd: [
    {
      value: 'noUserWithSuchLoginPwd',
      lang: 'en-US',
      text: 'There is no user with such login-password',
    },
    {
      value: 'noUserWithSuchLoginPwd',
      lang: 'ru-RU',
      text: 'Не найдено пользователя с таким логином-паролем',
    },
  ] satisfies UiOption<'noUserWithSuchLoginPwd'>[],
  
  
  connectionError: [
    {
      value: 'connectionError',
      lang: 'en-US',
      text: 'Error connecting to the server, perhaps something with the Internet',
    },
    {
      value: 'connectionError',
      lang: 'ru-RU',
      text: 'Ошибка соединения с сервером, возможно что-то с интернетом',
    },
  ] satisfies UiOption<'connectionError'>[],
  
  
  unknownError: [
    {
      value: 'unknownError',
      lang: 'en-US',
      text: 'Unknown error',
    },
    {
      value: 'unknownError',
      lang: 'ru-RU',
      text: 'Неизвестная ошибка',
    },
  ] satisfies UiOption<'unknownError'>[],
  
  
} satisfies Record<string, UiOption<any>[]>