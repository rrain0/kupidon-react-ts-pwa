import styled from '@emotion/styled'
import { Themes } from 'src/utils/theme/Themes'
import { LightPink } from 'src/utils/theme/themes/LightPink'
import Theme = Themes.Theme
import themeIconCss = Themes.themeIconCss



export const LightPinkGradient = {
  ...LightPink,
  name: 'Light Pink Gradient' as const,
  icon: styled.div(themeIconCss({
    accentColor: '#ff8ea9',
    bgcColor1: '#ffaeba',
    bgcColor2: '#f0f0f0',
  })),
  
  page: {
    ...LightPink.page,
    bgcGradient: ['#ffaeba','#f0f0f0','#f0f0f0'],
    //bgc: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  inputRadio: {
    ...LightPink.buttonMain,
    bgcFocus:  ['#f37190'],
  },
  card: {
    ...LightPink.card,
    bgc: ['#f5f5f577'],
  },
  statusBar: {
    ...LightPink.statusBar,
    bgc: ['#ffaeba'],
  },
  nav: {
    ...LightPink.nav,
    bgc: ['#f6d6db'],
  }
} satisfies Theme
