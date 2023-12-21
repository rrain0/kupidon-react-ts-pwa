/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import React, { useImperativeHandle, useRef } from "react"
import classNames from "classnames"
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import Ripple, { RippleProps } from 'src/views/Ripple/Ripple'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import trueOrUndef = CastUtils.trueOrUndef
import abs = EmotionCommon.abs
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable





export type ButtonCustomProps = PartialUndef<{
  hasError: boolean
  rippleMode: RippleProps['mode']
  rippleDuration: RippleProps['rippleDuration']
}>
export type ButtonForwardRefProps = JSX.IntrinsicElements['button']
export type ButtonRefElement = HTMLButtonElement

export type ButtonProps = ButtonCustomProps & ButtonForwardRefProps
const Button =
React.memo(
React.forwardRef<ButtonRefElement, ButtonProps>(
(props, forwardedRef) => {
  const {
    hasError, className, type,
    rippleMode, rippleDuration,
    children,
    ...restProps
  } = props
  
  const buttonProps = {
    [ButtonStyle.Attr.attr.error]: trueOrUndef(hasError),
    className: classNames(className, ButtonStyle.El.clazz.btn),
    type: type ?? 'button',
    ...restProps
  }
  const borderProps = {
    className: ButtonStyle.El.clazz.border
  }
  const rippleProps = {
    mode: rippleMode ?? 'cursor',
    rippleDuration,
  }
  
  const buttonRef = useRef<ButtonRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>buttonRef.current!,[])
  
  
  
  return <button css={buttonStyle}
    {...buttonProps}
    ref={buttonRef}
  >
    
    { children }
    
    <div css={borderStyle}
      {...borderProps}
    >
      <Ripple
        targetElement={buttonRef}
        {...rippleProps}
      />
    </div>
    
  </button>
}))
export default Button




const buttonStyle = css`
  ${resetButton};
  position: relative;
  ${row};
  place-content: center;
  place-items: center;

  :active, :focus-visible {
    cursor: pointer;
  }
  ${hoverable}{ :hover {
    cursor: pointer;
  } }
  :disabled {
    cursor: auto;
  }
`



const borderStyle = css`
  ${abs};
  place-self: stretch;
  pointer-events: none;
  border-radius: inherit;
`