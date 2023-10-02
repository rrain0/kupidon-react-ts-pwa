import { Lang } from 'src/recoil/state/LangRecoil'


export type UiOption<V> = {
  value: V
  lang: Lang
  text: string
}


/*
  usage example:
  
  export const theme: UiOption<ThemeType>[] = [
    {
      value: 'light',
      lang: 'en-US',
      text: 'Light theme',
    },
    {
      value: 'light',
      lang: 'ru-RU',
      text: 'Светлая тема',
    },
    
    {
      value: 'dark',
      lang: 'en-US',
      text: 'Dark theme',
    },
    {
      value: 'dark',
      lang: 'ru-RU',
      text: 'Тёмная тема',
    },
  ]
  
*/

