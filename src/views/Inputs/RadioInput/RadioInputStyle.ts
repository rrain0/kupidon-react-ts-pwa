import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/utils/theme/Themes'
import onHover = EmotionCommon.onHover



export namespace RadioInputStyle {
  
  
  
  export const radio = (t: Themes.Theme) => css`
    &.rrainuiFrame {
      --active-icon-color: ${t.button.primary.bgc}
      --inactive-icon-color: ${t.button.primary.bgc}
      
      border-radius: 15px;
      padding: 8px 6px;
      gap: 8px;

      --ripple-color: ${t.input.ripple[0]};
      
      font: 500 18px/150% Roboto;
      letter-spacing: 0.05em;
      color: ${t.page.text[0]};
      --color: ${t.page.text[0]};
    }

    
    .rrainuiIconWrap {
      width: 26px;
      height: 26px;
    }

    
    .rrainuiBorder {}
    .rrainuiInput {${onHover(css` ~.rrainuiBorder {
       background: ${t.input.iconHover[0]};
    }`)}}
    .rrainuiInput:active ~ .rrainuiBorder {}
    .rrainuiInput:focus-visible ~ .rrainuiBorder {
      background: ${t.input.iconHover[0]};
    }
    .rrainuiInput:focus ~ .rrainuiBorder {}
    .rrainuiInput[data-error] ~ .rrainuiBorder{}


  `
  
  
  
}