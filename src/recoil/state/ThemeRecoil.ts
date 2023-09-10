import { atom, selector } from 'recoil';
import { localStorageEffect2 } from '../RecoilPersist';
import { Theme } from '../../theme/Theme';



export type ThemeStateType = {
  type: Theme.ThemeType,
  light: string,
  dark: string,
}
export const ThemeRecoil = atom<ThemeStateType>({
  key: 'theme',
  default: {
    type: Theme.defaultTheme,
    light: Theme.defaultLight,
    dark: Theme.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})



export const ThemeObjRecoil = selector<Theme.Theme>({
  key: 'themeObj',
  get: ({get})=>{
    const theme = get(ThemeRecoil)
    
    let themeName = themeNameFromState(theme)
    
    const themeObj = Theme.themeByName(themeName)!
    return themeObj
  }
})


export const themeNameFromState = (themeState: ThemeStateType)=>{
  switch (themeState.type){
    case 'light': default: return themeState.light
    case 'dark': return themeState.dark
  }
}



