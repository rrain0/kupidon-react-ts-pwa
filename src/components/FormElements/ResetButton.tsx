/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SvgIcons } from 'src/views/icons/SvgIcons'
import ArrowReloadIc = SvgIcons.ArrowReloadIc
import Mem = ReactUtils.Mem




const ResetButton =
({text,onClick}: { text: string, onClick: ()=>void }) =>{
  return <Button css={ButtonStyle.smallRectAccent}
    onClick={onClick}
  >
    <ArrowReloadIc css={resetButtonIcon}/>
    <ResetButtonText>
      {text}
    </ResetButtonText>
  </Button>
}
const resetButtonIcon = css`
  &.rrainuiIcon {
    height: 1em;
    width: 1em;
    --icon-color: var(--color);
    transform: scale(-1, 1);
  }
`
const ResetButtonText = styled.div`
  white-space: nowrap;
`
export default Mem(ResetButton)