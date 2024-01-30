/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React, { useImperativeHandle, useRef } from 'react'
import { formHeaderStyle } from 'src/components/FormElements/FormHeader'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TabsRenderProps } from 'src/views/Tabs/Tabs'
import { TabIdx } from 'src/views/Tabs/useTabs'
import fitRange2 = MathUtils.fitRange2
import mapRange = MathUtils.mapRange





export type ProfileTabHeaderCustomProps = {
  thisTabIdx: TabIdx
  tabContainerSpring: TabsRenderProps['tabContainerSpring']
  tabWidth: number
  //setTabsState: Setter<TabsState>
  //setTabIdx: Setter<TabIdx>
}
export type ProfileTabHeaderForwardRefProps = JSX.IntrinsicElements['div']
export type ProfileTabHeaderRefElement = HTMLDivElement
export type ProfileTabHeaderProps = ProfileTabHeaderCustomProps & ProfileTabHeaderForwardRefProps



const ProfileTabHeader = 
React.memo(
React.forwardRef<ProfileTabHeaderRefElement, ProfileTabHeaderProps>(
(props, forwardedRef)=>{
  const {
    thisTabIdx: i,
    tabContainerSpring,
    tabWidth: w,
    //setTabsState,
    //setTabIdx,
    ...restProps 
  } = props
  
  
  const elemRef = useRef<ProfileTabHeaderRefElement>(null)
  useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
  
  
  // -1 - заголовок уехал влево
  // 0 - заголовок по центру
  // +1 - заголовок уехал вправо
  const fromCenter = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i-1)*w, (i+1)*w] as const
    v = fitRange2(v, fromRange)
    v = mapRange(v, fromRange, [-1,1])
    return v
  })
  
  
  return <AnimatedHeader css={formHeaderStyle}
    {...restProps}
    ref={elemRef}
    style={{
      x: fromCenter.to(v=>mapRange(v, [-1,1], [-(w/2), w/2])),
      scale: fromCenter.to(v=>1 - 0.35 * Math.abs(v)),
      opacity: fromCenter.to(v=>1 - 0.6 * Math.abs(v)),
    }}
  />
}))
export default ProfileTabHeader



const AnimatedHeader = styled(animated.h3)`
  //position: relative;
  //z-index: 100;
  user-select: none;
  cursor: pointer;
  position: relative;
  z-index: 5;
`