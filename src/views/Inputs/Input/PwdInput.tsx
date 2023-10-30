/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Input, {InputProps} from "src/views/Inputs/Input/Input"
import { useRef, useState } from 'react'
import React from "react"
import {ReactUtils} from "src/utils/common/ReactUtils"
import ReactMemoTyped = ReactUtils.Mem
import {SimpleSvgIcons} from "src/views/icons/SimpleSvgIcons"
import EyeCrossedOutIc = SimpleSvgIcons.EyeCrossedOutIc
import EyeIc = SimpleSvgIcons.EyeIc
import Ripple from "src/views/Ripple/Ripple"
import { useRecoilValue } from 'recoil'
import { ThemeRecoil } from 'src/recoil/state/ThemeRecoil'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import centerAll = EmotionCommon.centerAll
import resetButton = EmotionCommon.resetButton



const PwdInput = React.forwardRef<HTMLInputElement, Omit<InputProps,'type'|'children'>>((
  { ...props}, forwardedRef
) => {
  const { ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  const eyeRef = useRef<HTMLButtonElement>(null)
  
  const themeObj = useRecoilValue(ThemeRecoil)!
  
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
              --ripple-mode: center;
              --ripple-color: ${t.input.ripple[0]};
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
export default ReactMemoTyped(PwdInput)



const EyeWrap = styled.button`
  ${resetButton};
  ${centerAll};
  height: 100%;
  padding: 0 14px 0 0;
  cursor: pointer;
  --icon-color: ${p=>p.theme.input.text[0]};
  --icon-size: 24px;
`
EyeWrap.defaultProps = { type: 'button' }



const RippleFrame1 = styled.div`
  ${center};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const RippleFrame2 = styled.div`
  width: 190%;
  height: 190%;
  border-radius: inherit;
  position: relative;
  *:focus > * > & {
    background: ${p=>p.theme.input.iconActive[0]};
  }
  @media not (hover: none) {
    :hover {
      background: ${p=>p.theme.input.iconHover[0]};
    }
  }
`

