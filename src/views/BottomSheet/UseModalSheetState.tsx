import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { BasicSheetOpenIdx, BasicSheetSnaps } from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Setter = TypeUtils.Callback1
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef




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
  onClosed: Callback
  render: (props: UseModalSheetRenderProps)=>React.ReactNode
} & PartialUndef<{
  openIdx: number
  snapPoints: SheetSnapPoints
}>
const UseModalSheet =
React.memo(
(props: UseModalSheetProps)=>{
  const {
    open,
    onClosed,
    openIdx = BasicSheetOpenIdx,
    snapPoints = BasicSheetSnaps,
  } = props
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState<number>(openIdx)
  
  const setClosing = useCallback(
    ()=>setSheetState('closing'),
    []
  )
  
  const openEffectEvent = useEffectEvent(
    (open: boolean)=>{
      if (open){
        setSheetState('opening')
        setSnapIdx(openIdx)
      }
    }
  )
  useEffect(
    ()=>openEffectEvent(open),
    [open]
  )
  
  const onClosedEffectEvent = useEffectEvent(onClosed)
  useEffect(
    ()=>{
      if (sheetState==='closed'){
        onClosedEffectEvent()
      }
    },
    [sheetState]
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
  
  
  if (!open) return undefined
  return props.render({
    setClosing,
    sheetProps: bottomSheetProps
  })
})
export default UseModalSheet