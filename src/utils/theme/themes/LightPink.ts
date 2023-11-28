import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme



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
  scrollbar: {
    track: ['#25283622'],
    thumb: ['#25283644'],
  },
}

