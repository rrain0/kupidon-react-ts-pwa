/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from '@react-spring/web'
import React, { useImperativeHandle, useRef } from 'react'
import { formHeaderStyle } from 'src/components/FormElements/FormHeader'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { MathUtils } from 'src/utils/common/MathUtils'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { TabsRenderProps } from 'src/views/Tabs/Tabs'
import { TabIdx } from 'src/views/Tabs/useTabs'
import fitRange2 = MathUtils.fitRange2
import mapRange = MathUtils.mapRange
import abs = EmotionCommon.abs
import inRange2 = MathUtils.inRange2
import lastIndex = ArrayUtils.lastIndex





export type ProfileTabHeaderCustomProps = {
  thisTabIdx: TabIdx
  tabContainerSpring: TabsRenderProps['tabContainerSpring']
  tabWidth: number
  headers: string[]
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
    headers,
    //setTabsState,
    //setTabIdx,
    
    children,
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
    //console.log('center value',v)
    return v
  })
  const fromLeft = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i-1)*w - w, (i+1)*w - w] as const
    v = fitRange2(v-w, fromRange)
    v = mapRange(v, fromRange, [-2,0])
    //console.log('left value',v)
    return v
  })
  const fromRight = tabContainerSpring.scrollLeft.to(v=>{
    const fromRange = [(i)*w, (i+2)*w] as const
    v = fitRange2(v+w, fromRange)
    v = mapRange(v, fromRange, [-1,1])
    return v
  })
  
  
  return <AnimatedHeader
    {...restProps}
    ref={elemRef}
    style={{
      x: fromCenter.to(v=>mapRange(v, [-1,1], [-(w/2), w/2])),
      scale: fromCenter.to(v=>1 - 0.35 * Math.abs(v)),
      opacity: fromCenter.to(v=>1 - 0.6 * Math.abs(v)),
    }}
  >
    
    { children }
    
    <OtherHeadersContainer>
      { inRange2(i-1, [0, lastIndex(headers)]) &&
        <AnimatedSecondaryHeader
          style={{
            x: fromLeft.to(v=>mapRange(v-w, [-2,0], [-w, 0])),
            scale: fromLeft.to(v=>1 - 0.35 * Math.abs(v)),
            opacity: fromLeft.to(v=>1 - 0.6 * Math.abs(v)),
          }}
        >
          {headers[i-1]}
        </AnimatedSecondaryHeader>
      }
     
    </OtherHeadersContainer>
    
  </AnimatedHeader>
}))
export default ProfileTabHeader




const headerStyle = (t: AppTheme.Theme)=>css`
  ${formHeaderStyle(t)};
  user-select: none;
  cursor: pointer;
`


const AnimatedHeader = styled(animated.h3)`
  ${p=>headerStyle(p.theme)};
  position: relative;
  z-index: 5;
`

const OtherHeadersContainer = styled.div`
  ${abs};
  left: 50%;
  right: 50%;
  overflow: visible;
`

const AnimatedSecondaryHeader = styled(animated.div)`
  ${p=>headerStyle(p.theme)};
  position: absolute;
  translate: -50% 0;
  z-index: 5;
`