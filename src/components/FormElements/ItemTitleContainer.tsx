import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import row = EmotionCommon.row
import Mem = ReactUtils.Mem



const ItemTitleContainer = styled.div`
  width: 100%;
  height: 30px;
  ${row};
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`
export default Mem(ItemTitleContainer)