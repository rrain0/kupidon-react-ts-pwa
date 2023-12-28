/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ElementProps } from 'src/utils/common/GetDimensions'
import { TextareaStyle } from 'src/views/Textarea/TextareaStyle'
import styled from "styled-components"
import React, { useImperativeHandle, useRef } from 'react'
import { ReactUtils } from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import resetTextarea = EmotionCommon.resetTextarea
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable
import trueOrUndef = TypeUtils.trueOrUndef




const Attr = TextareaStyle.Attr



export type InputProps = JSX.IntrinsicElements['textarea'] &
  PartialUndef<{
    hasError: boolean
    startViews: React.ReactNode
    endViews: React.ReactNode
    children: React.ReactNode
    childrenPosition: 'start'|'end'
  }>

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
      {...{[Attr.errorName]: hasError}}
      ref={textareaRef}
      
      onScroll={ev=>{
        textareaFitText(ev.currentTarget)
        restProps.onScroll?.(ev)
      }}
    />
    
    { childrenPosition==='end' && children }
    { endViews }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default Mem(Textarea)



const Frame = styled.label.attrs(p=>({
  className: classNames(p.className,TextareaStyle.El.frameClassName)
}))``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`


type Textarea_Props = PartialUndef<{
  [Attr.errorName]: boolean
}>
const Textarea_ = styled.textarea.attrs<Textarea_Props>(p=>({
  className: classNames(p.className,TextareaStyle.El.textareaClassName),
  [Attr.errorName]: trueOrUndef(p[Attr.errorName])
}))<Textarea_Props>``
const textarea_Style = css`
  ${resetTextarea};

  flex: 1;
  border-radius: inherit;

  ${hoverable}{ :hover {
    cursor: text;
  } }
`


const Border = styled.div.attrs(p=>({
  className: classNames(p.className,TextareaStyle.El.borderClassName)
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
