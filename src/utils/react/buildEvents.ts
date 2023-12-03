import { ObjectUtils } from 'src/utils/common/ObjectUtils'
import ObjectValuesType = ObjectUtils.ObjectValuesType
import ObjectKeysType = ObjectUtils.ObjectKeysType



type EventNameToType = {
  onPointerDown: React.PointerEvent
  onPointerMove: React.PointerEvent
  onPointerCancel: React.PointerEvent
  onPointerUp: React.PointerEvent
  onPointerOut: React.PointerEvent
  
  onClick: React.MouseEvent<any, MouseEvent>
  onWheel: React.WheelEvent
}

type AllEventNames = ObjectKeysType<EventNameToType>
type AllEvents = ObjectValuesType<EventNameToType>





export class EventBuilder<E extends AllEventNames> {
  private currEventNames: E[] = []
  private eventsMap!: Map<AllEventNames,((ev: AllEvents)=>void)[]>
  
  
  events
  <Names extends AllEventNames>
  (...events: Names[]){
    const builder = new EventBuilder<Names>()
    builder.currEventNames = events
    builder.eventsMap = this.eventsMap
    return builder
  }
  handlers(...handlers: ((ev: EventNameToType[E])=>void)[]){
    this.eventsMap ??= new Map()
    this.currEventNames.forEach(name=>{
      if (!this.eventsMap.has(name)) this.eventsMap.set(name,[])
      this.eventsMap.get(name)!.push(...handlers as any)
    })
    return this
  }
  build(){
    return [...this.eventsMap.entries()].reduce(
      (acc,[evName,evHandlers])=>{
        acc[evName] = (ev: any)=>{
          evHandlers.forEach(handler=>handler(ev))
        }
        return acc
      },
      {}
    )
  }
}



export const eventBuilder = ()=>new EventBuilder()



