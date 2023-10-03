import { css } from '@emotion/react'
import { Themes } from 'src/utils/theme/Themes'



export namespace ScrollbarStyle {
  
  
  export const scrollbar = (t: Themes.Theme) => css`
    &.rrainuiScrollbarTrack {
      border-radius: 15px;
      background: ${t.scrollbar.track};
      //background: #F8F8F8;
      //opacity: 0.35;
      &[data-direction=vertical]{ width: 16px; height: 100%; }
      &[data-direction=horizontal]{ width: 100%; height: 16px; }
      
      >.rrainuiScrollbarThumbBox {
        //padding: 1px 2px;
        
        >.rrainuiScrollbarThumb {
          border-radius: 27px;
          background: ${t.scrollbar.thumb};
          //opacity: 0.5;
          //background: #F8F8F8;
        }
      }
    }
  `
  
  
}