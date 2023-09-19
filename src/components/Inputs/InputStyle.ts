import { css } from '@emotion/react'
import { Themes } from 'src/theme/Themes'



export namespace InputStyle {
  
  export const input = (t: Themes.Theme) => css`
    &.rrainuiFrame {
      border-radius: 15px;
      background: ${t.input.bgc};
      /*& .rrainuiInput[data-error] {
        background: ${t.input.error.bgc};
      }*/
      // todo not supported by firefox
      :has(.rrainuiInput[data-error]){
        background: ${t.input.error.bgc};
      }
    }
    >.rrainuiInput {
      width: 100%;
      height: 50px;
      padding-right: 16px;
      padding-left: 16px;
      font: 500 18px/150% Roboto;
      letter-spacing: 0.05em;
      color: ${t.input.text};

      ::placeholder {
        color: ${t.input.placeholder};
      }
      @media not (hover: none) { :hover {} }
      :active, :focus-visible, :focus {}
      &[data-error]{}
    }
    
    >.rrainuiBorder {
      border: 2px solid transparent;
      background-image: linear-gradient(
        to right,
        ${t.input.border[0]},
        ${t.input.border[1]},
        ${t.input.border[2]}
      );
      background-origin: border-box;
      background-size: 200% 100%;
      background-position: 100% 0;
      transition: background-position 0.8s ease-out;
      -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0) border-box;
      mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0) border-box;

      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    @media not (hover: none) { >.rrainuiInput:hover ~ .rrainuiBorder {
        background-position: 0 0;
    } }
    >.rrainuiInput:active ~ .rrainuiBorder {}
    >.rrainuiInput:focus-visible ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiInput:focus ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiInput[data-error] ~ .rrainuiBorder{}
  `
  
  
}