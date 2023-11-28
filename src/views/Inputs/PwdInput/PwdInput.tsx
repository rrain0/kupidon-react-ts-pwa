/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import Input, {InputProps} from "src/views/Inputs/Input/Input"
import { useRef, useState } from 'react'
import React from "react"
import {ReactUtils} from "src/utils/common/ReactUtils"
import Mem = ReactUtils.Mem
import {SvgIcons} from "src/views/icons/SvgIcons"
import EyeCrossedOutIc = SvgIcons.EyeCrossedOutIc
import EyeIc = SvgIcons.EyeIc
import Ripple from "src/views/Ripple/Ripple"
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import center = EmotionCommon.center
import centerAll = EmotionCommon.centerAll
import resetButton = EmotionCommon.resetButton
import hoverable = EmotionCommon.hoverable



const PwdInput = React.forwardRef<
  HTMLInputElement, Omit<InputProps,'type'|'children'>
>((
  { ...props}, forwardedRef
) => {
  const { ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  const eyeRef = useRef<HTMLButtonElement>(null)
  
  
  return <Input
    {...restProps}
    ref={forwardedRef}
    type={pwdHidden ? 'password' : 'text'}
  >
    <EyeWrap
      ref={eyeRef}
      tabIndex={0}
      onClick={()=>setPwdHidden(!pwdHidden)}
      onPointerDown={ev=>{
        ev.preventDefault() // prevents focus
      }}
    >
  
      <RippleFrame1>
        <RippleFrame2>
          <Ripple
            targetElement={eyeRef}
            css={t=>css`
              ${RippleStyle.El.frame}{
                ${RippleStyle.Prop.mode}: center;
                ${RippleStyle.Prop.color}: ${t.ripple.contentOnTransparent[0]};
              }
            `}
          />
        </RippleFrame2>
      </RippleFrame1>
      
      { pwdHidden
        ? <EyeCrossedOutIc/>
        : <EyeIc/>
      }
      
    </EyeWrap>
  </Input>
})
export default Mem(PwdInput)



const EyeWrap = styled.button`
  ${resetButton};
  ${centerAll};
  height: 100%;
  padding-right: 28cqh;
  cursor: pointer;
  --icon-size: 24px;
  >${SvgIcStyle.El.iconClass}{
    ${SvgIcStyle.Prop.size}: var(--icon-size);
    ${SvgIcStyle.Prop.color}: ${p=>p.theme.input.content[0]};
  }
`
EyeWrap.defaultProps = { type: 'button' }



const RippleFrame1 = styled.div`
  ${center};
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 999999px;
`
const RippleFrame2 = styled.div`
  width: min(190%, 90cqh);
  height: min(190%, 90cqh);
  border-radius: inherit;
  position: relative;
  *:focus > * > & {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }
  ${hoverable}{ :hover {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  } }
`

