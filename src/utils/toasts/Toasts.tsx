import { cssTransition, toast, ToastTransition } from 'react-toastify';
import { ToastContent } from 'react-toastify/dist/types';


export namespace Toasts {
  
  const loadingId = 'loading'
  export const Loading = {
    id: loadingId,
    show: (msg: string)=>toast.loading(msg, {
      toastId: loadingId,
      transition: slideInDownThenFadeOut,
    })
  }
  
  
  const successSignInId = 'success'
  export const SuccessSignIn = {
    id: successSignInId,
    show: (msg: string)=>toast.success(msg, {
      toastId: successSignInId,
      autoClose: 1500,
      transition: slideInDownThenFadeOut,
    })
  }
  
  
  const errorId = 'error'
  export const Error = {
    id: errorId,
    show: <TData = unknown>(id: string, content: ToastContent<TData>)=>toast.error(content, {
      toastId: id,
      closeButton: true,
      transition: slideInDownThenFadeOut,
    })
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