/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem




const FormHeader = styled.h3`
  font-weight: 500;
  font-size: 28px;
  line-height: 150%;
  letter-spacing: 0.05em;
  color: ${p=>p.theme.page.text[0]};
  align-self: center;
  text-align: center;
`
export default Mem(FormHeader)


