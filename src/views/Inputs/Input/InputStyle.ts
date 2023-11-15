import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { Themes } from 'src/utils/theme/Themes'
import Theme = Themes.Theme
import onHover = EmotionCommon.onHover
import textLarge1 = EmotionCommon.textLarge1
import textLarge2 = EmotionCommon.textLarge2
import bgcBorderMask = EmotionCommon.bgcBorderMask
import PartialUndef = TypeUtils.PartialUndef
import textSmall2 = EmotionCommon.textSmall2



export namespace InputStyle {
  
  
  export const inputNormal = (t:Theme) => css`
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
      min-height: 50px;
      padding-right: 16px;
      padding-left: 16px;
      ${textLarge2};
      color: ${t.input.text};

      ::placeholder {
        color: ${t.input.placeholder};
      }
      ${onHover(css``)}
      :active, :focus-visible, :focus {}
      &[data-error]{}
      :read-only { }
      :disabled {
        cursor: auto;
        color: ${t.input.text};
      }
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
    >.rrainuiInput:disabled ~ .rrainuiBorder{
      border-color: ${t.input.text};
    }
  `
  /* background-image: linear-gradient(
   to right,
   ${t.input.error.border[0]},
   ${t.input.error.border[0]},
   ${t.input.error.border[0]}
   ); */
  
  
  
  
  
  const small = (t:Theme) => css`
    &.rrainuiFrame {
    }
    >.rrainuiInput {
      width: 100%;
      min-height: 40px;
      padding: 4px 12px;
      ${textLarge1};
    }
    >.rrainuiBorder {
      border-width: 1px;
    }
  `
  
  
  export const inputSmall = (t:Theme) => css`
    ${inputNormal(t)};
    ${small(t)};
  `
  
  
  export const clickable = css`
    >.rrainuiInput {
      :read-only {
        cursor: pointer;
      }
    }
  `
  
  
  export type InputStyleProps = {
    size: 'normal'|'small'
    textSize: 'normal'|'small'|'smaller'
    clickable: boolean
    static: boolean
  }
  export type InputStylePartialProps = PartialUndef<InputStyleProps>
  export const input = (props?:InputStylePartialProps|undefined) =>
  (t:Theme) =>
  css`
    ${props?.clickable && clickable};
    
    ${inputNormal(t)};
    ${{
      'small': small(t),
    }[props?.size??'normal']};
    
    >.rrainuiInput {
      ${{
        'normal': textLarge2,
        'small': textLarge1,
        'smaller': textSmall2,
      }[props?.textSize??'']};
    }
    
    ${props?.static && css`
      &.rrainuiFrame {
        cursor: auto;
        color: ${t.input.text};
      }

      >.rrainuiBorder {
        border-color: ${t.page.text[0]};
      }
    `}
  `
  
  
}