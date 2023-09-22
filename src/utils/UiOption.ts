


export type UiOption<V> = {
  value: V
  lang: string
  text: string
}


/*
  usage example:
  
  export const theme: UiOption<ThemeType>[] = [
    {
      value: 'light',
      lang: 'en',
      text: 'Light theme',
    },
    {
      value: 'light',
      lang: 'ru',
      text: 'Светлая тема',
    },
    
    {
      value: 'dark',
      lang: 'en',
      text: 'Dark theme',
    },
    {
      value: 'dark',
      lang: 'ru',
      text: 'Тёмная тема',
    },
  ]
  
*/

