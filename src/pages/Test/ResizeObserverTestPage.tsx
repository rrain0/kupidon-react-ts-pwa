/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useRef, useState } from 'react'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { SimplePage } from 'src/components/Page/SimplePage'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import Button from '../../components/Buttons/Button';
import { ButtonStyle } from '../../components/Buttons/ButtonStyle';





const ResizeObserverTestPage = ()=>{
  
  const [items1, setItems1] = useState([...Array(6).keys()])
  const container1Ref = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(()=>{
    const container = container1Ref.current
    if (container){
      const resizeObserver = new ResizeObserver(()=>{
        // works only when scrollbar appears
        console.log('element 1 was resized')
      })
      resizeObserver.observe(container)
      return ()=>resizeObserver.disconnect()
    }
  },[container1Ref.current])
  
  const addItem1 = ()=>{
    setItems1([...items1, items1.length])
  }
  
  
  
  
  const [items2, setItems2] = useState([...Array(6).keys()])
  const container2Ref = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(()=>{
    const container = container2Ref.current
    if (container){
      const resizeObserver = new ResizeObserver(()=>{
        // works after adding something
        console.log('element 2 was resized')
      })
      resizeObserver.observe(container)
      return ()=>resizeObserver.disconnect()
    }
  },[container2Ref.current])
  
  const addItem2 = ()=>{
    setItems2([...items2, items2.length])
  }
  
  
  return <Page>
    <PageContent>
      
      <div>Resize Observer Test Page</div>
      
      <Button css={ButtonStyle.primary}
        onClick={()=>addItem1()}
      >
        +1
      </Button>
      
      <div
        css={t=>css`
          width: 400px;
          //height: fit-content;
          height: 400px;
          ${col};
          gap: 20px;
          padding: 20px;
          background: linear-gradient(
            to bottom right,
            ${t.page.bgc2[0]} 0%,
            ${t.page.bgc2[1]} 50%,
            ${t.page.bgc2[2]} 100%
          );
          overflow: auto;
        `}
        ref={container1Ref}
      >
        { items1.map(it=><div
          css={css``}
          key={it}
        >
          Item {it}
        </div>) }
      </div>
      
      
      <Button css={ButtonStyle.primary}
        onClick={()=>addItem2()}
      >
        +1
      </Button>
      
      <div
        css={t=>css`
          width: 400px;
          height: fit-content;
          ${col};
          gap: 20px;
          padding: 20px;
          background: linear-gradient(
            to bottom right,
            ${t.page.bgc2[0]} 0%,
            ${t.page.bgc2[1]} 50%,
            ${t.page.bgc2[2]} 100%
          );
        `}
        ref={container2Ref}
      >
        { items2.map(it=><div
          css={css``}
          key={it}
        >
          Item {it}
        </div>) }
      </div>
    
    </PageContent>
  </Page>
}
export default ResizeObserverTestPage


