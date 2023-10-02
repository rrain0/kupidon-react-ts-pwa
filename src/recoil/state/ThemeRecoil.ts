import { atom } from 'recoil'
import { localStorageEffect2 } from '../RecoilPersist'
import { Themes } from 'src/theme/Themes'
import ThemeType = Themes.ThemeType
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
    light: Themes.defaultLight,
    dark: Themes.defaultDark,
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
    theme: Themes.LightPink,
    systemThemeAvailable: undefined,
  },
})




