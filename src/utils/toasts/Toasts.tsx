import { cssTransition, toast, ToastTransition } from 'react-toastify'
import { ToastBody } from 'src/pages/App/ToastifySetup'



export namespace Toasts {
  
  
  const loadingId = 'loading'
  export const Loading = {
    id: loadingId,
    show: (msg: string, id?: string|undefined)=>toast(
      props=><ToastBody
        closeToast={props.closeToast}
        showClose={false}
        type='loading'
      >
        {msg}
      </ToastBody>,
      {
        toastId: id ?? loadingId,
        transition: slideInDownThenFadeOut,
      }
    )
  }
  
  
  const successId = 'success'
  export const Success = {
    id: successId,
    show: (msg: string, id?: string|undefined)=>toast(
      props=><ToastBody
        closeToast={props.closeToast}
        showClose={false}
        type='ok'
      >
        {msg}
      </ToastBody>,
      {
        toastId: id ?? successId,
        autoClose: 1500,
        transition: slideInDownThenFadeOut,
      }
    )
  }
  
  
  const errorId = 'error'
  export const Error = {
    id: errorId,
    show: (id: string, content: React.ReactNode)=>toast(
      props=><ToastBody
        closeToast={props.closeToast}
        showClose={true}
        type='danger'
      >
        {content}
      </ToastBody>,
      {
        toastId: id,
        closeButton: false,
        transition: slideInDownThenFadeOut,
      }
    )
  }
  
  
  
  
  
  const ShakeX: ToastTransition = cssTransition({
    enter: 'animate__animated animate__shakeX',
    exit: 'animate__animated animate__shakeX',
    collapse: false,
  })
  
  const Bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
    collapse: false,
  })
  
  const Scale: ToastTransition = cssTransition({
    enter: 'scale-up-center',
    exit: 'scale-down-center',
  })
  
  const noAnimation: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'no-animation',
    collapse: false,
  })
  
  const slideInDownThenFadeOut: ToastTransition = cssTransition({
    enter: 'animate__animated animate__faster animate__slideInDown',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
  
  const noAnimationThenFadeOut: ToastTransition = cssTransition({
    enter: 'no-animation',
    exit: 'animate__animated animate__faster animate__fadeOut',
    collapse: false,
  })
  
  
}