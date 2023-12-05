import React from 'react'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import LangSettings from 'src/components/LangSettings/LangSettings'
import { LangRecoil, LangSettingsRecoil } from 'src/recoil/state/LangRecoil'



const AutoLangSettings =
React.memo(
()=>{
  const langSettings = useRecoilValue(LangSettingsRecoil)
  //const lang = useRecoilValue(LangRecoil)
  
  
  const [open, setOpen] = useState(false)
  
  useEffect(
    ()=>{
      if (!open && langSettings.setting==='manual' && !langSettings.manualSetting)
        setOpen(true)
    },
    [open, langSettings.manualSetting, langSettings.setting]
  )
  
  
  return <LangSettings open={open} setOpen={setOpen} />
})
export default AutoLangSettings

