/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/CastUtils'
import styled from "styled-components"
import React, { useImperativeHandle, useRef } from 'react'
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import { TypeUtils } from 'src/utils/TypeUtils'
import empty = TypeUtils.empty
import trueOrUndef = CastUtils.trueOrUndef
import row = EmotionCommon.row
import abs = EmotionCommon.abs





export type DataFieldProps = JSX.IntrinsicElements['div'] & {
  hasError?: boolean|empty
  children?: React.ReactNode
}

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
    hasError={hasError}
    {...restProps}
    ref={labelRef}
  >
    
    { children }
    
    <Border css={borderStyle}/>
    
  </Frame>
})
export default ReactMemoTyped(DataField)



type FrameProps = {
  hasError?: boolean | empty
}
const Frame = styled.div.attrs<FrameProps>(p=>({
  className: classNames(p.className,'rrainuiFrame'),
  'data-error': trueOrUndef(p.hasError),
}))``
const frameStyle = css`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
`




const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder'),
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`