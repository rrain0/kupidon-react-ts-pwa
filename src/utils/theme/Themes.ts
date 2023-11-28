




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
  
  
  
  export const LightPink: Theme = {
    type: 'light',
    name: 'Light Pink',
    
    containerNormal: {
      bgc:     ['#ffffff'],
      bgc2:    ['#f0f0f0'],
      content: ['#000000'],
    },
    containerAccent: {
      bgc:     ['#ffaeba'],
      content: ['#000000'],
    },
    
    buttonMain: {
      bgc:      ['#BB2649'],
      bgcFocus: ['#d93b5f'],
      content:  ['#F8F8F8'],
    },
    buttonAccent: {
      bgc:       ['#f37190'],
      bgcFocus:  ['#ff8eaa'],
      content:   ['#F8F8F8'],
      content2:  ['#000000'],
    },
    buttonTransparent: {
      bgcFocus: ['#00000011'],
    },
    buttonNav: {
      bgcFocus:      ['#fabfc9'],
      content:       ['#333333'],
      contentAccent: ['#BB2649'],
    },
    
    input: {
      bgc:           ['#F8F8F8'],
      content:       ['#000000'],
      placeholder:   ['#777777'],
      border:        ['#fb3570','#fb3570'],
      borderHover:   ['#9c20aa'],
      bgcError:      ['#ffced2'],
    },
    
    elementDisabled: {
      bgc:     ['#DCDCDC'],
      content: ['#555555'],
    },
    elementDanger: {
      bgc:      ['#dc362e'],
      bgcFocus: ['#e74c3c'],
      content:  ['#ffffff'],
    },
    
    ripple: {
      content:              ['#ffffff'],
      contentOnTransparent: ['#00000088'],
    },
    
    bottomSheet: {
      bgc:    ['#ffffff'],
      handle: ['#8b8b8b'],
    },
    
    page: {
      bgc:         ['#f5f5f5'],
      bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
      content:     ['#000000'],
    },
    
    statusBar: {
      bgc: ['#ffffff'],
    },
    nav: {
      bgc: ['#ffffff'],
    },
    
    toast: {
      bgc:                  ['#ffffff'], // <any>.bgc
      content:              ['#757575'], // <any>.content[0]
      content2:             ['#b2b2b2'], // <any>.content[1]
      content3:             ['#000000'], // <any>.content[2]
      accentNormal:         ['#bb86fc'], // normal.accent
      accentLoadingBgc:     ['#e0e0e0'], // loading.accent[0]
      accentLoadingContent: ['#616161'], // loading.accent[1]
      accentInfo:           ['#3498db'], // info.accent
      accentOk:             ['#07bc0c'], // ok.accent
      accentWarn:           ['#f1c40f'], // warn.accent
      accentDanger:         ['#e74c3c'], // danger.accent
    },
    scrollbar: {
      track: ['#25283622'],
      thumb: ['#25283644'],
    },
  }
  
  
  
  
  export const Dark: Theme = {
    type: 'dark',
    name: 'Dark',
    
    containerNormal: {
      bgc:     ['#000000'], // a.bgc
      bgc2:    ['#282c34'], // b.bgc
      content: ['#bdbdbd'], // a/b.content
    },
    containerAccent: {
      bgc:     ['#992c46'],
      content: ['#bdbdbd'],
    },
    
    buttonMain: {
      bgc:      ['#971f3b'],
      bgcFocus: ['#c6294e'],
      content:  ['#bdbdbd'],
    },
    buttonAccent: {
      bgc:       ['#d16780'],
      bgcFocus:  ['#da5474'],
      content:   ['#cdcdcd'],
      content2:  ['#000000'],
    },
    buttonTransparent: {
      bgcFocus: ['#ffffff22'],
    },
    buttonNav: {
      bgcFocus:      ['#2e3440'],
      content:       ['#bdbdbd'],
      contentAccent: ['#984559'],
    },
    
    input: {
      bgc:           ['#282c34'],
      content:       ['#cdcdcd'],
      placeholder:   ['#7b7b7b'],
      border:        ['#b32e56','#b32e56'],
      borderHover:   ['#2393c6'],
      bgcError:      ['#5e252c'],
    },
    
    elementDisabled: {
      bgc:     ['#DCDCDC'],
      content: ['#555555'],
    },
    elementDanger: {
      bgc:      ['#ac2c26'],
      bgcFocus: ['#c43730'],
      content:  ['#bdbdbd'],
    },
    
    ripple: {
      content:              ['#000000'],
      contentOnTransparent: ['#ffffff88'],
    },
    
    bottomSheet: {
      bgc:    ['#121212'],
      handle: ['#8b8b8b'],
    },
    
    page: {
      bgc:         ['#18191b'],
      bgcGradient: ['#18191b','#18191b','#18191b'],
      content:     ['#bdbdbd','#ffffff'],
    },
    
    statusBar: {
      bgc: ['#984559'],
    },
    nav: {
      bgc: ['#282c34'],
    },
    
    toast: {
      bgc:                  ['#121212'], // <any>.bgc
      content:              ['#ffffff'], // <any>.content[0]
      content2:             ['#b8b8b8'], // <any>.content[1]
      content3:             ['#ffffff'], // <any>.content[2]
      accentNormal:         ['#bb86fc'], // normal.accent
      accentLoadingBgc:     ['#e0e0e0'], // loading.accent[0]
      accentLoadingContent: ['#616161'], // loading.accent[1]
      accentInfo:           ['#3498db'], // info.accent
      accentOk:             ['#07bc0c'], // ok.accent
      accentWarn:           ['#f1c40f'], // warn.accent
      accentDanger:         ['#e74c3c'], // danger.accent
    },
    scrollbar: {
      track: ['#F8F8F822'],
      thumb: ['#F8F8F844'],
    },
  }
  
  
  
  
  
  export const LightPink2: Theme = {
    ...LightPink,
    name: 'Light Pink 2',
    
    buttonMain: {
      ...LightPink.buttonMain,
      bgc: ['#f95c67'],
    },
    
    input: {
      ...LightPink.input,
      border:      ['#ef7b7d','#fb3570'],
      borderHover: ['#00a8f3'],
    },
  }
  
  
  
  export const Dark2: Theme = {
    ...Dark,
    name: 'Dark 2',
    
    buttonMain: {
      ...LightPink.buttonMain,
      bgc: ['#d9816f'],
    },
    
    input: {
      ...LightPink.input,
      border:      ['#ef7b7d','#fb3570'],
      borderHover: ['#00a8f3'],
    },
  }
  
  
  
  export const LightPinkGradient: Theme = {
    ...LightPink,
    name: 'Light Pink Gradient',
    
    page: {
      ...LightPink.page,
      bgcGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
      //bgc: ['#ffb6c1','#f5f5f5','#d8701a'],
    },
    nav: {
      ...LightPink.nav,
      bgc: ['#f6d6db'],
    }
  }
  
  
  export const DarkGradient: Theme = {
    ...Dark,
    name: 'Dark Gradient',
    
    page: {
      ...Dark.page,
      bgcGradient: ['#992c46','#282c34','#282c34'],
      //bgc: ['#992c46','#282c34','#994500'],
    },
    buttonNav: {
      ...Dark.buttonNav,
      contentAccent: ['#d92a54'],
    },
    nav: {
      ...Dark.nav,
      bgc: ['#b06772'],
    }
  }
  
  
  
  
  export const allThemes = [
    LightPink, Dark,
    LightPink2, Dark2,
    LightPinkGradient, DarkGradient,
  ] as const
  export const themeByName = (themeName: string)=>{
    return allThemes.find(t=>t.name===themeName) ?? LightPink
  }
  
  
  export const defaultLight = LightPink.name
  export const defaultDark = Dark.name
  
}


