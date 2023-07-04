

export namespace Theme {
  
  export interface Theme {
    type: 'light'|'dark'
    name: string
    
    page: {
      bgc: string[]
      text: string[]
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
    },
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
  }
  
  
  export const LightPink: Theme = {
    type: 'light',
    name: 'Light Pink',
    
    page: {
      bgc: ['#ffb6c1',/*whitesmoke*/'#f5f5f5'],
      text: ['#000'],
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
          text: ['#000']
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
          text: ['#000']
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
    }
  }
  
  
  export const Dark: Theme = {
    type: 'dark',
    name: 'Dark',
    page: {
      bgc: ['#992c46','#282c34'],
      text: ['#bdbdbd'],
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
          text: ['#000']
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
          text: ['#000']
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
    }
  }
  
  
  
  export const themeFromName = {
    'Light Pink': LightPink,
    'Dark': Dark,
  }
  
  
  export const defaultLight = 'Light Pink'
  export const defaultDark = 'Dark'
  export const defaultTheme: Theme['type'] = 'light'
  
}


