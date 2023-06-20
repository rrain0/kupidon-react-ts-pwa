import { AtomEffect } from 'recoil'



export const localStorageEffect: AtomEffect<any> = ({node, setSelf, onSet}) => {
  const savedValue = localStorage.getItem(node.key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }
  
  onSet((newValue, oldValue, isReset) => {
    isReset
      ? localStorage.removeItem(node.key)
      : localStorage.setItem(node.key, JSON.stringify(newValue));
  })
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