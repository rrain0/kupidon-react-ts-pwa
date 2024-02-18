import { TypeUtils } from 'src/utils/common/TypeUtils'
import noop = TypeUtils.noop




export const DefaultOperation = {
  id: '',
  progress: 0, // 0..100
  showProgress: true,
  abort: noop,
}
export type Operation = typeof DefaultOperation



export const DefaultProfilePhoto = {
  type: 'remote' as
    |'remote' // photo from server
    |'local', // photo from local storage
  isEmpty: false,
  
  id: '',
  remoteIndex: 0,
  remoteUrl: '',
  name: '',
  mimeType: '',
  
  dataUrl: '',
  
  isCompressed: false,
  compression: undefined as Operation|undefined,
  isDownloaded: false,
  download: undefined as Operation|undefined,
  upload: undefined as Operation|undefined,
}
export type ProfilePhoto = typeof DefaultProfilePhoto
