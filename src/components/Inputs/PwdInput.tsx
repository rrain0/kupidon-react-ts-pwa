/** @jsxImportSource @emotion/react */
import Input, {InputProps} from "./Input";
import {useRef, useState} from "react";
import React from "react";
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import {SimpleSvgIcons} from "src/components/icons/SimpleSvgIcons";
import EyeCrossedOutIc = SimpleSvgIcons.EyeCrossedOutIc;
import EyeIc = SimpleSvgIcons.EyeIc;
import Ripple, {RippleRef} from "../Ripple/Ripple";
import { useRecoilValue } from 'recoil';
import { themeObjState } from 'src/recoil/state/ThemeState';
import styled from '@emotion/styled';
import { EmotionCommon } from 'src/styles/EmotionCommon';
import center = EmotionCommon.center;
import centerAll = EmotionCommon.centerAll;
import resetButton = EmotionCommon.resetButton;



const PwdInput = React.forwardRef<HTMLInputElement, Omit<InputProps,'type'|'children'>>((
  { ...props}, forwardedRef
) => {
  const { ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  const rippleRef = useRef<RippleRef>(null)
  
  const themeObj = useRecoilValue(themeObjState)
  
  return <Input {...restProps} ref={forwardedRef} type={pwdHidden ? 'password' : 'text'}>
    <EyeWrap tabIndex={0}
      onClick={()=>setPwdHidden(!pwdHidden)}
      onPointerDown={ev=>{
        ev.preventDefault() // prevents focus
        rippleRef.current?.showRipple()
        //ev.currentTarget.setPointerCapture(ev.pointerId) // prevents pointer lost when outside a view
      }}
      onPointerUp={()=>rippleRef.current?.hideRipple()}
      //onPointerCancel={()=>rippleRef.current?.hideRipple()}
      // 'out' is 'leave' + 'cancel'
      onPointerOut={()=>rippleRef.current?.hideRipple()}
    >
  
      <RippleFrame1>
        <RippleFrame2>
          <Ripple
            ref={rippleRef}
            mode='center'
            rippleColor={themeObj.input.ripple[0]}
            rippleDuration={3000}
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

