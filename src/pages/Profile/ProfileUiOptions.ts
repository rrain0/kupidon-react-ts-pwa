import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption, UiOptionsContainer } from 'src/utils/lang/UiOption'



export const ProfileUiOptions = {
  
  
  profile: CommonUiOptions.profile,
  
  
  id: [
    {
      value: 'id',
      lang: 'en-US',
      text: 'id',
    },
  ] satisfies UiOption<'id'>[],
  
  
  email: [
    {
      value: 'email',
      lang: 'en-US',
      text: 'Email',
    },
  ] satisfies UiOption<'email'>[],
  
  
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
  ] satisfies UiOption<'emailVerified'>[],
  
  
  yes: CommonUiOptions.yes,
  no: CommonUiOptions.no,
  reset: CommonUiOptions.reset,
  
  
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
  ] satisfies UiOption<'userCreated'>[],
  
  
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
  ] satisfies UiOption<'userUpdated'>[],
  
  
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
  ] satisfies UiOption<'name'>[],
  
  
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
  ] satisfies UiOption<'lastName'>[],
  
  
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
  ] satisfies UiOption<'birthDate'>[],
  
  
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
  ] satisfies UiOption<'sex'>[],
  
  
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
  ] satisfies UiOption<'male'>[],
  
  
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
  ] satisfies UiOption<'female'>[],
  
  
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
  ] satisfies UiOption<'aboutMe'>[],
  
  
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
  ] satisfies UiOption<'imLookingFor'>[],
  
  
  notSelected: CommonUiOptions.notSelected,
  ofGuys: CommonUiOptions.ofGuys,
  ofGirls: CommonUiOptions.ofGirls,
  ofGuysAndGirls: CommonUiOptions.ofGuysAndGirls,
  
  
  signOut: CommonUiOptions.signOut,
  update: CommonUiOptions.update,
  updated: CommonUiOptions.updated,
  
  
  
  firstNameIsNotEntered: CommonUiOptions.firstNameIsNotEntered,
  connectionError: CommonUiOptions.connectionError,
  unknownError: CommonUiOptions.unknownError,
  
  
} satisfies UiOptionsContainer