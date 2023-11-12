import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactUtils } from 'src/utils/common/ReactUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Mem = ReactUtils.Mem
import Setter = TypeUtils.Setter



export type UseModalSheetRenderProps = {
  setClosing: ()=>void
  sheetProps:{
    state: SheetState,
    setState: Setter<SheetState>,
    snapPoints: SheetSnapPoints,
    snapIdx: number,
    setSnapIdx: Setter<number>,
  }
}
export type UseModalSheetProps = {
  open: boolean
  setOpen: Setter<boolean>
  openIdx: number
  snapPoints: SheetSnapPoints
  render: (props: UseModalSheetRenderProps)=>React.ReactNode
}
const UseModalSheet = (props: UseModalSheetProps)=>{
  const {
    open,
    setOpen,
    openIdx,
    snapPoints,
  } = props
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState(openIdx)
  
  const setClosing = useCallback(
    ()=>setSheetState('closing'),
    []
  )
  
  const openEffectEvent = useEffectEvent((open: boolean)=>{
    if (open){
      setSheetState('opening')
      setSnapIdx(openIdx)
    }
  })
  useEffect(
    ()=>openEffectEvent(open),
    [open]
  )
  useEffect(
    ()=>{
      if (sheetState==='closed'){
        setOpen(false)
      }
    },
    [setOpen, sheetState]
  )
  
  
  const bottomSheetProps = useMemo(
    ()=>({
      state: sheetState,
      setState: setSheetState,
      snapPoints: snapPoints,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
    }),
    [sheetState, snapIdx, snapPoints]
  )
  
  
  return props.render({
    setClosing,
    sheetProps: bottomSheetProps
  })
}
export default Mem(UseModalSheet)