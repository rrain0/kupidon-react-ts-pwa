import React from 'react'
import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col



const Form =
React.memo(
styled.form`
  max-width: 500px;
  width: 100%;
  ${col};
  gap: 24px;
`)
export default Form
