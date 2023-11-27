/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { Themes } from 'src/utils/theme/Themes'
import {
  RadioInputGroupStyle,
} from 'src/views/Inputs/RadioInput/RadioInputGroupStyle'
import styled from 'styled-components'
import reset = EmotionCommon.reset
import trueOrUndef = CastUtils.trueOrUndef
import abs = EmotionCommon.abs
import PartialUndef = TypeUtils.PartialUndef
import El = RadioInputGroupStyle.El
import Attr = RadioInputGroupStyle.Attr
import Prop = RadioInputGroupStyle.Prop



export type RadioInputGroupProps = JSX.IntrinsicElements['div'] & PartialUndef<{
  hasError: boolean
  children: React.ReactNode
}>
export const RadioInputGroup = React.forwardRef<HTMLDivElement, RadioInputGroupProps>((
  props, forwardedRef
)=>{
  let { hasError, children, ...restProps } = props
  
  
  const ref = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, ()=>ref.current!,[])
  
  
  return <RadioGroup css={radioGroupStyle}
    {...{[Attr.errorName]: hasError}}
    {...restProps}
    data-error={hasError}
    ref={ref}
  >
    
    {children}
    
    <Border css={borderStyle}/>
    
  </RadioGroup>
})




type RadioGroupProps = PartialUndef<{
  [Attr.errorName]: boolean
}>
const RadioGroup = styled.div.attrs<RadioGroupProps>(p=>({
  className: classNames(p.className,El.radioGroupClassName),
  [Attr.errorName]: trueOrUndef(p['data-error']),
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
  role: 'radiogroup',
}))``
const radioGroupStyle = (t: Themes.Theme) => css`
  ${reset};
  position: relative;
`








const Border = styled.div.attrs(p=>({
  className: classNames(p.className,El.borderClassName)
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`