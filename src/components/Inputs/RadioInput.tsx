import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import {Utils} from "src/utils/Utils"
import empty = Utils.empty
import {StyledCommon} from "src/styles/StyledCommon"
import resetInput = StyledCommon.resetInput
import abs = StyledCommon.abs
import row = StyledCommon.row
import trueOrUndef = Utils.trueOrUndef
import resetButton = StyledCommon.resetButton
import { SimpleSvgIcons } from 'src/components/icons/SimpleSvgIcons'
import RadioActiveIc = SimpleSvgIcons.RadioActiveIc
import Ripple, { RippleProps } from 'src/components/Ripple/Ripple'
import RadioInactiveIc = SimpleSvgIcons.RadioInactiveIc






export type RadioInputProps = JSX.IntrinsicElements['input'] & {
  hasError?: boolean|empty
  startViews?: React.ReactNode
  endViews?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'start'|'end'|empty
  rippleMode?: RippleProps['mode']
  rippleDuration?: RippleProps['rippleDuration']
}

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>((
  { ...props}, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    rippleMode, rippleDuration,
    className, style, ...restProps
  } = props
  childrenPosition ??= 'end'
  rippleMode ??= 'cursor'
  rippleDuration ??= 1000
  
  
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, ()=>inputRef.current!,[])
  
  
  
  return <Frame className={className} style={style}>
    
    <Input_
      {...restProps}
      hasError={hasError}
      ref={inputRef}
    />
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <ActiveIcWrap><RadioActiveIc/></ActiveIcWrap>
    <InactiveIcWrap><RadioInactiveIc/></InactiveIcWrap>
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border>
      <Ripple
        targetElement={inputRef}
        mode={rippleMode}
        rippleDuration={rippleDuration}
      />
    </Border>
    
  </Frame>
})
export default ReactMemoTyped(RadioInput)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,'rrainuiFrame')
}))`
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
}))`
  ${resetInput};
  ${abs};
  opacity: 0;
  cursor: pointer;
`


const ActiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiIconWrap')
}))`
  display: none;
  input:checked ~ & { display: flex }
  --icon-color: var(--active-icon-color)
`
const InactiveIcWrap = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiIconWrap')
}))`
  display: flex;
  input:checked ~ & { display: none }
  --icon-color: var(--inactive-icon-color)
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder')
}))`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`

