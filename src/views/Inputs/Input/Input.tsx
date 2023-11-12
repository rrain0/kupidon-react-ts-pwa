/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import styled from "styled-components"
import React, {useImperativeHandle, useRef} from "react"
import { ReactUtils } from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import trueOrUndef = CastUtils.trueOrUndef
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import onHover = EmotionCommon.onHover
import abs = EmotionCommon.abs






export type InputProps = JSX.IntrinsicElements['input'] & {
  hasError?: boolean|empty
  startViews?: React.ReactNode
  endViews?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'start'|'end'|empty
  frameProps?: Omit<JSX.IntrinsicElements['label'],'ref'> | undefined
}

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
  
  
  return <Frame
    css={frameStyle}
    className={className}
    style={style}
    {...frameProps}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <Input_
      css={input_Style}
      {...restProps}
      data-error={hasError}
      ref={inputRef}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default Mem(Input)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,'rrainuiFrame')
}))``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`


type Input_Props = {
  'data-error'?: boolean | empty
}
const Input_ = styled.input.attrs<Input_Props>(p=>({
  className: classNames(p.className,'rrainuiInput'),
  'data-error': trueOrUndef(p['data-error'])
}))<Input_Props>``
const input_Style = css`
  ${resetInput};

  flex: 1;
  height: 100%;
  border-radius: inherit;

  ${onHover(css`
    cursor: text;
  `)}
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder')
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`