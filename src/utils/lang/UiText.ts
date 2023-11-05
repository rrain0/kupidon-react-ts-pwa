import { Lang } from 'src/recoil/state/LangRecoil'


export type UiText<V = any> = {
  value: V
  lang: Lang
  text: string
}

export type UiTextContainer = Record<string, UiText[]>


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
  ] satisfies UiText<lightTheme>[]
  
*/

