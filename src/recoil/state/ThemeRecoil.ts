import { atom } from 'recoil'
import { DefaultDarkTheme, DefaultLightTheme, DefaultTheme } from 'src/utils/theme/ThemeCollection'
import { localStorageEffect2 } from '../RecoilPersist'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme




export type ThemeSettingsStateType = {
  setting: 'manual'|'system',
  manualSetting: Themes.Type,
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
  systemThemeAvailable: boolean | undefined
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'theme',
  default: {
    theme: DefaultTheme,
    systemThemeAvailable: undefined,
  },
})




