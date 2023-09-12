/** @jsxImportSource @emotion/react */
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppRoutes } from 'src/app-routes/AppRoutes'
import RootRoutes = AppRoutes.RootRoutes
import { SimplePage } from 'src/components/Page/SimplePage'
import Page = SimplePage.Page
import PageContent = SimplePage.PageContent
import Button from 'src/components/Buttons/Button'
import { ButtonStyle } from 'src/components/Buttons/ButtonStyle'




const TestPage = () => {
  const [searchParams] = useSearchParams()
  
  
  return <Page>
    <PageContent>
    
    <div>Test Page</div>
  
    <Link to={RootRoutes.test.scrollbar.fullPath3({ urlSearchParams: searchParams })}>
      <Button css={ButtonStyle.primary}>Scrollbar test</Button>
    </Link>
    <Link to={RootRoutes.test.bottomSheet.fullPath3({ urlSearchParams: searchParams })}>
      <Button css={ButtonStyle.primary}>Bottom Sheet test</Button>
    </Link>
    <Link to={RootRoutes.test.resizeObserver.fullPath3({ urlSearchParams: searchParams })}>
      <Button css={ButtonStyle.primary}>Resize Observer test</Button>
    </Link>
    
    </PageContent>
  </Page>
}
export default TestPage




