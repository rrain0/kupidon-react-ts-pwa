import { atom, selector } from 'recoil';
import { localStorageEffect2 } from '../RecoilPersist';
import { Themes } from 'src/theme/Themes';



export type ThemeStateType = {
  type: Themes.ThemeType,
  light: string,
  dark: string,
}
export const ThemeRecoil = atom<ThemeStateType>({
  key: 'theme',
  default: {
    type: Themes.defaultTheme,
    light: Themes.defaultLight,
    dark: Themes.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})



export const ThemeObjRecoil = selector<Themes.Theme>({
  key: 'themeObj',
  get: ({get})=>{
    const theme = get(ThemeRecoil)
    
    let themeName = themeNameFromState(theme)
    
    const themeObj = Themes.themeByName(themeName)!
    return themeObj
  }
})


export const themeNameFromState = (themeState: ThemeStateType)=>{
  switch (themeState.type){
    case 'light': default: return themeState.light
    case 'dark': return themeState.dark
  }
}



