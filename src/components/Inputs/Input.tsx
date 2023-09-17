import { CastUtils } from 'src/utils/CastUtils'
import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import {StyledCommon} from "src/styles/StyledCommon"
import resetInput = StyledCommon.resetInput
import abs = StyledCommon.abs
import row = StyledCommon.row
import trueOrUndef = CastUtils.trueOrUndef






export type InputProps = JSX.IntrinsicElements['input'] & {
  hasError?: boolean|empty
  startViews?: React.ReactNode
  endViews?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'start'|'end'|empty
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style, ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, ()=>inputRef.current!,[])
  
  
  return <Frame className={className} style={style}>
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <Input_ {...restProps} hasError={hasError} ref={inputRef}/>
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border/>
    
  </Frame>
})
export default ReactMemoTyped(Input)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,'rrainuiFrame')
}))`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`

type Input_Props = {
  hasError?: boolean | empty
}
const Input_ = styled.input.attrs<Input_Props>(p=>({
  className: classNames(p.className,'rrainuiInput'),
  'data-error': trueOrUndef(p.hasError)
}))`
  ${resetInput};
  
  flex: 1;
  height: 100%;
  border-radius: inherit;

  @media not (hover: none) {
    &:hover {
      cursor: text;
    }
  }
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder')
}))`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`