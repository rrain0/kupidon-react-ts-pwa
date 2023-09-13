import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import {StyledCommon} from "src/styles/StyledCommon"
import React, { useImperativeHandle, useRef } from "react"
import classNames from "classnames"
import Ripple, { RippleProps } from 'src/components/Ripple/Ripple'
import resetButton = StyledCommon.resetButton
import centerAll = StyledCommon.centerAll
import abs = StyledCommon.abs
import styled from 'styled-components'
import { Utils } from 'src/utils/Utils'
import trueOrUndef = Utils.trueOrUndef
import empty = Utils.empty
import center = StyledCommon.center
import row = StyledCommon.row;


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
  
  
  
  return <Button_
    { ...restProps }
    ref={buttonRef}
    data-error={hasError}
  >
    { children }
    <Border>
      <Ripple
        targetElement={buttonRef}
        mode={rippleMode}
        rippleDuration={rippleDuration}
      />
    </Border>
  </Button_>
})
export default ReactMemoTyped(Button)



type Button_Props = {
  'data-error'?: boolean|empty
}
const Button_ = styled.button.attrs<Button_Props>(p=>({
  className:    classNames(p.className,'rrainuiButton'),
  'data-error': trueOrUndef(p['data-error']),
  type:         p.type || 'button',
}))`
  ${resetButton};
  width: 100%;
  position: relative;
  ${row};
  place-content: center;
  place-items: center;
  
  &:active, &:focus-visible {
    cursor: pointer;
  }
  @media not (hover: none) {  &:hover {
    cursor: pointer;
  } }
  &:disabled {
    cursor: auto;
  }
`



const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder'),
}))<{ 'data-error'?: boolean|undefined }>`
  ${abs};
  place-self: stretch;
  pointer-events: none;
  border-radius: inherit;
`
