import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption, UiOptionsContainer } from 'src/utils/lang/UiOption'




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
  ] satisfies UiOption<'registration'>[],
  
  
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
  ] satisfies UiOption<'emailPlaceholder'>[],
  
  
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
  ] satisfies UiOption<'repeatPwdPlaceholder'>[],
  
  
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
  ] satisfies UiOption<'namePlaceholder'>[],
  
  
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
  ] satisfies UiOption<'lastNamePlaceholder'>[],
  
  
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
  ] satisfies UiOption<'birthDatePlaceholder'>[],
  
  
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
  ] satisfies UiOption<'iAmGuy'>[],
  
  
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
  ] satisfies UiOption<'iAmGirl'>[],
  
  
  signup: CommonUiOptions.signup,
  
  
  signingUp: CommonUiOptions.signingUp,
  
  
  userSuccessfullyRegistered: CommonUiOptions.userSuccessfullyRegistered,
  
  
} satisfies UiOptionsContainer