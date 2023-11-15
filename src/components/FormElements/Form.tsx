import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import col = EmotionCommon.col
import Mem = ReactUtils.Mem


const Form = styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 10px;
`
export default Mem(Form)
