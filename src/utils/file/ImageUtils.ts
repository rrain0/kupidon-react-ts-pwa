import imageCompression, { Options } from 'browser-image-compression'
import heic2any from 'heic2any'
import { isSafari, isMobileSafari } from 'react-device-detect'
import { FileUtils } from 'src/utils/file/FileUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import CallbackParam = TypeUtils.Callback1
import trimExtension = FileUtils.trimExtension




export namespace ImageUtils {
  
  
  
  export const compress =
  async(imgFile: File, onProgress?: CallbackParam<number>): Promise<File> => {
    //console.log('imgFile',imgFile)
    const progress = {
      stage: 0,
      stages: 1,
      progress: 0, // 0..100
    }
    const notifyProgress = ()=>
      onProgress?.((progress.stage + progress.progress/100) / progress.stages * 100)
    
    
    if (['image/heic','image/heif'].includes(imgFile.type)){
      progress.stages++
      const pngFromHeicBlob = await heic2any({
        blob: imgFile,
        toType: 'image/png',
      }) as Blob
      const pngFromHeicFile = new File(
        [pngFromHeicBlob],
        trimExtension(imgFile.name)+'.png',
        {
          type: 'image/png',
        }
      )
      progress.stage++
      progress.progress = 0
      notifyProgress()
      imgFile = pngFromHeicFile
    }
    // also you can abort or get progress via options
    let options: Options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 1600, // 1600x900 16:9
      useWebWorker: true,
      fileType: 'image/webp',
    }
    if (onProgress){
      options.onProgress = (p: number)=>{
        progress.progress = p
        notifyProgress()
      }
    }
    if (isSafari || isMobileSafari){
      options.fileType = 'image/jpeg'
    }
    return imageCompression(imgFile,options)
  }
  
  
  
}