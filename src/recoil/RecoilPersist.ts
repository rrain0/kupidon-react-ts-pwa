import { AtomEffect } from 'recoil'



export const localStorageEffect: AtomEffect<any> = ({node, setSelf, onSet})=>{
  // local storage stores only strings
  // if no stored, then returns null
  const savedValue = localStorage.getItem(node.key)
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue))
  }
  
  onSet((newValue, oldValue, isReset) => {
    isReset
      ? localStorage.removeItem(node.key)
      : localStorage.setItem(node.key, JSON.stringify(newValue))
  })
}



export const localStorageEffect2: LocalStorageEffect<any> = (props)=>({node, setSelf, onSet})=>{
  const savedValue = localStorage.getItem(node.key)
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue))
  }
  
  onSet((newValue, oldValue, isReset) => {
    
    if (props?.removeWhen?.some(filterNot=>{
      switch (filterNot){
        case 'reset': return isReset
        default: return filterNot(newValue)
      }
    })) {
      localStorage.removeItem(node.key)
      return
    }
    
    localStorage.setItem(node.key, JSON.stringify(newValue))
    
  })
}




export type RemoveWhen<T> = ((data: T)=>boolean) | 'reset'
export type LocalStorageEffect<T> = (props?: {
  // todo 'map' state before filter&write and 'mapBack' after read
  removeWhen?: RemoveWhen<T>[]
})=>AtomEffect<T>



export const objOfEmptyStrOrNullOrUndef: RemoveWhen<object> = (data) => {
  const values = Object.values(data)
  if (!values.length) return true
  return Object.values(data).every(
    val=>[undefined,''].includes(val)
  )
}

export const emptyValOrObj: RemoveWhen<unknown> = (data) => {
  if ([undefined,''].includes(data as any)) return true
  if (data!==null && typeof data === 'object') return objOfEmptyStrOrNullOrUndef(data)
  return false
}



/*
 import { recoilPersist } from 'recoil-persist'
 
 export const { persistAtom } = recoilPersist({
   key: 'recoil-persist', // this key is using to store data in local storage
   storage: localStorage, // configurate which stroage will be used to store the data
 })
 */


/*
 
 export const localStorageEffect0: (key: string) => AtomEffect<any> =
 key => ({setSelf, onSet}) => {
 
 console.log("lkdsjflkjsadlkjflkjasdflkjsdlkfj")
 
 const savedValue = localStorage.getItem(key)
 if (savedValue != null) {
 setSelf(JSON.parse(savedValue))
 }
 
 onSet((newValue, oldValue, isReset) => {
 isReset
 ? localStorage.removeItem(key)
 : localStorage.setItem(key, JSON.stringify(newValue));
 })
 }
 
 */