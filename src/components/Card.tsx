/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from '@emotion/react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col



export type CardProps = JSX.IntrinsicElements['div']
const Card = React.forwardRef<HTMLDivElement,CardProps>(
(props, forwardedRef)=>{
  return <div
    css={t=>css`
      ${col};
      gap: inherit;
      padding: 12px;
      border-radius: 16px;
      background: ${t.page.bgc[1]}77;
    `}
    {...props}
    ref={forwardedRef}
  >
  </div>
})
export default Card