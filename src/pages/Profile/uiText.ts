import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const ProfileUiText = {
  
  
  profile: CommonUiText.profile,
  
  reset: CommonUiText.reset,
  
  name: CommonUiText.name,
  namePlaceholder: CommonUiText.namePlaceholder,
  birthDate: CommonUiText.birthDate,
  birthDatePlaceholder: CommonUiText.birthDatePlaceholder,
  
  
  sex: [
    {
      value: 'sex',
      lang: 'en-US',
      text: 'Sex',
    },
    {
      value: 'sex',
      lang: 'ru-RU',
      text: 'Пол',
    },
  ] satisfies UiText<'sex'>[],
  
  
  male: [
    {
      value: 'male',
      lang: 'en-US',
      text: 'Male',
    },
    {
      value: 'male',
      lang: 'ru-RU',
      text: 'Мужской',
    },
  ] satisfies UiText<'male'>[],
  
  
  female: [
    {
      value: 'female',
      lang: 'en-US',
      text: 'Female',
    },
    {
      value: 'female',
      lang: 'ru-RU',
      text: 'Женский',
    },
  ] satisfies UiText<'female'>[],
  
  
  aboutMe: [
    {
      value: 'aboutMe',
      lang: 'en-US',
      text: 'About me',
    },
    {
      value: 'aboutMe',
      lang: 'ru-RU',
      text: 'Обо мне',
    },
  ] satisfies UiText<'aboutMe'>[],
  
  
  imLookingFor: [
    {
      value: 'imLookingFor',
      lang: 'en-US',
      text: "I'm looking for",
    },
    {
      value: 'imLookingFor',
      lang: 'ru-RU',
      text: 'Я ищу',
    },
  ] satisfies UiText<'imLookingFor'>[],
  
  
  notSelected: CommonUiText.notSelected,
  ofGuys: CommonUiText.ofGuys,
  ofGirls: CommonUiText.ofGirls,
  ofGuysAndGirls: CommonUiText.ofGuysAndGirls,
  
  
  signOut: CommonUiText.signOut,
  update: CommonUiText.update,
  updated: CommonUiText.updated,
  
  
  
  firstNameIsNotEntered: CommonUiText.firstNameIsNotEntered,
  noUserWithSuchId: CommonUiText.noUserWithSuchId,
  birthDateIsNotEntered: CommonUiText.birthDateIsNotEntered,
  birthDateHasIncorrectFormat: CommonUiText.birthDateHasIncorrectFormat,
  dateNotExists: CommonUiText.dateNotExists,
  youMustBeAtLeast18YearsOld: CommonUiText.youMustBeAtLeast18YearsOld,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
} satisfies UiTextContainer