import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import {StyledCommon} from "src/styles/StyledCommon"
import React, { useImperativeHandle, useRef } from "react"
import classNames from "classnames"
import Ripple, { RippleProps, RippleRef } from 'src/components/Ripple/Ripple'
import resetButton = StyledCommon.resetButton
import centerAll = StyledCommon.centerAll
import abs = StyledCommon.abs
import styled from 'styled-components'
import { Utils } from 'src/utils/Utils'
import trueOrUndef = Utils.trueOrUndef
import empty = Utils.empty
import center = StyledCommon.center


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
  
  const rippleRef = useRef<RippleRef>(null)
  
  
  return <Button_ { ...restProps } ref={buttonRef} data-error={hasError}
    onPointerDown={ev=>{
      rippleRef.current?.showRipple(ev)
      //ev.currentTarget.setPointerCapture(ev.pointerId) // prevents pointer lost when outside a view
      restProps.onPointerDown?.(ev)
    }}
    onPointerUp={ev=>{
      rippleRef.current?.hideRipple()
      restProps.onPointerUp?.(ev)
    }}
    // 'out' is 'leave' + 'cancel'
    onPointerOut={ev=>{
      rippleRef.current?.hideRipple()
      restProps.onPointerOut?.(ev)
    }}
  >
    <Border>
      <Ripple
        ref={rippleRef}
        mode={rippleMode}
        rippleDuration={rippleDuration}
      />
    </Border>
    { children }
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
  ${center};
  
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
  /*${abs};*/
  place-self: stretch;
  pointer-events: none;
  border-radius: inherit;
`
