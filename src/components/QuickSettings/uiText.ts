import { CommonUiText } from 'src/utils/app/CommonUiText'
import { UiText, UiTextContainer } from 'src/utils/lang/UiText'



export const QuickSettingsUiText = {
  
  
  settings: CommonUiText.settings,
  
  
  theme: CommonUiText.theme,
  systemTheme: CommonUiText.systemTheme,
  lightTheme: CommonUiText.lightTheme,
  darkTheme: CommonUiText.darkTheme,
  
  
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
  ] satisfies UiText<'clearAppData'>[],
  
  
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
  ] satisfies UiText<'installApp'>[],
  
  
  language: CommonUiText.language,
  systemLanguage: CommonUiText.systemLanguage,
  russian: CommonUiText.russian,
  english: CommonUiText.english,
  
  
  accountSettings: CommonUiText.accountSettings,
  appSettings: CommonUiText.appSettings,
  testPage: CommonUiText.testPage,
  
  
} satisfies UiTextContainer