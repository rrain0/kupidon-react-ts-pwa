/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import {
  ContainerScrollStateOptions,
  useContainerScrollState,
} from 'src/views/Scrollbar/useContainerScrollState'



export type UseScrollbarsProps = ContainerScrollStateOptions & {
  render: (props: ReturnType<typeof useContainerScrollState>)=>React.ReactNode
}
const UseScrollbars =
React.memo(
(props: UseScrollbarsProps)=>{
  const { render, ...restProps } = props
  
  const scrollbarProps = useContainerScrollState(restProps)
  
  return props.render(scrollbarProps)
})
export default UseScrollbars