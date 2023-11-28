




export namespace Themes {
  
  export type ThemeType = 'light'|'dark'
  
  
  
  export type ToastTheme = {
    // bgc[0]: main bgc
    bgc: string[]
    
    // content[0]: text
    // content[1]: close button
    // content[2]: close button hovered
    content: string[]
    
    // accent[0]: info icon / progress bar
    accent: string[]
    
    // accentContent[0]: some content on accent color
    // accentContent: string[]
  }
  
  export type ViewTheme = Partial<{
    hover: {},
    active: {},
    focus: {},
    focusVisible: {},
    readOnly: {},
    disabled: {},
    error: {},
  }>
  
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
    type: ThemeType
    name: string
    
    // окружение
    ambience: {
      normal: BgcContentVariants<{ a, b }>
      accent: BgcContentVariants<{ a }>
    }
    element: {
      //highlight?: BgcContentVariants<{ a }>
      //primary?: BgcContentVariants<{ a }>
      //secondary?: BgcContentVariants<{ a }>
      
      main:     BgcContentVariants<{ a, aFocus }>
      accent:   BgcContentVariants<{ a, aFocus, b }>
      normal?:  any
      input:    BgcContentVariants<{
        a, aPlaceholder, aBorder, aBorderHover
      }>
      ripple:   BgcContentVariants<{ a, b }>
      disabled: BgcContentVariants<{ a }>
      danger:   BgcContentVariants<{ a, aFocus }>
    }
    
    toast: {
      normal: ToastTheme
      loading: ToastTheme
      info: ToastTheme
      ok: ToastTheme
      warn: ToastTheme
      danger: ToastTheme
    }
    
    page: {
      // bgc[0] - theme color
      // bgc[1] - background color
      bgc: string[]
      bgc2: string[]
      bgc3: string[]
      text: string[]
    }
    input: {
      iconActive: string[]
      iconHover: string[]
      error: {
        bgc: string[]
      }
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
    element: {
      main: {
        a:      { bgc: ['#BB2649'], content: ['#F8F8F8'] },
        aFocus: { bgc: ['#d93b5f'], content: ['#F8F8F8'] },
      },
      accent: {
        a:      { bgc: ['#f37190'], content: ['#F8F8F8'] },
        aFocus: { bgc: ['#ffa4ba'], content: ['#F8F8F8'] },
        b:      { bgc: ['#f37190'], content: ['#000000'] },
      },
      input: {
        a:            { bgc: ['#F8F8F8'], content: ['#000000'] },
        aBorder:      { bgc: ['#fb3570','#fb3570'], content: [] },
        aPlaceholder: { bgc: ['#F8F8F8'], content: ['#777777'] },
        aBorderHover: { bgc: ['#9c20aa'], content: [] },
      },
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
    
    toast:{
      normal: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#bb86fc'],
      },
      loading: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#e0e0e0', '#616161'],
      },
      info: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#3498db'],
      },
      ok: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#07bc0c'],
      },
      warn: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#f1c40f'],
      },
      danger: {
        bgc: ['#ffffff'],
        content: ['#757575', '#b2b2b2', '#000000'],
        accent: ['#e74c3c'],
      },
    },
    
    page: {
      //bgc: ['#ffaeba','#f0f0f0','#ffb6c1'],
      bgc: ['#f5f5f5','#f5f5f5'],
      bgc2: ['#ffb6c1','#f5f5f5','#d8701a'],
      bgc3: ['#fff','#8b8b8b'],
      text: ['#000000'],
    },
    
    input: {
      iconActive: ['#00000011'],
      iconHover: ['#00000011'],
      // [hover, normal, normal]
      // input border: ['#00a8f3', '#9c20aa', '#fb3570'],
      error: {
        bgc: ['#ffced2'],
      }
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
    element: {
      main: {
        a:      { bgc: ['#971f3b'], content: ['#bdbdbd'] },
        aFocus: { bgc: ['#c6294e'], content: ['#bdbdbd'] },
      },
      accent: {
        a:      { bgc: ['#d16780'], content: ['#cdcdcd'] },
        aFocus: { bgc: ['#e58ea2'], content: ['#cdcdcd'] },
        b:      { bgc: ['#d16780'], content: ['#000000'] },
      },
      input: {
        a:            { bgc: ['#282c34'], content: ['#bdbdbd'] },
        aBorder:      { bgc: ['#b32e56','#b32e56'], content: [] },
        aPlaceholder: { bgc: ['#282c34'], content: ['#7b7b7b'] },
        aBorderHover: { bgc: ['#2393c6'], content: [] },
      },
      ripple: {
        a: { bgc: ['#ffffff'], content: ['#000000'] },
        b: { bgc: ['transparent'], content: ['#ffffff88'] },
      },
      disabled: {
        a: { bgc: ['#DCDCDC'], content: ['#555555'] },
      },
      danger: {
        a:      { bgc: ['#ac2c26'], content: ['#bdbdbd'] },
        aFocus: { bgc: ['#c43730'], content: ['#bdbdbd'] },
      }
    },
    
    toast:{
      normal: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#bb86fc'],
      },
      loading: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#e0e0e0', '#616161'],
      },
      info: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#3498db'],
      },
      ok: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#07bc0c'],
      },
      warn: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#f1c40f'],
      },
      danger: {
        bgc: ['#121212'],
        content: ['#ffffff', '#b8b8b8', '#ffffff'],
        accent: ['#e74c3c'],
      },
    },
    
    page: {
      //bgc: ['#992c46','#282c34','#992c46'],
      //bgc: ['#1d1e22','#1d1e22','#992c46'],
      bgc: ['#18191b','#18191b'],
      bgc2: ['#992c46','#282c34','#994500'],
      bgc3: ['#121212','#8b8b8b'],
      text: ['#bdbdbd','#ffffff'],
    },
    
    input: {
      iconActive: ['#ffffff22'],
      iconHover: ['#ffffff22'],
      // [hover, normal, normal]
      // input border: ['#00a8f3', '#9c20aa', '#fb3570'],
      error: {
        bgc: ['#5e252c'],
      }
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
    
    scrollbar: {
      track: ['#F8F8F822'],
      thumb: ['#F8F8F844'],
    },
  }
  
  
  
  
  
  export const LightPink2: Theme = {
    ...LightPink,
    type: 'light',
    name: 'Light Pink 2',
    
    element: {
      ...LightPink.element,
      main: {
        ...LightPink.element.main,
        a: {
          ...LightPink.element.main.a,
          bgc: ['#f95c67']
        },
      },
      input: {
        ...LightPink.element.input,
        aBorder: { bgc: ['#ef7b7d','#fb3570'], content: [] },
        aBorderHover: { bgc: ['#00a8f3'], content: [] },
      },
    },
  }
  
  
  
  
  export const Dark2: Theme = {
    ...Dark,
    type: 'dark',
    name: 'Dark 2',
    
    element: {
      ...Dark.element,
      main: {
        ...Dark.element.main,
        a: {
          ...Dark.element.main.a,
          bgc: ['#d9816f']
        }
      },
      input: {
        ...Dark.element.input,
        aBorder: { bgc: ['#ef7b7d','#fb3570'], content: [] },
        aBorderHover: { bgc: ['#00a8f3'], content: [] },
      },
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


