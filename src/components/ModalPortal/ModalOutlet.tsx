/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useId, useLayoutEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { EmotionCommon } from 'src/styles/EmotionCommon'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import Mem = ReactUtils.Mem
import fixed = EmotionCommon.fixed




const ModalOutlet = ()=>{
  const reactId = useId()
  const id = `modal-outlet-${reactId}`
  const setAppState = useSetRecoilState(AppRecoil)
  useLayoutEffect(
    ()=>setAppState(s=>({...s, modalOutletId: id})),
    [id, setAppState]
  )
  
  return <div
    id={id}
    css={css`
      ${fixed};
      pointer-events: none;
      background: none;
    `}
  />
}
export default Mem(ModalOutlet)