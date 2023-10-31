import { CommonUiOptions } from 'src/utils/app/CommonUiOptions'
import { UiOption } from 'src/utils/lang/UiOption'



export const ApplicationSettingsUiOptions = {
  
  
  appSettings: CommonUiOptions.appSettings,
  
  
  theme: CommonUiOptions.theme,
  systemTheme: CommonUiOptions.systemTheme,
  lightTheme: CommonUiOptions.lightTheme,
  darkTheme: CommonUiOptions.darkTheme,
  
  
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
  systemLanguage: CommonUiOptions.systemLanguage,
  russian: CommonUiOptions.russian,
  english: CommonUiOptions.english,
  
  
  accountSettings: CommonUiOptions.accountSettings,
  testPage: CommonUiOptions.testPage,
  
  
} satisfies Record<string, UiOption<any>[]>