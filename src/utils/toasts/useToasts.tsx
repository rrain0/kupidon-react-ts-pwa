import React, { useEffect, useState } from 'react'
import { toast, ToastItem } from 'react-toastify'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { ToastBody, ToastType } from 'src/utils/toasts/ToastifySetup'
import falseable = TypeUtils.falseable



// todo maybe move it to App and Recoil
// todo generate unique ids to control toasts
//  but programmatically control them via ToastMsgData objects
export type UseToastDataType = (ToastMsgData | falseable)[]
export type UseToastsProps = {
  scope?: string | undefined
  data?: UseToastDataType | undefined
}
export const useToasts = (props?: UseToastsProps)=>{
  //const scope = props?.scope===undefined ? '' : (props?.scope+'-')
  const data = props?.data??[]
  
  const [prevData, setPrevData] = useState([] as UseToastDataType)
  
  
  const onData = useEffectEvent(
    (data: UseToastDataType)=>{
      const show = data.filter(d=>!prevData.includes(d))
      const hide = prevData.filter(d=>!data.includes(d))
      
      console.log(
        'USE_TOASTS: PREV_DATA',prevData,'\n',
        'USE_TOASTS: DATA',data,
      )
      
      hide.forEach(d=>{
        if (d instanceof ToastMsgData){
          d.hide()
        }
      })
      
      show.forEach(d=>{
        if (d instanceof ToastMsgData){
          d.show()
        }
      })
      
      setPrevData(data)
    }
  )
  useEffect(
    ()=>{
      onData(data)
      
      /* const unsubscribe = toast.onChange(toast=>{
        // console.log('toast',toast)
        // const id = toast.id
        // if (typeof id === 'string' && id.startsWith(scope)){
        //   if(toast.status==='removed'){
        //     data.forEach(d=>{
        //       if (d instanceof ToastMsgData && id===scope+d.id) d.onClose?.()
        //     })
        //   }
        // }
        if(toast.status==='removed'){
          const d = toast.data
          if (d instanceof ToastMsgData){
            d.runCloseCallback && d.onClose?.()
          }
        }
      })
      
      return ()=>unsubscribe() */
    },
    data
  )
  
  
  const closeOnUnmount = useEffectEvent(()=>{
    console.log('unmount prev data',prevData)
    prevData.forEach(d=>{
      if (d instanceof ToastMsgData){
        if(d.closeOnUnmount){
          //toast.dismiss(scope+d.id)
          d.hide()
        }
      }
    })
  })
  useEffect(
    ()=>()=>closeOnUnmount(),
    []
  )
  
}



export class ToastMsgData {
  constructor(data:{
    type: ToastType,
    msg: React.ReactNode,
    lifetime?: number | undefined
    dragToClose?: boolean | undefined
    showCloseButton?: boolean | undefined
    onClose?: (()=>void) | undefined
    closeOnUnmount?: boolean | undefined
  }) {
    this.type = data.type
    this.msg = data.msg
    this.lifetime = data.lifetime
    this.dragToClose = data.dragToClose ?? false
    this.showCloseButton = data.showCloseButton ?? false
    this.onClose = data.onClose
    this.closeOnUnmount = data.closeOnUnmount ?? false
  }
  
  type: ToastType
  msg: React.ReactNode
  lifetime: number | undefined
  dragToClose: boolean
  showCloseButton: boolean
  onClose: (()=>void) | undefined
  closeOnUnmount: boolean
  
  id: string|number|undefined = undefined
  //runCloseCallback = true
  onChange(toast: ToastItem){
    if(toast.status==='removed' && toast.data===this){
      this.unsubscribeOnChange?.()
      /* this.runCloseCallback && */ this.onClose?.()
    }
  }
  unsubscribeOnChange: (()=>void) | undefined = undefined
  show(){
    if (this.id===undefined) {
      this.unsubscribeOnChange = toast.onChange(this.onChange)
      this.id = toast(
        props=><ToastBody
          closeToast={props.closeToast}
          //closeToast={d.onClose}
          showCloseButton={this.showCloseButton}
          type={this.type}
        >
          {this.msg}
        </ToastBody>,
        {
          data: this,
          draggable: this.dragToClose,
          autoClose: this.lifetime ?? false,
        }
      )
    }
  }
  hide(){
    if (this.id!==undefined) {
      //this.runCloseCallback = false
      this.unsubscribeOnChange?.()
      toast.dismiss(this.id)
    }
  }
}
