import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme
import onHover = EmotionCommon.onHover



export namespace TextareaStyle {
  
  
  import bgcBorderMask = EmotionCommon.bgcBorderMask
  export const textarea = (t:Theme) => css`


    &.rrainuiFrame {
    }

    >.rrainuiBorder {
      border: 2px solid ${t.page.text[0]};
    }
    
    &.rrainuiFrame {
      border-radius: 15px;
      background: ${t.input.bgc};
      /*& .rrainuiInput[data-error] {
        background: ${t.input.error.bgc};
      }*/
      // todo not supported by firefox
      :has(.rrainuiTextarea[data-error]){
        background: ${t.input.error.bgc};
      }
      :has(.rrainuiTextarea:disabled) {
        cursor: auto;
        color: ${t.input.text};
      }
    }
    >.rrainuiTextarea {
      width: 100%;
      min-height: 150px;
      //height: fit-content;
      //resize: vertical;
      resize: none;
      overflow: hidden;
      padding: 8px 16px;
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
      ${bgcBorderMask};
    }
    ${onHover(css`
      >.rrainuiTextarea:hover ~ .rrainuiBorder {
        background-position: 0 0;
      }
    `)}
    >.rrainuiTextarea:active ~ .rrainuiBorder {}
    >.rrainuiTextarea:focus-visible ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiTextarea:focus ~ .rrainuiBorder {
      background-position: 0 0;
    }
    >.rrainuiTextarea[data-error] ~ .rrainuiBorder{}
    >.rrainuiTextarea:disabled ~ .rrainuiBorder{
      border-color: ${t.input.text};
    }
  `
  
  
  const small = (t:Theme) => css`
    &.rrainuiFrame {
      
      >.rrainuiTextarea {
        width: 100%;
        padding: 8px 12px;
        font-weight: 500;
        font-size: 16px;
        line-height: 129%;
        letter-spacing: 0.05em;
      }
      >.rrainuiBorder {
        border-width: 1px;
      }
    }
  `
  
  
  export const textareaSmall = (t:Theme) => css`
    ${textarea(t)};
    ${small(t)};
  `
}