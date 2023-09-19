

export namespace Themes {
  
  export type ThemeType = 'light'|'dark'
  export interface Theme {
    type: ThemeType
    name: string
    
    page: {
      bgc: string[]
      bgc2: string[]
      bgc3: string[]
      bgcPinkGradients: string[]
      text: string[]
    }
    nav: {
      bgc: string[]
    }
    button: {
      primary: {
        bgc: string[]
        text: string[]
        ripple: string[]
        active: string[]
        hover: string[]
        disabled: {
          bgc: string[]
          text: string[]
        }
      }
      secondary: {
        bgc: string[]
        text: string[]
        ripple: string[]
        active: string[]
        hover: string[]
        disabled: {
          bgc: string[]
          text: string[]
        }
      }
    }
    input: {
      bgc: string[]
      text: string[]
      ripple: string[]
      iconActive: string[]
      iconHover: string[]
      placeholder: string[]
      border: string[]
      error: {
        bgc: string[]
      }
    }
    scrollbar: {
      track: string[]
      thumb: string[]
    }
    icon: {
      warning: {
        bgc: string[]
        color: string[]
      }
    }
  }
  
  
  export const LightPink: Theme = {
    type: 'light',
    name: 'Light Pink',
    
    page: {
      bgc: ['#ffaeba','#f0f0f0'],
      bgc2: ['#ffb6c1','#f5f5f5','#d8701a'],
      bgc3: ['#fff','#8b8b8b'],
      bgcPinkGradients: [
        '#f39aba','#dfc0d2','#e3d8f6',
        '#dfa4b8','#ee4723','#dd8499',
        '#e35d4d','#e5bed3','#ed4d2b'
      ],
      text: ['#000'],
    },
    
    nav: {
      bgc: ['#f6d6db'] //#e8809a
    },
    
    button: {
      primary: {
        bgc: ['#BB2649'],
        text: ['#F8F8F8'],
        ripple: ['#fff'],
        active: ['#d93b5f'],
        hover: ['#d93b5f'],
        disabled: {
          bgc: ['#DCDCDC'],
          text: ['#555']
        }
      },
      secondary: {
        bgc: ['#f37190'],
        text: ['#F8F8F8'],
        ripple: ['#fff'],
        active: ['#ff6086'],
        hover: ['#ff6086'],
        disabled: {
          bgc: ['#DCDCDC'],
          text: ['#555']
        }
      }
    },
    
    input: {
      bgc: ['#F8F8F8'],
      text: ['#000'],
      ripple: ['#0008'],
      iconActive: ['#00000011'],
      iconHover: ['#00000011'],
      placeholder: ['#777777'],
      border: ['#00a8f3', '#9c20aa', '#fb3570'],
      error: {
        bgc: ['#ffced2']
      }
    },
    
    scrollbar: {
      track: ['#25283622'],
      thumb: ['#25283644'],
    },
    
    icon: {
      warning: {
        bgc: ['#000000'],
        color: ['#fff200'],
      }
    },
  }
  
  
  export const Dark: Theme = {
    type: 'dark',
    name: 'Dark',
    
    page: {
      bgc: ['#992c46','#282c34'],
      bgc2: ['#992c46','#282c34','#994500'],
      bgc3: ['#121212','#8b8b8b'],
      bgcPinkGradients: [
        '#f39aba','#dfc0d2','#e3d8f6',
        '#dfa4b8','#ee4723','#dd8499',
        '#e35d4d','#e5bed3','#ed4d2b'
      ],
      //@ts-ignore
      bgcPinkGradients: [
        '#992c46','#bc8245','#992c46',
        '#bb8396','#992c46','#975492',
        '#992c46','#3e5175','#992c46'
      ],
      //@ts-ignore
      bgcPinkGradients: [
        '#992c46','#282c34','#992c46',
        '#282c34','#992c46','#282c34',
        '#992c46','#282c34','#992c46'
      ],
      //@ts-ignore
      bgcPinkGradients: [
        '#992c46','#bc8245','#992c46',
        '#282c34','#992c46','#282c34',
        '#992c46','#282c34','#992c46'
      ],
      text: ['#bdbdbd'],
    },
    
    nav: {
      bgc: ['#872c43'] // #b06772
    },
    
    button: {
      primary: {
        bgc: ['#971f3b'],
        text: ['#bdbdbd'],
        ripple: ['#000'],
        active: ['#c6294e'],
        hover: ['#c6294e'],
        disabled: {
          bgc: ['#DCDCDC'],
          text: ['#555']
        }
      },
      secondary: {
        bgc: ['#d16780'],
        text: ['#cdcdcd'],
        ripple: ['#000'],
        active: ['#ee7894'],
        hover: ['#ee7894'],
        disabled: {
          bgc: ['#DCDCDC'],
          text: ['#555'],
        }
      }
    },
    
    input: {
      bgc: ['#282c34'],
      text: ['#bdbdbd'],
      ripple: ['#fff8'],
      iconActive: ['#fff2'],
      iconHover: ['#fff2'],
      placeholder: ['#7b7b7b'],
      border: ['#00a8f3', '#9c20aa', '#fb3570'],
      error: {
        bgc: ['#5e252c']
      }
    },
    
    scrollbar: {
      track: ['#F8F8F822'],
      thumb: ['#F8F8F844'],
    },
    
    icon: {
      warning: {
        bgc: ['#d0cb5d'],
        color: ['#000000'],
      }
    },
  }
  
  
  
  export const LightPink2: Theme = {
    ...LightPink,
    type: 'light',
    name: 'Light Pink 2',
    
    input: {
      ...LightPink.input,
      border: ['#00a8f3', '#ef7b7d', '#fb3570'],
    },
    
    button: {
      ...LightPink.button,
      primary: {
        ...LightPink.button.primary,
        bgc: ['#f95c67'],
      }
    }
    
  }
  
  
  
  
  export const Dark2: Theme = {
    ...Dark,
    type: 'dark',
    name: 'Dark 2',
    
    input: {
      ...Dark.input,
      border: ['#00a8f3', '#ef7b7d', '#fb3570'],
    },
    
    button: {
      ...Dark.button,
      primary: {
        ...Dark.button.primary,
        bgc: ['#d9816f'],
      },
    },
  }
  
  
  
  
  export const allThemes = [
    LightPink, Dark,
    LightPink2, Dark2,
  ] as const
  export const themeByName = (themeName: string)=>{
    return allThemes.find(t=>t.name===themeName)
  }
  
  
  export const defaultLight = LightPink.name
  export const defaultDark = Dark.name
  export const defaultTheme: ThemeType = 'light'
  
}


