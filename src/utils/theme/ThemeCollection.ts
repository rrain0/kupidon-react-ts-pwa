import { Themes } from 'src/utils/theme/Themes'
import { DarkOrange } from 'src/utils/theme/themes/DarkOrange'
import Theme = Themes.Theme
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import { DarkPinkGradient } from 'src/utils/theme/themes/DarkPinkGradient'
import { LightOrange } from 'src/utils/theme/themes/LightOrange'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import { LightPinkGradient } from 'src/utils/theme/themes/LightPinkGradient'



export const DefaultLightTheme = LightPink
export const DefaultDarkTheme = DarkPink
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  LightPink,           DarkPink,
  LightPinkGradient,   DarkPinkGradient,
  LightOrange,         DarkOrange,
] as const



export type AllThemeNamesType =
  | (typeof LightPink)['name']
  | (typeof DarkPink)['name']
  | (typeof LightPinkGradient)['name']
  | (typeof DarkPinkGradient)['name']
  | (typeof LightOrange)['name']
  | (typeof DarkOrange)['name']


export const themeByName = (themeName: string): Theme => {
  return AllThemes.find(t=>t.name===themeName) ?? DefaultTheme
}
