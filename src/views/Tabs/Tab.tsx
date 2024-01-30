import styled from '@emotion/styled'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import col = EmotionCommon.col





export type TabProps = {
  width: number|string
}
const Tab = styled.div<TabProps>`
  //min-width: 100cqw;
  //width: 100cqw;
  //max-width: 100cqw;
  min-width: ${p=>prepareWidth(p.width)};
  width: ${p=>prepareWidth(p.width)};
  max-width: ${p=>prepareWidth(p.width)};
  ${col};
  overflow-y: auto;
  touch-action: pan-y;
`
export default Tab


function prepareWidth(width: number|string): string {
  if (typeof width === 'number') return width+'px'
  return width
}