import { atom, selector } from 'recoil';
import { localStorageEffect2 } from './RecoilPersist';
import { Theme } from '../theme/Theme';



export type ThemeStateType = {
  current: Theme.Theme['type'],
  preferredLight: string,
  preferredDark: string,
}
export const themeState = atom<ThemeStateType>({
  key: 'theme',
  default: {
    current: Theme.defaultTheme,
    preferredLight: Theme.defaultLight,
    preferredDark: Theme.defaultDark,
  },
  effects: [localStorageEffect2({ removeWhen: ['reset'] })],
})



export const themeObjState = selector<Theme.Theme>({
  key: 'themeObj',
  get: ({get})=>{
    const theme = get(themeState)
    
    let themeName = function(){
      switch (theme.current){
        case 'light': default: return theme.preferredLight
        case 'dark': return theme.preferredDark
      }
    }()
    
    const themeObj = Theme.themeFromName[themeName]
    return themeObj
  }
})





