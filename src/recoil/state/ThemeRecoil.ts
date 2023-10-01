import { atom } from 'recoil'
import { localStorageEffect2 } from '../RecoilPersist'
import { Themes } from 'src/theme/Themes'
import ThemeType = Themes.ThemeType
import Theme = Themes.Theme




export type ThemeSettingsStateType = {
  setting: 'user'|'system',
  userSetting: ThemeType,
  light: string,
  dark: string,
}
export const ThemeSettingsRecoil = atom<ThemeSettingsStateType>({
  key: 'themeSettings',
  default: {
    setting: 'system',
    userSetting: 'light',
    light: Themes.defaultLight,
    dark: Themes.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})


export type ThemeRecoilType = {
  theme: Theme
  isSystemAvailable: boolean
}
export const ThemeRecoil = atom<ThemeRecoilType>({
  key: 'themeObject',
  default: {
    theme: Themes.LightPink,
    isSystemAvailable: false,
  },
})




