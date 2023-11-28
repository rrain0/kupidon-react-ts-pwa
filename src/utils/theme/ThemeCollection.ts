import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import {
  DarkGradient,
  DarkOrange,
  LightOrange,
  LightPinkGradient,
} from 'src/utils/theme/themes/draft'
import { LightPink } from 'src/utils/theme/themes/LightPink'



export const DefaultLightTheme = LightPink
export const DefaultDarkTheme = DarkPink
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  LightPink,           DarkPink,
  LightOrange,         DarkOrange,
  LightPinkGradient,   DarkGradient,
] as const



export const themeByName = (themeName: string): Theme => {
  return AllThemes.find(t=>t.name===themeName) ?? DefaultTheme
}
