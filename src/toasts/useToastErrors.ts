import { useState } from 'react';
import { Utils } from 'src/utils/Utils';
import SetExclude = Utils.SetExclude;
import { toast } from 'react-toastify';


export const useToastErrors = ()=>{
  
  const [nowShowing, setNowShowing] = useState(new Set<string>())
  
  const setShowing = (showing: Set<string>) => {
    const remove = SetExclude(nowShowing, showing)
    const add = SetExclude(showing,nowShowing)
    
    remove.forEach(v=>toast.dismiss(v))
    
    setNowShowing(showing)
  }
  
  return [setShowing] as const
}