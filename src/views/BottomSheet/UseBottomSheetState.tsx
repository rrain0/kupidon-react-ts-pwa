import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { BasicSheetOpenIdx, BasicSheetSnaps } from 'src/views/BottomSheet/BottomSheetBasic'
import { SheetSnapPoints, SheetState } from 'src/views/BottomSheet/useBottomSheet'
import Setter = TypeUtils.Callback1
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef
import ValueOrMapper = TypeUtils.ValueOrMapper




export type UseBottomSheetStateRenderProps = {
  setClosing: ()=>void
  sheetProps:{
    state: SheetState,
    setState: Setter<SheetState>,
    snapPoints: SheetSnapPoints,
    snapIdx: number,
    setSnapIdx: Setter<number>,
  }
}
export type UseBottomSheetStateProps = {
  open: boolean
  onClosed: Callback
  children: (props: UseBottomSheetStateRenderProps)=>React.ReactNode
} & PartialUndef<{
  openIdx: number
  snapPoints: SheetSnapPoints
}>



const UseBottomSheetState =
React.memo(
(props: UseBottomSheetStateProps)=>{
  const {
    open,
    onClosed,
    openIdx = BasicSheetOpenIdx,
    snapPoints = BasicSheetSnaps,
  } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState<number>(openIdx)
  
  /* const setSheetState = useCallback(
    (sheetState: ValueOrMapper<SheetState>)=>{
      console.log('sheetState',sheetState)
      setSheetState_(sheetState)
    },
    []
  ) */
  
  const setClosing = useCallback(
    ()=>setSheetState('closing'),
    []
  )
  
  useEffect(
    ()=>{
      if (open){
        console.log('set opening')
        setSheetState('opening')
        setSnapIdx(openIdx)
      }
    },
    [open]
  )
  
  useEffect(
    ()=>{
      if (sheetState==='closed'){
        onClosed()
      }
    },
    [sheetState]
  )
  
  
  const bottomSheetProps = useMemo(
    ()=>({
      state: sheetState,
      setState: setSheetState,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
      snapPoints: snapPoints,
    }),
    [sheetState, snapIdx, snapPoints]
  )
  
  
  if (!open) return undefined
  return props.children({
    setClosing,
    sheetProps: bottomSheetProps
  })
})
export default UseBottomSheetState