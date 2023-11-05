/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import BottomButtonBar from 'src/components/BottomButtonBar/BottomButtonBar'
import QuickSettings from 'src/components/QuickSettings/QuickSettings'
import SettingsButton from 'src/components/SettingsButton'
import UseBool from 'src/components/StateCarriers/UseBool'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem




const SettingsBottomButtonBar = ()=>{
  return <BottomButtonBar>
    <UseBool render={props=><>
      <SettingsButton onClick={props.setTrue}/>
      <QuickSettings open={props.value} setOpen={props.setValue}/>
    </>}/>
  </BottomButtonBar>
}
export default Mem(SettingsBottomButtonBar)
