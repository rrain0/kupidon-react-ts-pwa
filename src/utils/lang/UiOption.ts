import { Lang } from 'src/recoil/state/LangRecoil'


export type UiOption<V> = {
  value: V
  lang: Lang
  text: string
}

export type UiOptionsContainer = Record<string, UiOption<any>[]>


/*
  usage example:
  
  export const theme = [
    {
      value: 'lightTheme',
      lang: 'en-US',
      text: 'Light theme',
    },{
      value: 'lightTheme',
      lang: 'ru-RU',
      text: 'Светлая тема',
    }
  ] satisfies UiOption<lightTheme>[]
  
*/

