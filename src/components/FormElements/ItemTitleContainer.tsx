import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import row = EmotionCommon.row
import Mem = ReactUtils.Mem



const ItemTitleContainer = styled.div`
  width: 100%;
  height: auto;
`
export default Mem(ItemTitleContainer)