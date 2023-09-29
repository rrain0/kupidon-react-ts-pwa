import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'
import Theme = Themes.Theme


export namespace ScrollbarOverlayStyle {
  
  export const page = (t:Theme) => css`
    &.rrainuiScrollbarOverflow {
      padding: 1px;

      >.rrainuiScrollbarTrack[data-direction=vertical] {
        width: 7px;
      }

      >.rrainuiScrollbarTrack[data-direction=horizontal] {
        height: 7px;
      }
  `
  
}