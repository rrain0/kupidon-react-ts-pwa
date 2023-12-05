import { Themes } from 'src/utils/theme/Themes'
import { DarkOrange } from 'src/utils/theme/themes/DarkOrange'
import Theme = Themes.Theme
import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import { DarkPinkGradient } from 'src/utils/theme/themes/DarkPinkGradient'
import { DarkSimple } from 'src/utils/theme/themes/DarkSimple'
import { LightOrange } from 'src/utils/theme/themes/LightOrange'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import { LightPinkGradient } from 'src/utils/theme/themes/LightPinkGradient'
import { LightSimpe } from 'src/utils/theme/themes/LightSimple'



export const DefaultLightTheme = LightSimpe
export const DefaultDarkTheme = DarkSimple
export const DefaultTheme = DefaultLightTheme



export const AllThemes = [
  LightSimpe,
  DarkSimple,
  
  LightPink,
  DarkPink,
  
  LightPinkGradient,
  DarkPinkGradient,
  
  LightOrange,
  DarkOrange,
] as const



export type AllThemeNamesType = typeof AllThemes[number]['name']




export const themeByName = (themeName: string): Theme => {
  return AllThemes.find(t=>t.name===themeName) ?? DefaultTheme
}
