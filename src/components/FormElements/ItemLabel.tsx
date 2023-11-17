import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem
import Txt = EmotionCommon.Txt



const ItemLabel = styled.label`
  padding-left: 12px;
  ${Txt.normal1};
  color: ${p=>p.theme.page.text[0]}
`
export default Mem(ItemLabel)