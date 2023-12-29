import imageCompression, { Options } from 'browser-image-compression'
import { isSafari, isMobileSafari } from 'react-device-detect'




export namespace ImageUtils {
  
  
  export const compress = async(imgFile: File): Promise<File> => {
    // also you can abort or get progress via options
    const options: Options = function(){
      if (isSafari || isMobileSafari){
        return {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1600, // 1600x900 16:9
          useWebWorker: true,
          fileType: 'image/jpeg',
        }
      }
      return {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1600, // 1600x900 16:9
        useWebWorker: true,
        fileType: 'image/webp',
      }
    }()
    return imageCompression(imgFile,options)
  }
  
  
}