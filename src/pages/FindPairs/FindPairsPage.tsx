/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/components/Page/Pages'
import { PageScrollbarOverlayFrame } from 'src/components/Page/PageScrollbarOverlayFrame'
import ScrollbarOverlay from 'src/components/Scrollbars/ScrollbarOverlay'
import { ScrollbarOverlayStyle } from 'src/components/Scrollbars/ScrollbarOverlayStyle'
import UseScrollbars from 'src/components/Scrollbars/UseScrollbars'
import Page = Pages.Page
import SimpleContent = Pages.SimpleContent




const FindPairsPage =
React.memo(
()=>{
  
  
  const pageRef = useRef<HTMLElement>(null)
  
  
  return <>
    <Page
      ref={pageRef}
    >
      <SimpleContent>
        
        <div>Здесь будут карточки людей.</div>
        
      </SimpleContent>
    </Page>
    
    
    <TopButtonBar />
    
    <PageScrollbarOverlayFrame>
      <UseScrollbars
        containerIsWindow={true}
        contentRef={pageRef}
        render={(
          { canScrollVertical, canScrollHorizontal, ...scrollbarProps }
        )=><ScrollbarOverlay css={ScrollbarOverlayStyle.page}
          {...scrollbarProps}
          showVertical={canScrollVertical}
          showHorizontal={canScrollHorizontal}
        />}
      />
    </PageScrollbarOverlayFrame>
    
    <BottomButtonBar />
    
  </>
})
export default FindPairsPage

