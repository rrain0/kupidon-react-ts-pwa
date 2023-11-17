/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { ReactUtils } from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import React, { useImperativeHandle, useRef } from "react"
import classNames from "classnames"
import Ripple, { RippleProps } from 'src/views/Ripple/Ripple'
import styled from 'styled-components'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import trueOrUndef = CastUtils.trueOrUndef
import abs = EmotionCommon.abs
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import onHover = EmotionCommon.onHover




export type ButtonLightCherryProps = JSX.IntrinsicElements['button'] & {
  hasError?: boolean|empty
  rippleMode?: RippleProps['mode']
  rippleDuration?: RippleProps['rippleDuration']
}

const Button = React.forwardRef<HTMLButtonElement, ButtonLightCherryProps>((
  props, forwardedRef
) => {
  let { hasError, children, rippleMode, rippleDuration, ...restProps } = props
  rippleMode ??= 'cursor'
  
  const buttonRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(forwardedRef, ()=>buttonRef.current!,[])
  
  
  
  return <Button_ css={button_Style}
    { ...restProps }
    ref={buttonRef}
    data-error={hasError}
  >
    { children }
    <Border css={borderStyle}>
      <Ripple
        targetElement={buttonRef}
        mode={rippleMode}
        rippleDuration={rippleDuration}
        css={css`
          .rrainuiButton:disabled>*>&.rrainuiRippleFrame {
            display: none;
          }
        `}
      />
    </Border>
  </Button_>
})
export default Mem(Button)



type Button_Props = {
  'data-error'?: boolean|empty
}
const Button_ = styled.button.attrs<Button_Props>(p=>({
  className:    classNames(p.className,'rrainuiButton'),
  'data-error': trueOrUndef(p['data-error']),
  type:         p.type || 'button',
}))<Button_Props>``
const button_Style = css`
  ${resetButton};
  position: relative;
  ${row};
  place-content: center;
  place-items: center;

  :active, :focus-visible {
    cursor: pointer;
  }
  ${onHover(css`
    cursor: pointer;
  `)}
  :disabled {
    cursor: auto;
  }
`



const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder'),
}))``
const borderStyle = css`
  ${abs};
  place-self: stretch;
  pointer-events: none;
  border-radius: inherit;
`