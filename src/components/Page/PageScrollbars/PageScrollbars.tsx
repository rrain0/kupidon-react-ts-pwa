/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Global } from '@emotion/react'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import {
  PageScrollbarOverlayFrame
} from 'src/components/Page/PageScrollbars/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import hideWindowScrollbar = EmotionCommon.hideWindowScrollbar





export type PageScrollbarsProps = {
  pageRef: React.RefObject<HTMLElement>
}
const PageScrollbars =
React.memo(
(props: PageScrollbarsProps)=>{
  return <>
    { isBrowser && <>
      <Global styles={hideWindowScrollbar}/>
      <PageScrollbarOverlayFrame>
        <UseScrollbars
          containerIsWindow={true}
          contentRef={props.pageRef}
          render={(
            { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
          )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
            {...scrollbarProps}
            showVertical={canScrollVertical}
            showHorizontal={canScrollHorizontal}
          />}
        />
      </PageScrollbarOverlayFrame>
    </>}
  </>
})
export default PageScrollbars