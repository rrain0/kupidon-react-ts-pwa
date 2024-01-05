import { atom } from 'recoil'
import { DefaultDarkTheme, DefaultLightTheme, DefaultTheme } from 'src/utils/theme/ThemeCollection'
import { localStorageEffect2 } from '../RecoilPersist'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Theme = AppTheme.Theme




export type ThemeSettingsStateType = {
  setting: 'manual'|'system',
  manualSetting: AppTheme.Type,
  light: string,
  dark: string,
}
export const ThemeSettingsRecoil = atom<ThemeSettingsStateType>({
  key: 'themeSettings',
  default: {
    setting: 'system',
    manualSetting: 'light',
    light: DefaultLightTheme.name,
    dark: DefaultDarkTheme.name,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})


export type ThemeRecoilType = {
  theme: Theme
  themeIsReady: boolean
  systemThemeAvailable: boolean | undefined
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: {
    theme: DefaultTheme,
    themeIsReady: false,
    systemThemeAvailable: undefined,
  },
})




