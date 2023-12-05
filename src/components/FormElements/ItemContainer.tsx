/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import col = EmotionCommon.col
import Mem = ReactUtils.Mem




const ItemContainer = styled.div`
  ${col};
  gap: 8px;
`
export default Mem(ItemContainer)