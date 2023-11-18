/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { InputStyle } from 'src/views/Inputs/Input/InputStyle'
import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import { ReactUtils } from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import trueOrUndef = CastUtils.trueOrUndef
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable



const Attr = InputStyle.Attr


export type InputProps = JSX.IntrinsicElements['input']
  & PartialUndef<{
    hasError: boolean
    startViews: React.ReactNode
    endViews: React.ReactNode
    children: React.ReactNode
    childrenPosition: 'start'|'end'
    frameProps: Omit<JSX.IntrinsicElements['label'],'ref'>
  }>

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style,
    frameProps,
    ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, ()=>inputRef.current!,[])
  
  
  return <Frame css={frameStyle}
    className={className}
    style={style}
    {...frameProps}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <Input_ css={input_Style}
      {...{[Attr.errorName]: hasError}}
      {...restProps}
      ref={inputRef}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default Mem(Input)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,InputStyle.El.frameClassName)
}))``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`


type Input_Props = PartialUndef<{
  [Attr.errorName]: boolean
}>
const Input_ = styled.input.attrs<Input_Props>(p=>({
  className: classNames(p.className,InputStyle.El.inputClassName),
  [Attr.errorName]: trueOrUndef(p[Attr.errorName]),
}))<Input_Props>``
const input_Style = css`
  ${resetInput};

  flex: 1;
  height: 100%;
  border-radius: inherit;

  ${hoverable}{ :hover {
    cursor: text;
  } }
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,InputStyle.El.borderClassName)
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`