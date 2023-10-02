import { Lang } from 'src/recoil/state/LangRecoil'
import { Themes } from 'src/theme/Themes'
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
  ] as UiOption<ThemeType|'system'>[],
  
  
  language: CommonUiOptions.language,
  
  
  languageOptions: CommonUiOptions.languageOptions,
  
  
} satisfies Record<string, UiOption<any>[]>