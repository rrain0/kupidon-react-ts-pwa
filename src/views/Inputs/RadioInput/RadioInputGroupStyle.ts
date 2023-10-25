import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/utils/theme/Themes'
import onHover = EmotionCommon.onHover
import rowWrap = EmotionCommon.rowWrap



export namespace RadioInputGroupStyle {
  
  
  
  export const style = (t: Themes.Theme) => css`
    &.rrainuiRadioGroup {
      min-height: 50px;
      width: 100%;
      ${rowWrap};
      gap: 4px 32px;
      justify-content: start;
      align-items: center;
      border-radius: 15px;
      
      &[data-error] {
        background: ${t.input.error.bgc[0]};
      }

      


      .rrainuiBorder {}
      ${onHover(css` >.rrainuiBorder {  }`)}
      &[data-error] >.rrainuiBorder{
        border: 2px solid ${t.input.error.border[0]};
      }
      
    }

    


  `
  
  
  
}