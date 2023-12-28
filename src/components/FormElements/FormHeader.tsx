/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import Txt = EmotionCommon.Txt




const FormHeader = styled.h3`
  ${Txt.large4};
  min-height: 1.5em;
  color: ${p=>p.theme.page.content[1]};
  align-self: center;
  text-align: center;
`
export default FormHeader


