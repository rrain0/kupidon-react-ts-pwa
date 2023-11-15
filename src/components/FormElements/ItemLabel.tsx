import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import textNormal1 = EmotionCommon.textNormal1
import Mem = ReactUtils.Mem



const ItemLabel = styled.label`
  padding-left: 12px;
  ${textNormal1};
  color: ${p=>p.theme.page.text[0]}
`
export default Mem(ItemLabel)