/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Themes } from 'src/utils/theme/Themes'
import { LightSimpe } from 'src/utils/theme/themes/LightSimple'
import Theme = Themes.Theme
import themeIconCss = Themes.themeIconCss




export const LightPink = {
  ...LightSimpe,
  type: 'light',
  name: 'Light Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: '#ff8ea9',
    bgcColor1:   '#f5f5f5',
    bgcColor2:   '#f5f5f5',
  })),
  
  containerNormal: { ...LightSimpe.containerNormal,
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...LightSimpe.containerAccent,
    bgc:     ['#ffaeba'],
    content: ['#000000'],
  },
  
  buttonMain: { ...LightSimpe.buttonMain,
    bgc:      ['#BB2649'],
    bgcFocus: ['#d93b5f'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: { ...LightSimpe.buttonAccent,
    bgc:       ['#ff8ea9'],
    bgcFocus:  ['#f17492'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  inputRadio: { ...LightSimpe.inputRadio,
    bgcFocus:  ['#f37190']
  },
  buttonTransparent: { ...LightSimpe.buttonTransparent,
    bgcFocus: ['#00000011'],
  },
  buttonNav: { ...LightSimpe.buttonNav,
    bgcFocus:      ['#ffeaee'],
    content:       ['#333333'],
    contentAccent: ['#BB2649'],
  },
  
  input: { ...LightSimpe.input,
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#fb3570','#fb3570'],
    borderHover:   ['#9c20aa'],
    bgcError:      ['#ffced2'],
  },
  
  elementDisabled: { ...LightSimpe.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...LightSimpe.elementDanger,
    bgc:      ['#de4f48'],
    bgcFocus: ['#e74c3c'],
    content:  ['#ffffff'],
  },
  
  ripple: { ...LightSimpe.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: { ...LightSimpe.photos,
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#000000'],
  },
  
  bottomSheet: { ...LightSimpe.bottomSheet,
    bgc:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  card: { ...LightSimpe.card,
    bgc: ['#ffffff00'],
  },
  page: { ...LightSimpe.page,
    bgc:         ['#f5f5f5'],
    bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content:     ['#000000'],
  },
  
  statusBar: { ...LightSimpe.statusBar,
    bgc: ['#ffffff'],
  },
  nav: { ...LightSimpe.nav,
    bgc: ['#ffffff'],
  },
  
  toast: { ...LightSimpe.toast,
    bgc:                  ['#ffffff'],
    content:              ['#757575'],
    content2:             ['#b2b2b2'],
    content3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...LightSimpe.scrollbar,
    track: ['#25283622'],
    thumb: ['#25283644'],
  },
} satisfies Theme

