import { TypeUtils } from 'src/utils/common/TypeUtils'
import CallbackParam = TypeUtils.Callback1
import Callback = TypeUtils.Callback




export namespace FileUtils {
  
  
  
  export const blobToDataUrl =
  async (
    file: Blob,
    options?: {
      onProgress?: CallbackParam<number|null>
      abort?: { abort?: Callback|undefined }
    }
  ): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = ev=>{
      if (!ev.lengthComputable) options?.onProgress?.(null)
      else options?.onProgress?.(ev.loaded / ev.total)
    }
    reader.onload = ev=>resolve(ev.target?.result as string)
    reader.onerror = ev=>reject(ev)
    reader.onabort = ev=>{} // TODO
    
    if (options?.abort) options.abort.abort = reader.abort
    
    //reader.readAsArrayBuffer(file)
    reader.readAsDataURL(file)
  })
  
  
  
  export const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    return blob
  }
  
  
  
  export const fetchToBlob =
  async (
    url: string,
    options?: {
      onProgress?: CallbackParam<number|null>
      abort?: { abort?: Callback|undefined }
    }
  ): Promise<Blob> => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    
    request.onprogress = ev=>{
      if (ev.lengthComputable) options?.onProgress?.(ev.loaded / ev.total * 100)
      else options?.onProgress?.(null)
    }
    if (options?.abort) options.abort.abort = request.abort
    
    request.onload = ev=>{
      const data = request.response
      if (data instanceof Blob) resolve(data)
      else reject(data)
    }
    request.onerror = ev=>reject(ev)
    request.onabort = ev=>{} // TODO
    
    request.responseType = 'blob'
    request.open('GET', url, true)
    request.send()
  })
  
  
  
  export const fetchToBlob2 =
  async (
    url: string,
    options?: {
      onProgress?: CallbackParam<number|null>
      abort?: { abort?: Callback|undefined }
    }
  ): Promise<Blob> => {
    const controller = new AbortController()
    //controller.abort()
    const response = await fetch(
      url,
      {
        signal: controller.signal,
        
      }
    )
    if (!response.ok) throw new Error('failed to fetch')
    const blob = await response.blob()
    return blob
  }
  
  
  
  export const trimExtension = (fileName: string) =>
    fileName.replace(/\.[^.]*$/,'')
  
  
}