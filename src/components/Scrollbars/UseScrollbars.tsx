/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import {
  ContainerScrollStateOptions,
  useContainerScrollState,
} from 'src/views/Scrollbar/useContainerScrollState'
import ReactMemoTyped = ReactUtils.ReactMemoTyped



export type UseScrollbarsProps = ContainerScrollStateOptions & {
  render: (props: ReturnType<typeof useContainerScrollState>)=>React.ReactNode
}
const UseScrollbars = (props: UseScrollbarsProps)=>{
  const { render, ...restProps } = props
  
  const scrollbarProps = useContainerScrollState(restProps)
  
  return props.render(scrollbarProps)
}
export default ReactMemoTyped(UseScrollbars)