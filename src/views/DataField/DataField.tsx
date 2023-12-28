/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import styled from "styled-components"
import React, { useImperativeHandle, useRef } from 'react'
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import trueOrUndef = TypeUtils.trueOrUndef



const Attr = DataFieldStyle.Attr


export type DataFieldCustomProps = PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export type ForwardRefProps = JSX.IntrinsicElements['div']
type RefElement = HTMLDivElement

export type DataFieldProps = DataFieldCustomProps & ForwardRefProps
const DataField =
React.memo(
React.forwardRef<RefElement, DataFieldProps>(
(props, forwardedRef) => {
  let {
    hasError,
    children,
    ...restProps
  } = props
  
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <Frame css={frameStyle}
    {...{[Attr.errorName]: hasError}}
    {...restProps}
    ref={elemRef}
  >
    
    { children }
    
    <Border css={borderStyle}/>
    
  </Frame>
}))
export default DataField



type FrameProps = PartialUndef<{
  [Attr.errorName]: boolean
}>
const Frame = styled.article.attrs<FrameProps>(p=>({
  className: classNames(p.className,DataFieldStyle.El.frameClassName),
  [Attr.errorName]: trueOrUndef(p[Attr.errorName]),
}))<FrameProps>``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;\
`




const Border = styled.div.attrs(p=>({
  className: classNames(p.className,DataFieldStyle.El.borderClassName),
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`