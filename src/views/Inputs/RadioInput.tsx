/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/CastUtils'
import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import RadioActiveIc = SimpleSvgIcons.RadioActiveIc
import Ripple, { RippleProps } from 'src/views/Ripple/Ripple'
import RadioInactiveIc = SimpleSvgIcons.RadioInactiveIc
import trueOrUndef = CastUtils.trueOrUndef
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import resetButton = EmotionCommon.resetButton
import row = EmotionCommon.row






export type RadioInputProps = JSX.IntrinsicElements['input'] & {
  hasError?: boolean|empty
  startViews?: React.ReactNode
  endViews?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'start'|'end'|empty
  rippleMode?: RippleProps['mode']
}

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>((
  { ...props}, forwardedRef
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
    
    <Input_
      css={input_Style}
      {...restProps}
      hasError={hasError}
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
export default ReactMemoTyped(RadioInput)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,'rrainuiFrame')
}))``
const frameStyle = css`
  ${resetButton};
  position: relative;
  ${row};
  justify-content: start;
  align-items: center;
  cursor: pointer;
`


type Input_Props = {
  hasError?: boolean | empty
}
const Input_ = styled.input.attrs<Input_Props>(p=>({
  className: classNames(p.className,'rrainuiInput'),
  type: 'radio',
  'data-error': trueOrUndef(p.hasError)
}))``
const input_Style = css`
  ${resetInput};
  ${abs};
  opacity: 0;
  cursor: pointer;
`


const ActiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiIconWrap')
}))``
const activeIcWrapStyle = css`
  display: none;
  input:checked ~ & { display: flex; }
  .rrainuiIcon {
    --icon-color: var(--active-icon-color)
  }
`

const InactiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiIconWrap')
}))``
const inactiveIcWrapStyle = css`
  display: flex;
  input:checked ~ & { display: none }
  .rrainuiIcon {
    --icon-color: var(--inactive-icon-color)
  }
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder')
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

