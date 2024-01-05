import { TypeUtils } from 'src/utils/common/TypeUtils'
import CallbackParam = TypeUtils.CallbackParam




export namespace FileUtils {
  
  
  /**
   * Чтение файла в DataUrl
   * @param file Файл для получения DataURL
   * @returns {Promise<string>}
   */
  export const readToDataUrl =
  async (file: Blob, onProgress?: CallbackParam<number|null>): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onprogress = ev=>{
        if (!ev.lengthComputable) onProgress?.(null)
        else onProgress?.(ev.loaded / ev.total)
      }
      reader.onload = ev=>resolve(ev.target?.result as string)
      reader.onerror = ev=>reject(ev)
      
      //reader.readAsArrayBuffer(file)
      
      reader.readAsDataURL(file)
    })
  
  
  
  export const trimExtension = (fileName: string)=>
    fileName.replace(/\.[^.]*$/,'')
  
  
}