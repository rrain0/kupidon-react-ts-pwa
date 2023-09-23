import { atom } from 'recoil'
import { localStorageEffect2 } from '../RecoilPersist'
import { Themes } from 'src/theme/Themes'
import ThemeType = Themes.ThemeType
import Theme = Themes.Theme


export type ThemeSettingType = ThemeType|'system'

export type ThemeSettingsStateType = {
  type: ThemeSettingType,
  light: string,
  dark: string,
}
export const ThemeSettingsRecoil = atom<ThemeSettingsStateType>({
  key: 'themeSettings',
  default: {
    type: Themes.defaultTheme,
    light: Themes.defaultLight,
    dark: Themes.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})



export const ThemeObjectRecoil = atom<Theme>({
  key: 'themeObject',
  default: undefined,
})




