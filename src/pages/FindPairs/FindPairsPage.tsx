/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useRef } from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import TopButtonBar from 'src/components/BottomButtonBar/TopButtonBar'
import { Pages } from 'src/components/Page/Pages'
import PageScrollbars from 'src/components/Page/PageScrollbars/PageScrollbars'
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
    
    <PageScrollbars pageRef={pageRef} />
    
    <BottomButtonBar />
    
  </>
})
export default FindPairsPage

