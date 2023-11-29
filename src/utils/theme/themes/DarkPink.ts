import styled from '@emotion/styled'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme
import themeIconCss = Themes.themeIconCss



export const DarkPink = {
  type: 'dark',
  name: 'Dark Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: '#d16780',
    bgcColor1: '#18191b',
    bgcColor2: '#18191b',
  })),
  
  containerNormal: {
    bgc:     ['#000000'],
    bgc2:    ['#282c34'],
    content: ['#bdbdbd'],
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
  inputRadio: {
    bgcFocus:  ['#d16780']
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
  
  photos: {
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffffff'],
  },
  
  bottomSheet: {
    bgc:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  card: {
    bgc: ['#00000000'],
  },
  page: {
    bgc:         ['#18191b'],
    bgcGradient: ['#282c34','#282c34','#282c34'],
    content:     ['#bdbdbd','#ffffff'],
  },
  
  statusBar: {
    bgc: ['#984559'],
  },
  nav: {
    bgc: ['#282c34'],
  },
  
  toast: {
    bgc:                  ['#121212'],
    content:              ['#ffffff'],
    content2:             ['#b8b8b8'],
    content3:             ['#ffffff'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: {
    track: ['#F8F8F822'],
    thumb: ['#F8F8F844'],
  },
} satisfies Theme