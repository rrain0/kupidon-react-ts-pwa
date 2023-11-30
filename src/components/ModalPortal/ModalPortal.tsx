import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilValue } from 'recoil'
import { AppRecoil } from 'src/recoil/state/AppRecoil'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import Mem = ReactUtils.Mem
import PartialUndef = TypeUtils.PartialUndef



export type ModalPortalProps = PartialUndef<{
  children: React.ReactNode
}>
const ModalPortal = (props: ModalPortalProps)=>{
  const modalId = useRecoilValue(AppRecoil).modalOutletId
  const modalView = useMemo(
    ()=>modalId ? document.getElementById(modalId) : undefined,
    [modalId]
  )
  
  return <>
    {/* or maybe simply document.body ... */}
    { modalView && createPortal(props.children, modalView) }
  </>
}
export default Mem(ModalPortal)