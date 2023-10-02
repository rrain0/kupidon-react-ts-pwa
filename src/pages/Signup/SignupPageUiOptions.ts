import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/lang/UiOption'




export const SignupPageUiOptions = {
  
  registration: [
    {
      value: 'registration',
      lang: 'en-US',
      text: 'Registration',
    },
    {
      value: 'registration',
      lang: 'ru-RU',
      text: 'Регистрация',
    },
  ] as UiOption<'registration'>[],
  
  
  emailLoginPlaceholder: [
    {
      value: 'emailPlaceholder',
      lang: 'en-US',
      text: 'email (login)',
    },
    {
      value: 'emailPlaceholder',
      lang: 'ru-RU',
      text: 'email (логин)',
    },
  ] as UiOption<'emailPlaceholder'>[],
  
  
  pwdPlaceholder: CommonUiOptions.pwdPlaceholder,
  
  
  repeatPwdPlaceholder: [
    {
      value: 'repeatPwdPlaceholder',
      lang: 'en-US',
      text: 'repeat password',
    },
    {
      value: 'repeatPwdPlaceholder',
      lang: 'ru-RU',
      text: 'повторите пароль',
    },
  ] as UiOption<'repeatPwdPlaceholder'>[],
  
  
  namePlaceholder: [
    {
      value: 'namePlaceholder',
      lang: 'en-US',
      text: 'name',
    },
    {
      value: 'namePlaceholder',
      lang: 'ru-RU',
      text: 'имя',
    },
  ] as UiOption<'namePlaceholder'>[],
  
  
  lastNamePlaceholder: [
    {
      value: 'lastNamePlaceholder',
      lang: 'en-US',
      text: 'last name',
    },
    {
      value: 'lastNamePlaceholder',
      lang: 'ru-RU',
      text: 'фамилия',
    },
  ] as UiOption<'lastNamePlaceholder'>[],
  
  
  birthDatePlaceholder: [
    {
      value: 'birthDatePlaceholder',
      lang: 'en-US',
      text: 'birth date (yyyy-MM-dd) (2002-01-01)',
    },
    {
      value: 'birthDatePlaceholder',
      lang: 'ru-RU',
      text: 'день рождения (гггг-ММ-дд) (2002-01-01)',
    },
  ] as UiOption<'birthDatePlaceholder'>[],
  
  
  iAmGuy: [
    {
      value: 'iAmGuy',
      lang: 'en-US',
      text: 'I am guy',
    },
    {
      value: 'iAmGuy',
      lang: 'ru-RU',
      text: 'Я парень',
    },
  ] as UiOption<'iAmGuy'>[],
  
  
  iAmGirl: [
    {
      value: 'iAmGirl',
      lang: 'en-US',
      text: 'I am girl',
    },
    {
      value: 'iAmGirl',
      lang: 'ru-RU',
      text: 'Я девушка',
    },
  ] as UiOption<'iAmGirl'>[],
  
  
  signup: CommonUiOptions.signup,
  
  
  
  
} satisfies Record<string, UiOption<any>[]>