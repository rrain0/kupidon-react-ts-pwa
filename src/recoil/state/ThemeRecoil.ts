import { atom } from 'recoil'
import { localStorageEffect2 } from '../RecoilPersist'
import { Themes } from 'src/utils/theme/Themes'
import ThemeType = Themes.Type
import Theme = Themes.Theme




export type ThemeSettingsStateType = {
  setting: 'manual'|'system',
  manualSetting: ThemeType,
  light: string,
  dark: string,
}
export const ThemeSettingsRecoil = atom<ThemeSettingsStateType>({
  key: 'themeSettings',
  default: {
    setting: 'system',
    manualSetting: 'light',
    light: Themes.DefaultLightTheme.name,
    dark: Themes.DefaultDarkTheme.name,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})


export type ThemeRecoilType = {
  theme: Theme
  systemThemeAvailable: boolean | undefined
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: {
    theme: Themes.DefaultTheme,
    systemThemeAvailable: undefined,
  },
})




