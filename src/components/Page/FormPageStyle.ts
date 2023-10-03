import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme


export namespace FormPageStyle {
  
  export const withNavbar = (t:Theme) => css`
    height: calc(100dvh - 50px);
  `
  
  
}