import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col




const Tab = styled.div`
  min-width: 100cqw;
  width: 100cqw;
  max-width: 100cqw;
  max-height: 800px;
  ${col};
  overflow-y: auto;
  touch-action: pan-y;
`
export default Tab