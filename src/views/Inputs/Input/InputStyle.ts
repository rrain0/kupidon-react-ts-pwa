import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme



export namespace InputStyle {
  
  import onHover = EmotionCommon.onHover
  export const input = (t:Theme) => css`
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
      font-weight: 500;
      font-size: 18px;
      line-height: 150%;
      letter-spacing: 0.05em;
      color: ${t.input.text};

      ::placeholder {
        color: ${t.input.placeholder};
      }
      ${onHover(css``)}
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

    ${onHover(css`
      >.rrainuiInput:hover ~ .rrainuiBorder {
        background-position: 0 0;
      }
    `)}
    >.rrainuiInput:active ~ .rrainuiBorder {}
    >.rrainuiInput:focus-visible ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiInput:focus ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiInput[data-error] ~ .rrainuiBorder{
    
    }
  `
  /* background-image: linear-gradient(
   to right,
   ${t.input.error.border[0]},
   ${t.input.error.border[0]},
   ${t.input.error.border[0]}
   ); */
  
}