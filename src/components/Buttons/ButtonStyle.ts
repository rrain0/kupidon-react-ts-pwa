import { css } from '@emotion/react'
import { Theme } from 'src/theme/Theme'


export namespace ButtonStyle {
  
  const common = css`
    &.rrainuiButton {
      min-height: 50px;
      word-break: break-word;

      transition: background linear 300ms;

      border-radius: 15px;
      padding: 8px 4px;

      font: 500 18px/150% Roboto;
      letter-spacing: 0.05em;
    }
  `
  
  export const primary = (t: Theme.Theme) => css`
    ${common};
    &.rrainuiButton {
      background: ${t.button.primary.bgc[0]};
      color: ${t.button.primary.text[0]};
      --ripple-color: ${t.button.primary.ripple[0]};

      :active, :focus {}
      :focus-visible {
        background: ${t.button.primary.active[0]};
      }
      @media not (hover: none) { :hover {
          background: ${t.button.primary.hover[0]};
      } }

      :disabled {
        background: ${t.button.primary.disabled.bgc[0]};
        color: ${t.button.primary.disabled.text[0]};
      }
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {}
  `
  
  
  export const secondary = (t: Theme.Theme) => css`
    ${common};
    &.rrainuiButton {
      background: ${t.button.secondary.bgc[0]};
      color: ${t.button.secondary.text[0]};
      --ripple-color: ${t.button.secondary.ripple[0]};

      :focus {}
      :active, :focus-visible {
        background: ${t.button.secondary.active[0]};
      }
      @media not (hover: none) { :hover {
          background: ${t.button.secondary.hover[0]};
      } }

      :disabled {
        background: ${t.button.secondary.disabled.bgc[0]};
        color: ${t.button.secondary.disabled.text[0]};
      }
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {}
  `
  
  
  
  
  
  
  
  
  export const lightCherry = css`
    &.rrainuiButton {
      height: 50px;

      background: #BB2649;
      transition: background linear 300ms;

      border-radius: 15px;

      padding: 8px 4px;

      font: 500 18px/150% Roboto;
      color: #F8F8F8;
      letter-spacing: 0.05em;

      --ripple-color: white;

      :focus {}
      :active, :focus-visible {
        background: #d93b5f;
      }
      @media not (hover: none) {
        :hover {
          background: #d93b5f;
        }
      }

      :disabled {
        background: #DCDCDC;
        color: black;
      }
    }
    &.rrainuiButton[data-error] > .rrainuiBorder {
      //border: 2px solid orange;
    }
  `
  
  
  export const lightPink = css`
    &.rrainuiButton {
      height: 50px;

      background: #f37190;
      transition: background linear 300ms;

      border-radius: 15px;

      padding: 8px 4px;

      font: 500 18px/150% Roboto;
      color: #F8F8F8;
      letter-spacing: 0.05em;

      --ripple-color: white;

      :focus {}
      :active, :focus-visible {
        background: #ff6086;
      }
      @media not (hover: none) {
        :hover {
          background: #ff6086;
        }
      }

      :disabled {
        background: #DCDCDC;
        color: black;
      }
    }
  `
  
  export const grey = css`
    ${lightCherry};
    &.rrainuiButton {
      background: #DCDCDC;
      color: black;

      --ripple-color: black;

      :active, :focus-visible {
        background: #eee;
      }
      @media not (hover: none) {
        :hover {
          background: #eee;
        }
      }
    }
  `
  
  export const simpleWhite = css`
    ${lightCherry};
    &.rrainuiButton {
      background: rgba(252, 252, 252, 0.24);
      border-radius: 0;
      color: black;

      --ripple-color: black;

      :active, :focus-visible {
        background: #eee;
      }
      @media not (hover: none) {
        :hover {
          background: #eee;
        }
      }
    }
    .rrainuiBorder {
      border: none;
    }
  `
  
  export const white = css`
    ${lightCherry};
    &.rrainuiButton {
      background: #F8F8F8;
      color: #8B8B8B;

      --ripple-color: black;

      :active, :focus-visible {
        background: #eee;
      }
      @media not (hover: none) {
        :hover {
          background: #eee;
        }
      }
    }
    .rrainuiBorder {
      border: 1px solid #424041;
    }
  `
  
}