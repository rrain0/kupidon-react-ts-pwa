import { Themes } from 'src/theme/Themes'
import { UiOption } from 'src/utils/UiOption'


export namespace QuickSettingsUiOptions {
  
  import ThemeType = Themes.ThemeType
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
  
  
  
  
}