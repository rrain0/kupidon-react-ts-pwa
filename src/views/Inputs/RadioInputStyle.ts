import { css } from '@emotion/react';
import { Themes } from 'src/utils/theme/Themes';



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
      .rrainuiInput[data-error] {
        background: ${t.input.error.bgc};
      }
    }
    .rrainuiInput {
      ::placeholder {}
      @media not (hover: none) { :hover {} }
      :active, :focus-visible, :focus {}
      &[data-error]{}
    }
    .rrainuiIconWrap {
      width: 26px;
      height: 26px;
    }
    .rrainuiBorder {}
    @media not (hover: none) { .rrainuiInput:hover ~ .rrainuiBorder {
      background: ${t.input.iconHover[0]};
    } }
    .rrainuiInput:active ~ .rrainuiBorder {
      //background: ${t.input.iconHover[0]};
    }
    .rrainuiInput:focus-visible ~ .rrainuiBorder {
      background: ${t.input.iconHover[0]};
    }
    .rrainuiInput:focus ~ .rrainuiBorder {}
    .rrainuiInput[data-error] ~ .rrainuiBorder{}
  `
  
  
  
  
  
}