



export namespace FileUtils {
  
  
  /**
   * Операция получение по файлу его DataURL
   * @param file Файл для получения DataURL
   * @returns {Promise<string>}
   */
  export const readToDataUrl = async (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (ev) => resolve(ev.target?.result as string)
      reader.onerror = (ev) => reject(ev)
      
      //reader.readAsArrayBuffer(file)
      
      reader.readAsDataURL(file)
    })
  
  
  
}