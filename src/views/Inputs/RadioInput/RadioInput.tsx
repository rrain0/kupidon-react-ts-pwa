/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import { RadioInputStyle } from 'src/views/Inputs/RadioInput/RadioInputStyle'
import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import {ReactUtils} from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import RadioActiveIc = SvgIcons.RadioActiveIc
import Ripple, { RippleProps } from 'src/views/Ripple/Ripple'
import RadioInactiveIc = SvgIcons.RadioInactiveIc
import trueOrUndef = CastUtils.trueOrUndef
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import row = EmotionCommon.row
import El = RadioInputStyle.El
import Attr = RadioInputStyle.Attr
import Prop = RadioInputStyle.Prop
import PartialUndef = TypeUtils.PartialUndef






export type RadioInputProps = JSX.IntrinsicElements['input'] & PartialUndef<{
  hasError: boolean
  startViews: React.ReactNode
  endViews: React.ReactNode
  children: React.ReactNode
  childrenPosition: 'start'|'end'
  rippleMode: RippleProps['mode']
}>

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    rippleMode,
    className, style, ...restProps
  } = props
  childrenPosition ??= 'end'
  rippleMode ??= 'cursor'
  
  
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, ()=>inputRef.current!,[])
  
  
  
  return <Frame
    css={frameStyle}
    className={className}
    style={style}
  >
    
    <Input_ css={input_Style}
      {...{[Attr.errorName]: hasError}}
      aria-checked={restProps.checked}
      role='radio'
      {...restProps}
      data-error={hasError}
      ref={inputRef}
    />
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <ActiveIcWrap css={activeIcWrapStyle}>
      <RadioActiveIc/>
    </ActiveIcWrap>
    <InactiveIcWrap css={inactiveIcWrapStyle}>
      <RadioInactiveIc/>
    </InactiveIcWrap>
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border css={borderStyle}>
      <Ripple
        targetElement={inputRef}
        mode={rippleMode}
      />
    </Border>
    
  </Frame>
})
export default Mem(RadioInput)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,El.frameClassName)
}))``
const frameStyle = css`
  position: relative;
  ${row};
  justify-content: start;
  align-items: center;
  cursor: pointer;
`


type Input_Props = PartialUndef<{
  [Attr.errorName]: boolean
}>
const Input_ = styled.input.attrs<Input_Props>(p=>({
  className: classNames(p.className,El.inputClassName),
  type: 'radio',
  [Attr.errorName]: trueOrUndef(p['data-error'])
}))<Input_Props>``
const input_Style = css`
  ${resetInput};
  ${abs};
  opacity: 0;
  cursor: pointer;
`


const ActiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,El.iconWrapClassName)
}))``
const activeIcWrapStyle = css`
  display: none;
  input:checked ~ & { display: flex; }
  ${SvgIcStyle.El.iconClass} {
    ${SvgIcStyle.Prop.color}: var(${Prop.activeIconColor})
  }
`

const InactiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,El.iconWrapClassName)
}))``
const inactiveIcWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  ${SvgIcStyle.El.iconClass} {
    ${SvgIcStyle.Prop.color}: var(${Prop.inactiveIconColor})
  }
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,El.borderClassName)
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

