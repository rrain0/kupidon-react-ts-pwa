import { css } from '@emotion/react';



export namespace InputStyle {
  
  
  export const input = css`
    &.rrainuiFrame {
      height: 59px;
      border-radius: 8px;
      background: #F8F8F8;
    }
    .rrainuiInput {
      padding-right: 16px;
      padding-left: 16px;
      font: 500 18px/150% Roboto;
      letter-spacing: 0.05em;
      color: black;

      ::placeholder {
        color: #8B8B8B;
      }

      @media not (hover: none) {
        :hover {}
      }
      :active, :focus-visible, :focus {}
      &[data-error]{}
    }
    
    .rrainuiBorder {
      border: 1px solid #8B8B8B;
    }
    @media not (hover: none) {
      .rrainuiInput:hover ~ .rrainuiBorder {}
    }
    .rrainuiInput:active ~ .rrainuiBorder {}
    .rrainuiInput:focus-visible ~ .rrainuiBorder {
      border: 2px solid #8B8B8B;
    }
    .rrainuiInput:focus ~ .rrainuiBorder {
      border: 2px solid #8B8B8B;
    }
    .rrainuiInput[data-error] ~ .rrainuiBorder{
      border: 2px solid #ff8787;
    }
  `
  
  
  export const gradientBorder = css`
    &.rrainuiFrame {
      height: 50px;
      border-radius: 15px;
      background: #F8F8F8;
      input[data-error] {
        background: #ffced2;
      }
    }
    .rrainuiInput {
      padding-right: 16px;
      padding-left: 16px;
      font: 500 18px/150% Roboto;
      letter-spacing: 0.05em;
      color: black;

      ::placeholder {
        color: #8B8B8B;
      }
      @media not (hover: none) {
        :hover {}
      }
      :active, :focus-visible, :focus {}
      &[data-error]{}
    }
    
    .rrainuiBorder {
      border: 2px solid transparent;
      //background: linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%) border-box;
      background: linear-gradient(to right, /*#3f48cc*/ #00a8f3, #9c20aa, #fb3570) border-box;
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
    @media not (hover: none) {
      .rrainuiInput:hover ~ .rrainuiBorder {
        background-position: 0 0;
      }
    }
    .rrainuiInput:active ~ .rrainuiBorder {}
    .rrainuiInput:focus-visible ~ .rrainuiBorder {
      background-position: 0 0;
    }
    .rrainuiInput:focus ~ .rrainuiBorder {
      background-position: 0 0;
    }
    .rrainuiInput[data-error] ~ .rrainuiBorder{}
  `
  

}