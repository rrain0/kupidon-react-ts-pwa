import { atom, selector } from 'recoil';
import { localStorageEffect2 } from '../RecoilPersist';
import { Theme } from '../../theme/Theme';



export type ThemeStateType = {
  type: Theme.Theme['type'],
  light: string,
  dark: string,
}
export const themeState = atom<ThemeStateType>({
  key: 'theme',
  default: {
    type: Theme.defaultTheme,
    light: Theme.defaultLight,
    dark: Theme.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})



export const themeObjState = selector<Theme.Theme>({
  key: 'themeObj',
  get: ({get})=>{
    const theme = get(themeState)
    
    let themeName = function(){
      switch (theme.type){
        case 'light': default: return theme.light
        case 'dark': return theme.dark
      }
    }()
    
    const themeObj = Theme.themeFromName[themeName]
    return themeObj
  }
})





