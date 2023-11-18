/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Button from 'src/views/Buttons/Button'
import { ButtonStyle } from 'src/views/Buttons/ButtonStyle'
import { SimpleSvgIcons } from 'src/views/icons/SimpleSvgIcons'
import GearIc = SimpleSvgIcons.GearIc
import Mem = ReactUtils.Mem




export type SettingsButtonProps = {
  onClick?: (()=>void) | undefined
}
const SettingsButton = (props: SettingsButtonProps)=>{
  return <Button css={ButtonStyle.iconBigTransparent}
    onClick={props.onClick}
    //disabled
  >
    <GearIc/>
  </Button>
}
export default Mem(SettingsButton)