import { ThemeSettingType } from 'src/recoil/state/ThemeRecoil'
import { UiOption } from 'src/utils/UiOption'



export namespace QuickSettingsUiOptions {
  
  
  export const theme: UiOption<ThemeSettingType>[] = [
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
    
    {
      value: 'system',
      lang: 'en',
      text: 'System theme',
    },
    {
      value: 'system',
      lang: 'ru',
      text: 'Тема системы',
    },
  ]
  
  
  
}