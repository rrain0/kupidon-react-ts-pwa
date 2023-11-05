import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'




export const SignupPageUiText = {
  
  
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
  ] satisfies UiText<'emailPlaceholder'>[],
  
  
  pwdPlaceholder: CommonUiText.pwdPlaceholder,
  
  
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
  ] satisfies UiText<'repeatPwdPlaceholder'>[],
  
  
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
  ] satisfies UiText<'namePlaceholder'>[],
  
  
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
  ] satisfies UiText<'lastNamePlaceholder'>[],
  
  
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
  ] satisfies UiText<'birthDatePlaceholder'>[],
  
  
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
  ] satisfies UiText<'iAmGuy'>[],
  
  
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
  ] satisfies UiText<'iAmGirl'>[],
  
  
  signup: CommonUiText.signup,
  
  
  registration: CommonUiText.registration,
  registrationCompleted: CommonUiText.registrationCompleted,
  
  
  userSuccessfullyRegistered: CommonUiText.userSuccessfullyRegistered,
  
  
  emailIsNotEntered: CommonUiText.emailNotEntered,
  emailFormatIsIncorrect: CommonUiText.emailFormatIsIncorrect,
  pwdIsNotEntered: CommonUiText.pwdNotEntered,
  pwdFormatIsIncorrect: CommonUiText.pwdFormatIsIncorrect,
  repeatPwd: CommonUiText.repeatPwd,
  passwordsDoNotMatch: CommonUiText.passwordsDoNotMatch,
  firstNameIsNotEntered: CommonUiText.firstNameIsNotEntered,
  lastNameIsNotEntered: CommonUiText.lastNameIsNotEntered,
  sexIsNotChosen: CommonUiText.sexIsNotChosen,
  birthDateIsNotEntered: CommonUiText.birthDateIsNotEntered,
  userWithSuchEmailAlreadyRegistered: CommonUiText.userWithSuchEmailAlreadyRegistered,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
} satisfies UiTextContainer