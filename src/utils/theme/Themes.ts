import { Colors2 } from 'src/utils/theme/Colors'


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
  
  
  export interface Theme {
    type: ThemeType
    name: string
    
    // окружение
    ambience: {
      // [0]: contrast bgc / ripple
      // [1]: main bgc
      bgc: string[],
      // [0]: secondary bgc
      bgc2: string[],
    }
    element: {
      primary?: {
        bgc: string[]
        text: string[]
      }
      normal: {
        // [0]: usual bgc
        // [1]: active / hover bgc
        bgc: string[]
        text: string[]
        text2: string[]
      }
      secondary?: {
        bgc: string[]
        text: string[]
      }
      disabled: {
        bgc: string[]
        text: string[]
      }
      danger: {
        bgc: string[]
        text: string[]
      }
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
      bgcPinkGradients: string[]
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
        border: string[]
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
    
    ambience: {
      bgc: ['#ffffff','#f0f0f0'],
      bgc2: ['#ffaeba'],
    },
    element: {
      normal: {
        bgc: ['#f37190','#ffa4ba'],
        text: ['#F8F8F8'],
        text2: ['#000000'],
      },
      disabled: {
        bgc: ['#DCDCDC'],
        text: ['#555']
      },
      danger: {
        bgc: ['#ef3c34','#ff5047'],
        text: ['#F8F8F8'],
      }
    },
    
    toast:{
      normal: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastNormalBgc],
      },
      loading: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastLoadingBgc, Colors2.toastLoadingBgcAccent],
      },
      info: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastInfoBgc],
      },
      ok: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastOkBgc],
      },
      warn: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastWarnBgc],
      },
      danger: {
        bgc: [Colors2.toastLightBgc],
        content: [Colors2.toastLightContent, Colors2.toastLightContent2, Colors2.toastLightContent3],
        accent: [Colors2.toastDangerBgc],
      },
    },
    
    page: {
      //bgc: ['#ffaeba','#f0f0f0','#ffb6c1'],
      bgc: ['#f5f5f5','#f5f5f5'],
      bgc2: ['#ffb6c1','#f5f5f5','#d8701a'],
      bgc3: ['#fff','#8b8b8b'],
      bgcPinkGradients: [
        '#f39aba','#dfc0d2','#e3d8f6',
        '#dfa4b8','#ee4723','#dd8499',
        '#e35d4d','#e5bed3','#ed4d2b'
      ],
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
        text: ['#333'],
        ripple: ['#fff'],
        active: ['#fabfc9'],
        hover: ['#fabfc9'],
        selected: {
          text: ['#BB2649'],
        },
      },
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
      //border: ['#00a8f3', '#9c20aa', '#fb3570'],
      border: ['#9c20aa', '#fb3570', '#fb3570'],
      error: {
        bgc: ['#ffced2'],
        border: ['#ff0000'],
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
    
    ambience: {
      bgc: ['#000000','#282c34'],
      bgc2: ['#992c46'],
    },
    element: {
      normal: {
        bgc: ['#d16780','#e58ea2'],
        text: ['#cdcdcd'],
        text2: ['#000000'],
      },
      disabled: {
        bgc: ['#DCDCDC'],
        text: ['#555']
      },
      danger: {
        bgc: ['#ac2c26','#c43730'],
        text: ['#bdbdbd'],
      }
    },
    
    toast:{
      normal: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastNormalBgc],
      },
      loading: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastLoadingBgc, Colors2.toastLoadingBgcAccent],
      },
      info: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastInfoBgc],
      },
      ok: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastOkBgc],
      },
      warn: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastWarnBgc],
      },
      danger: {
        bgc: [Colors2.toastDarkBgc],
        content: [Colors2.toastDarkContent, Colors2.toastDarkContent2, Colors2.toastDarkContent3],
        accent: [Colors2.toastDangerBgc],
      },
    },
    
    page: {
      //bgc: ['#992c46','#282c34','#992c46'],
      //bgc: ['#1d1e22','#1d1e22','#992c46'],
      bgc: ['#18191b','#18191b'],
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
      //border: ['#00a8f3', '#9c20aa', '#fb3570'],
      border: ['#2393c6', '#b32e56', '#b32e56'],
      error: {
        bgc: ['#5e252c'],
        border: ['#cc221f'],
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
    return allThemes.find(t=>t.name===themeName) ?? LightPink
  }
  
  
  export const defaultLight = LightPink.name
  export const defaultDark = Dark.name
  
}


