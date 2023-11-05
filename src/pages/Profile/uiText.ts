import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const ProfileUiText = {
  
  
  profile: CommonUiText.profile,
  
  
  id: [
    {
      value: 'id',
      lang: 'en-US',
      text: 'id',
    },
  ] satisfies UiText<'id'>[],
  
  
  email: [
    {
      value: 'email',
      lang: 'en-US',
      text: 'Email',
    },
  ] satisfies UiText<'email'>[],
  
  
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
  ] satisfies UiText<'emailVerified'>[],
  
  
  yes: CommonUiText.yes,
  no: CommonUiText.no,
  reset: CommonUiText.reset,
  
  
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
  ] satisfies UiText<'userCreated'>[],
  
  
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
  ] satisfies UiText<'userUpdated'>[],
  
  
  name: [
    {
      value: 'name',
      lang: 'en-US',
      text: 'Name',
    },
    {
      value: 'name',
      lang: 'ru-RU',
      text: 'Имя',
    },
  ] satisfies UiText<'name'>[],
  
  
  lastName: [
    {
      value: 'lastName',
      lang: 'en-US',
      text: 'Last name',
    },
    {
      value: 'lastName',
      lang: 'ru-RU',
      text: 'Фамилия',
    },
  ] satisfies UiText<'lastName'>[],
  
  
  birthDate: [
    {
      value: 'birthDate',
      lang: 'en-US',
      text: 'Birth date',
    },
    {
      value: 'birthDate',
      lang: 'ru-RU',
      text: 'Дата рождения',
    },
  ] satisfies UiText<'birthDate'>[],
  
  
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
  connectionError: CommonUiText.connectionError,
  unknownError: CommonUiText.unknownError,
  
  
} satisfies UiTextContainer