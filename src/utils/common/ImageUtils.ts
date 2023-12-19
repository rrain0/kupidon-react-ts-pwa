import imageCompression, { Options } from 'browser-image-compression'


export namespace ImageUtils {
  
  
  export const compress = async(imgFile: File): Promise<File> =>{
    const options: Options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    return imageCompression(imgFile,options)
  }
  
  
}