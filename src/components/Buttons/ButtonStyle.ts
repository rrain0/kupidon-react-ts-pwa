import { css } from '@emotion/react';


export namespace ButtonStyle {
  
  
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