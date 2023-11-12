import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'




export const SignupPageUiText = {
  
  
  emailLoginPlaceholder: CommonUiText.emailLoginPlaceholder,
  pwdPlaceholder: CommonUiText.pwdPlaceholder,
  repeatPwdPlaceholder: CommonUiText.repeatPwdPlaceholder,
  namePlaceholder: CommonUiText.namePlaceholder,
  birthDatePlaceholder: CommonUiText.birthDatePlaceholder,
  
  
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
  genderIsNotChosen: CommonUiText.genderIsNotChosen,
  birthDateIsNotEntered: CommonUiText.birthDateIsNotEntered,
  birthDateHasIncorrectFormat: CommonUiText.birthDateHasIncorrectFormat,
  dateNotExists: CommonUiText.dateNotExists,
  youMustBeAtLeast18YearsOld: CommonUiText.youMustBeAtLeast18YearsOld,
  userWithSuchEmailAlreadyRegistered: CommonUiText.userWithSuchEmailAlreadyRegistered,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
} satisfies UiTextContainer