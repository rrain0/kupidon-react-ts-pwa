import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import {
  DefaultSheetOpenIdx, DefaultSheetSnaps,
  SheetSnapIdx,
  SheetSnapPoints,
  SheetState, UseBottomSheetOptions,
} from 'src/views/BottomSheet/useBottomSheet'
import Setter = TypeUtils.Callback1
import Callback = TypeUtils.Callback
import PartialUndef = TypeUtils.PartialUndef
import ValueOrMapper = TypeUtils.ValueOrMapper




export type UseBottomSheetStateRenderProps = {
  setClosing: ()=>void
  sheetProps: UseBottomSheetOptions
}
export type UseBottomSheetStateProps = {
  open: boolean
  onClosed: Callback
  children: (props: UseBottomSheetStateRenderProps)=>React.ReactNode
} & PartialUndef<{
  openIdx: number
  snapPoints: SheetSnapPoints
  closeable: boolean
}>



const UseBottomSheetState =
React.memo(
(props: UseBottomSheetStateProps)=>{
  const {
    open,
    onClosed,
    openIdx = DefaultSheetOpenIdx,
    snapPoints = DefaultSheetSnaps,
    closeable = true,
  } = props
  
  
  const [sheetState, setSheetState] = useState<SheetState>('closed')
  const [snapIdx,setSnapIdx] = useState<SheetSnapIdx>(0)
  
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
        //console.log('set opening')
        setSheetState('opening')
        setSnapIdx(openIdx)
      }
    },
    [open]
  )
  
  useEffect(
    ()=>{
      if (sheetState==='closed'){
        //console.log('onClosed')
        onClosed()
      }
    },
    [sheetState]
  )
  
  
  const bottomSheetProps = useMemo<UseBottomSheetOptions>(
    ()=>({
      state: sheetState,
      setState: setSheetState,
      snapIdx: snapIdx,
      setSnapIdx: setSnapIdx,
      
      snapPoints: snapPoints,
      closeable: closeable,
      defaultOpenIdx: openIdx,
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