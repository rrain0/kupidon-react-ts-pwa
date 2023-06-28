/** @jsxImportSource @emotion/react */
import Input, {InputProps} from "./Input";
import styled from "styled-components";
import {useRef, useState} from "react";
import React from "react";
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import {StyledCommon} from "src/styles/StyledCommon";
import resetButton = StyledCommon.resetButton;
import center = StyledCommon.center;
import centerAll = StyledCommon.centerAll;
import {SimpleSvgIcons} from "src/components/icons/SimpleSvgIcons";
import EyeCrossedOutIc = SimpleSvgIcons.EyeCrossedOutIc;
import EyeIc = SimpleSvgIcons.EyeIc;
import Ripple, {RippleRef} from "../Ripple/Ripple";



const PwdInput = React.forwardRef<HTMLInputElement, Omit<InputProps,'type'|'children'>>((
  { ...props}, forwardedRef
) => {
  const { ...restProps } = props
  
  const [pwdHidden, setPwdHidden] = useState(true)
  
  const rippleRef = useRef<RippleRef>(null)
  
  return <Input {...restProps} ref={forwardedRef} type={pwdHidden ? 'password' : 'text'}>
    <EyeWrap tabIndex={0}
      onClick={()=>setPwdHidden(!pwdHidden)}
      onPointerDown={ev=>{
        ev.preventDefault() // prevents focus
        rippleRef.current?.showRipple()
        //ev.currentTarget.setPointerCapture(ev.pointerId) // prevents pointer lost when outside a view
      }}
      //onPointerUp={()=>rippleRef.current?.hideRipple()}
      //onPointerCancel={()=>rippleRef.current?.hideRipple()}
      // 'out' is 'leave' + 'up' + 'cancel'
      onPointerOut={ev=>{
        rippleRef.current?.hideRipple()
        restProps.onPointerOut?.(ev)
      }}
      
    >
  
      <RippleFrame1>
        <RippleFrame2>
          <Ripple ref={rippleRef} mode='center' rippleColor='#0008' rippleDuration={3000}/>
        </RippleFrame2>
      </RippleFrame1>
      
      { pwdHidden
        ? <EyeCrossedOutIc mainColor='black' size={24}/>
        : <EyeIc mainColor='black' size={24}/>
      }
      
    </EyeWrap>
  </Input>
})
export default ReactMemoTyped(PwdInput)



let EyeWrap = styled.button.attrs({ type: 'button' })`
  ${resetButton};
  ${centerAll};
  height: 100%;
  padding: 0 14px 0 0;
  cursor: pointer;
`


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
    background: #00000011;
  }
  @media not (hover: none) {
    &:hover {
      background: #00000011;
    }
  }
`

