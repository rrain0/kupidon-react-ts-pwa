import { UiText } from 'src/utils/lang/UiText'
import { AllThemeNamesType } from 'src/utils/theme/ThemeCollection'




export const ThemeNameUiText = {
  
  
  'Light Pink': [
    {
      value: 'Light Pink',
      lang: 'en-US',
      text: 'Light Pink',
    },{
      value: 'Light Pink',
      lang: 'ru-RU',
      text: 'Светлая Розовая',
    },
  ] satisfies UiText<'Light Pink'>[],
  
  
  'Dark Pink': [
    {
      value: 'Dark Pink',
      lang: 'en-US',
      text: 'Dark Pink',
    },{
      value: 'Dark Pink',
      lang: 'ru-RU',
      text: 'Тёмная Розовая',
    },
  ] satisfies UiText<'Dark Pink'>[],
  
  
  'Light Pink Gradient': [
    {
      value: 'Light Pink Gradient',
      lang: 'en-US',
      text: 'Light Pink Gradient',
    },{
      value: 'Light Pink Gradient',
      lang: 'ru-RU',
      text: 'Светлая Розовая Градиент',
    },
  ] satisfies UiText<'Light Pink Gradient'>[],
  
  
  'Dark Pink Gradient': [
    {
      value: 'Dark Pink Gradient',
      lang: 'en-US',
      text: 'Dark Pink Gradient',
    },{
      value: 'Dark Pink Gradient',
      lang: 'ru-RU',
      text: 'Тёмная розовая Градиент',
    },
  ] satisfies UiText<'Dark Pink Gradient'>[],
  
  
  'Light Orange': [
    {
      value: 'Light Orange',
      lang: 'en-US',
      text: 'Light Orange',
    },{
      value: 'Light Orange',
      lang: 'ru-RU',
      text: 'Светлая Оранжевая',
    },
  ] satisfies UiText<'Light Orange'>[],
  
  
  'Dark Orange': [
    {
      value: 'Dark Orange',
      lang: 'en-US',
      text: 'Dark Orange',
    },{
      value: 'Dark Orange',
      lang: 'ru-RU',
      text: 'Тёмная Оранжевая',
    },
  ] satisfies UiText<'Dark Orange'>[],
  
  
  
} satisfies Record<AllThemeNamesType, UiText<AllThemeNamesType>[]>