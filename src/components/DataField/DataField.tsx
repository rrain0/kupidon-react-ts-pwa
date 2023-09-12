import styled from "styled-components"
import React, { useImperativeHandle, useRef } from 'react'
import {ReactUtils} from "src/utils/ReactUtils"
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import classNames from "classnames"
import {Utils} from "src/utils/Utils"
import empty = Utils.empty
import {StyledCommon} from "src/styles/StyledCommon"
import abs = StyledCommon.abs
import row = StyledCommon.row
import trueOrUndef = Utils.trueOrUndef






export type DataFieldProps = JSX.IntrinsicElements['label'] & {
  hasError?: boolean|empty
  children?: React.ReactNode
}

const DataField = React.forwardRef<HTMLLabelElement, DataFieldProps>((
  props, forwardedRef
) => {
  let {
    hasError,
    children,
    ...restProps
  } = props
  
  
  const labelRef = useRef<HTMLLabelElement>(null)
  useImperativeHandle(forwardedRef, ()=>labelRef.current!,[])
  
  
  return <Frame
    hasError={hasError}
    {...restProps}
    ref={labelRef}
  >
    
    { children }
    
    <Border/>
    
  </Frame>
})
export default ReactMemoTyped(DataField)



type FrameProps = {
  hasError?: boolean | empty
}
const Frame = styled.label.attrs<FrameProps>(p=>({
  className: classNames(p.className,'rrainuiFrame'),
  'data-error': trueOrUndef(p.hasError),
}))`
  ${row};
  align-items: center;
  width: 100%;
  position: relative;
  cursor: pointer;
`




const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder'),
}))`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`