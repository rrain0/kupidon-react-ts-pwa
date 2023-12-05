/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { CommonStyle } from 'src/views/CommonStyle'
import { SvgIcStyle } from 'src/views/icons/SvgIcStyle'
import Ripple from 'src/views/Ripple/Ripple'
import { RippleStyle } from 'src/views/Ripple/RippleStyle'
import Mem = ReactUtils.Mem
import PartialUndef = TypeUtils.PartialUndef
import hoverable = EmotionCommon.hoverable




export type OptionItemCustomProps = PartialUndef<{
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode
  nextIcon: React.ReactNode
}> & CommonStyle.Attr.errorType
export type ForwardRefProps = JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type OptionItemProps = OptionItemCustomProps & ForwardRefProps
const OptionItem = React.forwardRef<RefElement, OptionItemProps>(
(props, forwardedRef)=>{
  const {
    icon, title, value, nextIcon,
    ...restProps
  } = props
  
  const elemRef = useRef<RefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  return <Frame
    tabIndex={0}
    {...restProps}
    ref={elemRef}
  >
    <Ripple
      targetElement={elemRef}
      mode='cursor'
    />
    
    <IconFrame>{icon}</IconFrame>
    <TitleFrame>{title}</TitleFrame>
    <ValueFrame>{value}</ValueFrame>
    <NextIconFrame>{nextIcon}</NextIconFrame>
  </Frame>
}
)
export default Mem(OptionItem)



const Frame = styled.article`
  container: option-item / size;
  display: grid;
  grid: 'icon title next' 1fr
        'icon value next' 1fr
       / 50px 1fr   40px;
  place-items: center;
  
  // appearance
  width: 100%;
  height: 50px;
  border-radius: 15px;
  padding: 2px 0;
  cursor: pointer;
  
  // color
  background: none;

  ${RippleStyle.El.framePath}{
    ${RippleStyle.Prop.color}: ${p=>p.theme.ripple.contentOnTransparent[0]};
  }
  
  ${hoverable}{:hover{
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }}
  :focus-visible {
    background: ${p=>p.theme.buttonTransparent.bgcFocus[0]};
  }
  
  ${CommonStyle.Attr.errorThis}{
    background: ${p=>p.theme.input.bgcError[0]};
  }
`



const IconFrame = styled.div`
  grid-area: icon;
  place-self: stretch;
  display: grid;
  place-items: center center;

  ${SvgIcStyle.Prop.color}: ${p=>p.theme.containerNormal.content3[0]};
`
const TitleFrame = styled.div`
  grid-area: title;
  justify-self: start;
  display: grid;
  place-items: center start;
  
  color: ${p=>p.theme.containerNormal.content[0]};
`
const ValueFrame = styled.div`
  grid-area: value;
  justify-self: start;
  display: grid;
  place-items: center start;

  color: ${p=>p.theme.containerNormal.content3[0]};
`
const NextIconFrame = styled.div`
  grid-area: next;
  place-self: stretch;
  display: grid;
  place-items: center end;

  ${SvgIcStyle.Prop.color}: ${p=>p.theme.containerNormal.content3[0]};
`