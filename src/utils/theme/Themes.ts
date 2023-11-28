import { DarkPink } from 'src/utils/theme/themes/DarkPink'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import {
  DarkGradient,
  DarkOrange,
  LightOrange,
  LightPinkGradient,
} from 'src/utils/theme/themes/draft'


export namespace Themes {
  
  export type Type = 'light'|'dark'
  
  
  
  
  // Цвета в массиве для градиентов
  // Если нужен повариант, то лучше создать отдельный объект
  export interface BgcContent {
    // various bgc colors
    bgc: string[]
    // various applicable content (text) colors
    // content[i] is made for bgc[i]
    content: string[]
  }
  export type BgcContentVariants<T extends object> = {
    [Prop in keyof T]: BgcContent
  }
  
  
  export interface Theme {
    type: Type
    name: string
    
    
    element?: {
      //highlight?: {}
      //primary?: {}
      //secondary?: {}
      //normal?: {}
    }
    // окружение
    /* ambience: {
      normal: BgcContentVariants<{ a, b }>
    } */
    containerNormal: {
      bgc:     string[]
      bgc2:    string[]
      content: string[]
    },
    containerAccent: {
      bgc:     string[]
      content: string[]
    },
    
    // main button (submit button)
    // radio input
    buttonMain: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    }
    // just colorful button that drags some attention
    buttonAccent: {
      bgc:       string[]
      bgcFocus:  string[]
      content:   string[]
      content2:  string[]
    }
    // transparent icon button
    buttonTransparent: {
      bgcFocus: string[],
    }
    buttonNav: {
      bgcFocus:      string[]
      content:       string[]
      contentAccent: string[]
    }
    
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bgc:           string[]
      content:       string[]
      placeholder:   string[]
      border:        string[]
      borderHover:   string[]
      bgcError:      string[]
    }
    
    // disabledButton
    elementDisabled: {
      bgc:     string[]
      content: string[]
    }
    // dangerButton
    elementDanger: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    }
    
    ripple: {
      content:              string[]
      contentOnTransparent: string[]
    }
    
    bottomSheet: {
      bgc:    string[]
      handle: string[]
    }
    
    page: {
      bgc:         string[]
      bgcGradient: string[]
      //bgc3:        string[]
      content:     string[]
    }
    
    statusBar: {
      bgc: string[]
    }
    nav: {
      bgc: string[]
    }
    
    toast: {
      bgc:                  string[]
      content:              string[]
      content2:             string[]
      content3:             string[]
      accentNormal:         string[]
      accentLoadingBgc:     string[]
      accentLoadingContent: string[]
      accentInfo:           string[]
      accentOk:             string[]
      accentWarn:           string[]
      accentDanger:         string[]
    }
    scrollbar: {
      track: string[]
      thumb: string[]
    }
  }
  
  
  
  
  
  
  
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
  
  
}


