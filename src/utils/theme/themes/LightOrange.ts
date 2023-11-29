import styled from '@emotion/styled'
import { Themes } from 'src/utils/theme/Themes'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import Theme = Themes.Theme
import themeIconCss = Themes.themeIconCss




export const LightOrange: Theme = {
  ...LightPink,
  name: 'Light Orange' as const,
  icon: styled.div(themeIconCss({
    accentColor: '#fbb027',
    bgcColor1: '#f5f5f5',
    bgcColor2: '#f5f5f5',
  })),
  
  containerAccent: { ...LightPink.containerAccent,
    bgc:     ['#fdca6d'],
  },
  
  buttonMain: { ...LightPink.buttonMain,
    bgc: ['#ff935e'],
    bgcFocus: ['#ff802a'],
  },
  buttonAccent: { ...LightPink.buttonAccent,
    bgc:       ['#fbb027'],
    bgcFocus:  ['#ffb833'],
  },
  inputRadio: { ...LightPink.inputRadio,
    bgcFocus:  ['#ffb833'],
  },
  buttonNav: { ...LightPink.buttonNav,
    bgcFocus:      ['#ffffff'],
    contentAccent: ['#ff802a'],
  },
  
  input: { ...LightPink.input,
    border:      ['#ef7b7d','#ef7b7d'],
    borderHover: ['#00a8f3'],
  },
  
  bottomSheet: { ...LightPink.bottomSheet,
    handle: ['#ff935e'],
  },
  
  statusBar: { ...LightPink.statusBar,
    bgc: ['#ffdb99'],
  },
  nav: { ...LightPink.nav,
    bgc: ['#ffdb99'],
  },
} satisfies Theme
