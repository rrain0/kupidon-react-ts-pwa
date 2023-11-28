




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
    
    // окружение
    ambience: {
      normal: BgcContentVariants<{ a, b }>
      accent: BgcContentVariants<{ a }>
    }
    
    
    
    // main button (submit button)
    // radio input
    buttonMain: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    },
    // just colorful button that drags some attention
    buttonAccent: {
      bgc:       string[]
      bgcFocus:  string[]
      content:   string[]
      content2:  string[]
    },
    // transparent icon button
    buttonTransparent: {
      bgcFocus: string[],
    },
    // input, dataField, textarea, radioInput, radioGroup
    input: {
      bgc:           string[]
      content:       string[]
      placeholder:   string[]
      border:        string[]
      borderHover:   string[]
      bgcError:      string[]
    },
    
    // disabledButton
    elementDisabled: {
      bgc:     string[]
      content: string[]
    },
    // dangerButton
    elementDanger: {
      bgc:      string[]
      bgcFocus: string[]
      content:  string[]
    },
    
    ripple: {
      content:              string[]
      contentOnTransparent: string[]
    },
    
    
    
    element?: {
      //highlight?: {}
      //primary?: {}
      //secondary?: {}
      //normal?: {}
    }
    
    
    
    
    page: {
      // bgc[0] - theme color
      // bgc[1] - background color
      bgc: string[]
      bgc2: string[]
      bgc3: string[]
      text: string[]
    }
    statusBar: {
      bgc: string[]
    }
    nav: {
      bgc: string[]
      button: {
        bgc: string[]
        text: string[]
        ripple: string[]
        active: string[]
        hover: string[]
        selected: {
          text: string[]
        }
      }
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
    
    ambience: {
      normal: {
        a: { bgc: ['#ffffff'], content: ['#000000'] },
        b: { bgc: ['#f0f0f0'], content: ['#000000'] },
      },
      accent: {
        a: { bgc: ['#ffaeba'], content: ['#000000'] },
      },
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
      bgcFocus: ['#00000011'], // /input.iconHover | /input.iconActive
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
    
    page: {
      //bgc: ['#ffaeba','#f0f0f0','#ffb6c1'],
      bgc: ['#f5f5f5','#f5f5f5'],
      bgc2: ['#ffb6c1','#f5f5f5','#d8701a'],
      bgc3: ['#fff','#8b8b8b'],
      text: ['#000000'],
    },
    
    statusBar: {
      bgc: ['#ffffff'],
    },
    
    nav: {
      //bgc: ['#f6d6db'], //#e8809a
      bgc: ['#ffffff'],
      button: {
        bgc: ['#BB2649'],
        text: ['#333333'],
        ripple: ['#ffffff'],
        active: ['#fabfc9'],
        hover: ['#fabfc9'],
        selected: {
          text: ['#BB2649'],
        },
      },
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
    
    ambience: {
      normal: {
        a: { bgc: ['#000000'], content: ['#bdbdbd'] },
        b: { bgc: ['#282c34'], content: ['#bdbdbd'] },
      },
      accent: {
        a: { bgc: ['#992c46'], content: ['#bdbdbd'] },
      },
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
      bgcFocus: ['#ffffff22'], // /input.iconHover | /input.iconActive
    },
    // input
    // element.input
    input: {
      bgc:           ['#282c34'], // a.bgc
      content:       ['#cdcdcd'], // a.content
      placeholder:   ['#7b7b7b'], // aPlaceholder.content
      border:        ['#b32e56','#b32e56'], // aBorder.bgc
      borderHover:   ['#2393c6'], // aBorderHover.bgc
      bgcError:      ['#5e252c'], // /input.error.bgc
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
    
    page: {
      //bgc: ['#992c46','#282c34','#992c46'],
      //bgc: ['#1d1e22','#1d1e22','#992c46'],
      bgc: ['#18191b','#18191b'],
      bgc2: ['#992c46','#282c34','#994500'],
      bgc3: ['#121212','#8b8b8b'],
      text: ['#bdbdbd','#ffffff'],
    },
    
    statusBar: {
      bgc: ['#984559'],
    },
    
    nav: {
      bgc: ['#282c34'], // #b06772
      button: {
        bgc: ['#971f3b'],
        text: ['#bdbdbd'],
        ripple: ['#000'],
        active: ['#2e3440'],
        hover: ['#2e3440'],
        selected: {
          //text: ['#d92a54'],
          text: ['#984559'],
        }
      }
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
    type: 'light',
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
    type: 'dark',
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
  
  
  
  
  export const allThemes = [
    LightPink, Dark,
    LightPink2, Dark2,
  ] as const
  export const themeByName = (themeName: string)=>{
    return allThemes.find(t=>t.name===themeName) ?? LightPink
  }
  
  
  export const defaultLight = LightPink.name
  export const defaultDark = Dark.name
  
}





const LightPink = {
  type: 'light',
  name: 'Light Pink',
  
  
  // ambience.normal
  containerNormal: {
    bgc1:     ['#ffffff'], // a.bgc
    bgc2:     ['#f0f0f0'], // b.bgc
    contentA: ['#000000'], // a/b.content
  },
  // ambience.accent
  containerAccent: {
    bgc:     ['#ffaeba'], // a.bgc
    content: ['#000000'], // a.content
  },
  
  //elementNormal: {},
  
  
  // input
  // element.input
  input: {
    bgc:           ['#F8F8F8'], // a.bgc
    content:       ['#000000'], // a.content
    placeholder:   ['#777777'], // aPlaceholder.content
    border:        ['#fb3570','#fb3570'], // aBorder.bgc
    borderHover:   ['#9c20aa'], // aBorderHover.bgc
    bgcIconActive: ['#00000011'], // /input.iconActive
    bgcIconHover:  ['#00000011'], // /input.iconHover
    bgcError:      ['#ffced2'], // /input.error.bgc
  },
  
  
  
  
  
  element: {
    ripple: {
      a: { bgc: ['#000000'], content: ['#ffffff'] },
      b: { bgc: ['transparent'], content: ['#00000088'] },
    },
    disabled: {
      a: { bgc: ['#DCDCDC'], content: ['#555555'] },
    },
    danger: {
      a:      { bgc: ['#dc362e'], content: ['#ffffff'] },
      aFocus: { bgc: ['#e74c3c'], content: ['#ffffff'] },
    }
  },
  
  page: {
    //bgc: ['#ffaeba','#f0f0f0','#ffb6c1'],
    bgc: ['#f5f5f5','#f5f5f5'],
    bgc2: ['#ffb6c1','#f5f5f5','#d8701a'],
    bgc3: ['#fff','#8b8b8b'],
    text: ['#000000'],
  },
  
  
  statusBar: {
    bgc: ['#ffffff'],
  },
  
  nav: {
    //bgc: ['#f6d6db'], //#e8809a
    bgc: ['#ffffff'],
    button: {
      bgc: ['#BB2649'],
      text: ['#333333'],
      ripple: ['#ffffff'],
      active: ['#fabfc9'],
      hover: ['#fabfc9'],
      selected: {
        text: ['#BB2649'],
      },
    },
  },
  
  scrollbar: {
    track: ['#25283622'],
    thumb: ['#25283644'],
  },
}

