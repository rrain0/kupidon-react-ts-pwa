/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { ElementProps } from 'src/utils/common/GetDimensions'
import styled from "styled-components"
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { ReactUtils } from "src/utils/common/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import empty = TypeUtils.empty
import trueOrUndef = CastUtils.trueOrUndef
import row = EmotionCommon.row
import resetInput = EmotionCommon.resetInput
import onHover = EmotionCommon.onHover
import abs = EmotionCommon.abs
import resetTextarea = EmotionCommon.resetTextarea
import center = EmotionCommon.center






export type InputProps = JSX.IntrinsicElements['textarea'] & {
  hasError?: boolean|empty
  startViews?: React.ReactNode
  endViews?: React.ReactNode
  children?: React.ReactNode
  childrenPosition?: 'start'|'end'|empty
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    startViews, endViews, children, childrenPosition,
    className, style, ...restProps
  } = props
  childrenPosition ??= 'end'
  
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(forwardedRef, ()=>textareaRef.current!,[])
  
  
  useLayoutEffect(()=>{
    const textarea = textareaRef.current
    if (textarea){
      //textarea.
    }
  },)
  
  
  const [value,setValue] = useState('')
  const updateValue = (ev: React.ChangeEvent<HTMLTextAreaElement>)=>{
    // there is no text node if textarea has no text
    /* const textNode = ev.currentTarget.childNodes[0]
    if (textNode){
      const range = document.createRange()
      range.selectNodeContents(textNode)
      const rects = range.getBoundingClientRect()
      console.log('text node rect',rects)
    } */
    setValue(ev.currentTarget.value)
  }
  
  
  
  return <Frame
    css={frameStyle}
    className={className}
    style={style}
  >
    
    { startViews }
    { childrenPosition==='start' && children }
    
    <Textarea_
      css={textarea_Style}
      {...restProps}
      data-error={hasError}
      ref={textareaRef}
      
      onScroll={ev=>textareaFitText(ev.currentTarget)}
      value={value}
      onChange={updateValue}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default ReactMemoTyped(Textarea)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,'rrainuiFrame')
}))``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`


type Textarea_Props = {
  'data-error'?: boolean | empty
}
const Textarea_ = styled.textarea.attrs<Textarea_Props>(p=>({
  className: classNames(p.className,'rrainuiTextarea'),
  'data-error': trueOrUndef(p['data-error'])
}))<Textarea_Props>``
const textarea_Style = css`
  ${resetTextarea};

  flex: 1;
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



const textareaFitText = (textarea: HTMLTextAreaElement)=>{
  const d = ElementProps(textarea)
  if (d.scrollHeight > d.contentHeight)
    textarea.style.height = `calc(${d.height-d.contentHeight + d.scrollHeight + 'px'} + 1em)`
}