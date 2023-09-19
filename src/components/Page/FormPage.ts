import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import center = EmotionCommon.center
import { SimpleGradientBgc } from 'src/styles/bgc/SimpleGradientBgc'
import { ReactUtils } from 'src/utils/ReactUtils'
import ReactMemoTyped = ReactUtils.ReactMemoTyped
import centerAll = EmotionCommon.centerAll
import stretchAll = EmotionCommon.stretchAll




export namespace FormPage {
  
  
  export const Page = ReactMemoTyped(
    styled.main`
      display: flex;
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
    `
  )
  export const PageContent = ReactMemoTyped(
    styled.div`
      min-width: 200px; width: 100%;
      min-height: 100%; height: fit-content;
      ${center};
      padding: 12px;
      ${p=>SimpleGradientBgc(p.theme)};
    `
  )
  
  
}