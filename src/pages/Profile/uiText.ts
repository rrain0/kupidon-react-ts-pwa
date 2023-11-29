import { CommonUiText } from 'src/utils/app/ui-value/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const ProfileUiText = {
  
  
  profile: CommonUiText.profile,
  
  reset: CommonUiText.reset,
  
  name: CommonUiText.name,
  namePlaceholder: CommonUiText.namePlaceholder,
  birthDate: CommonUiText.birthDate,
  birthDatePlaceholder: CommonUiText.birthDatePlaceholder,
  gender: CommonUiText.gender,
  male: CommonUiText.male,
  female: CommonUiText.female,
  
  
  aboutMe: [
    {
      value: 'aboutMe',
      lang: 'en-US',
      text: 'About me',
    },{
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
    },{
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
  
  
  
  nameIsNotEntered: CommonUiText.nameIsNotEntered,
  nameMaxLenIs100: CommonUiText.nameMaxLenIs100,
  noUserWithSuchId: CommonUiText.noUserWithSuchId,
  birthDateIsNotEntered: CommonUiText.birthDateIsNotEntered,
  birthDateHasIncorrectFormat: CommonUiText.birthDateHasIncorrectFormat,
  dateNotExists: CommonUiText.dateNotExists,
  youMustBeAtLeast18YearsOld: CommonUiText.youMustBeAtLeast18YearsOld,
  genderIsNotChosen: CommonUiText.genderIsNotChosen,
  descriptionMaxLenIs2000: CommonUiText.descriptionMaxLenIs2000,
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
} satisfies UiTextContainer