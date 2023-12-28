



export namespace FileUtils {
  
  
  /**
   * Чтение файла в DataUrl
   * @param file Файл для получения DataURL
   * @returns {Promise<string>}
   */
  export const readToDataUrl = async (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = ev=>resolve(ev.target?.result as string)
      reader.onerror = ev=>reject(ev)
      
      //reader.readAsArrayBuffer(file)
      
      reader.readAsDataURL(file)
    })
  
  
  
  export const trimExtension = (fileName: string)=>
    fileName.replace(/\.[^.]*$/,'')
  
  
}