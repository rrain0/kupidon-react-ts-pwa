import imageCompression, { Options } from 'browser-image-compression'


export namespace ImageUtils {
  
  
  export const compress = async(imgFile: File): Promise<File> => {
    // also you can abort or get progress via options
    const options: Options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    return imageCompression(imgFile,options)
  }
  
  
}