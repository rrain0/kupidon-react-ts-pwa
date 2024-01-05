import { css } from '@emotion/react'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Theme = AppTheme.Theme




export namespace ScrollbarsOverlayStyle {
  
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