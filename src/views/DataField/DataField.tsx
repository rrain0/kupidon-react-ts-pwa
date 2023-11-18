/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { DataFieldStyle } from 'src/views/DataField/DataFieldStyle'
import styled from "styled-components"
import React, { useImperativeHandle, useRef } from 'react'
import {ReactUtils} from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import classNames from "classnames"
import { TypeUtils } from 'src/utils/common/TypeUtils'
import trueOrUndef = CastUtils.trueOrUndef
import row = EmotionCommon.row
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef



const Attr = DataFieldStyle.Attr


export type DataFieldProps = JSX.IntrinsicElements['div'] &
  PartialUndef<{
    hasError: boolean
    children: React.ReactNode
  }>

const DataField = React.forwardRef<HTMLDivElement, DataFieldProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    children,
    ...restProps
  } = props
  
  
  const labelRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, ()=>labelRef.current!,[])
  
  
  return <Frame css={frameStyle}
    {...{[Attr.errorName]: hasError}}
    {...restProps}
    ref={labelRef}
  >
    
    { children }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default Mem(DataField)



type FrameProps = PartialUndef<{
  [Attr.errorName]: boolean
}>
const Frame = styled.div.attrs<FrameProps>(p=>({
  className: classNames(p.className,DataFieldStyle.El.frameClassName),
  [Attr.errorName]: trueOrUndef(p[Attr.errorName]),
}))<FrameProps>``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`




const Border = styled.div.attrs(p=>({
  className: classNames(p.className,DataFieldStyle.El.borderClassName),
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`