/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import ReactMemoTyped = ReactUtils.Mem
import GearIc = SimpleSvgIcons.GearIc




const SettingsBottomButtonBar = (props: { openSettings: ()=>void })=>{
  return <BottomButtonBar>
    <Button css={ButtonStyle.iconTransparent}
      onClick={props.openSettings}
    >
      <GearIc/>
    </Button>
  </BottomButtonBar>
}
export default ReactMemoTyped(SettingsBottomButtonBar)
