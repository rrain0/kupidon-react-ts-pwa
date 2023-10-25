/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { useImperativeHandle, useRef } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { CastUtils } from 'src/utils/common/CastUtils'
import { empty } from 'src/utils/common/TypeUtils'
import { Themes } from 'src/utils/theme/Themes'
import styled from 'styled-components'
import reset = EmotionCommon.reset
import trueOrUndef = CastUtils.trueOrUndef
import abs = EmotionCommon.abs



export type RadioInputGroupProps = JSX.IntrinsicElements['div'] & {
  hasError?: boolean|empty
  children?: React.ReactNode
}
export const RadioInputGroup = React.forwardRef<HTMLDivElement, RadioInputGroupProps>((
  props, forwardedRef
)=>{
  let { hasError, children, ...restProps } = props
  
  
  const ref = useRef<HTMLDivElement>(null)
  useImperativeHandle(forwardedRef, ()=>ref.current!,[])
  
  
  return <RadioGroup css={radioGroupStyle}
    {...restProps}
    data-error={hasError}
    ref={ref}
  >
    
    {children}
    
    <Border css={borderStyle}/>
    
  </RadioGroup>
})




type RadioGroupProps = {
  'data-error'?: boolean | empty
}
const RadioGroup = styled.div.attrs<RadioGroupProps>(p=>({
  className: classNames(p.className,'rrainuiRadioGroup'),
  'data-error': trueOrUndef(p['data-error']),
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role
  role: 'radiogroup',
}))``
const radioGroupStyle = (t: Themes.Theme) => css`
  ${reset};
  position: relative;
`








const Border = styled.div.attrs(p=>({
  className: classNames(p.className,'rrainuiBorder')
}))``
const borderStyle = css`
  ${abs};
  pointer-events: none;
  border-radius: inherit;
`