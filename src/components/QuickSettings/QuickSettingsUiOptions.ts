import { Themes } from 'src/utils/theme/Themes'
import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/lang/UiOption'
import ThemeType = Themes.ThemeType



export const QuickSettingsUiOptions = {
  
  
  settings: CommonUiOptions.settings,
  
  
  theme: CommonUiOptions.theme,
  
  
  themeOptions: [
    {
      value: 'system',
      lang: 'en-US',
      text: 'System theme',
    },
    {
      value: 'system',
      lang: 'ru-RU',
      text: 'Тема системы',
    },
    
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
  ] satisfies UiOption<ThemeType|'system'>[],
  
  
  clearAppData: [
    {
      value: 'clearAppData',
      lang: 'en-US',
      text: 'Clear app data',
    },
    {
      value: 'clearAppData',
      lang: 'ru-RU',
      text: 'Очистить данные приложения',
    },
  ] satisfies UiOption<'clearAppData'>[],
  
  
  installApp: [
    {
      value: 'installApp',
      lang: 'en-US',
      text: 'Install App',
    },
    {
      value: 'installApp',
      lang: 'ru-RU',
      text: 'Установить Приложение',
    },
  ] satisfies UiOption<'installApp'>[],
  
  
  language: CommonUiOptions.language,
  
  
  languageOptions: CommonUiOptions.languageOptions,
  
  
} satisfies Record<string, UiOption<any>[]>