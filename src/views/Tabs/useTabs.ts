import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, {
  useCallback,
  useEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { UserApi } from 'src/api/requests/UserApi'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { GetDimensions } from 'src/utils/common/GetDimensions'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import { useNoSelect } from 'src/utils/react/useNoSelect'
import PartialUndef = TypeUtils.PartialUndef
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import Setter = TypeUtils.Setter
import fitRange2 = MathUtils.fitRange2
import Callback = TypeUtils.Callback
import lastIndex = ArrayUtils.lastIndex
import findLastBy = ArrayUtils.findLastBy
import notExists = TypeUtils.notExists
import last = ArrayUtils.last
import current = UserApi.current





export const DefaultTabIdx = 0


// % ширины viewport в секунду
const speedThreshold = 30
const defaultAutoAnimationDuration = 400
// 'cubic-bezier(0.17,0.84,0.44,1)'
//import BezierEasing from 'bezier-easing'
//const animationEasing = BezierEasing(0.17,0.84,0.44,1)



const dragStartInitialValue = {
  scrollLeft: 0,
  canStart: true,
  isDragging: false,
  lastSpeed: null as number|null,
}


export type TabsStableState =
  |'opened' // showing some tab
export type TabsIntermediateState =
  |'snap' // request to snap to instantly (to tab index)
  
  |'snapping' // request to snap animated / playing snapping animation
  
  |'dragging' // user is dragging tabs
  |'adjusting' // set state & snap according current scrollLeft coordinate
export type TabsState = TabsStableState | TabsIntermediateState


export type TabIdx = number


export type ComputedTabsDimens = {
  frameWidth: number,
}


export type UseTabsOptions = {
  state: TabsState
  setState: Setter<TabsState>
  tabIdx: TabIdx
  setTabIdx: Setter<TabIdx>
} & PartialUndef<{
  animationDuration: number
  defaultOpenIdx: number
}>



export const useTabs = (
  tabsFrameRef: React.RefObject<HTMLElement>,
  options: UseTabsOptions,
) => {
  
  const [initialRender, setInitialRender] = useState(true)
  
  const [computedTabsDimens, setComputedTabsDimens, computedTabsDimensRef] =
    useStateAndRef<ComputedTabsDimens>({
      frameWidth: 0
    })
  
  
  const updateComputedTabsDimens = useCallback(
    ()=>{
      const frame = tabsFrameRef.current
      if (frame){
        const frameD = new GetDimensions(frame)
        setComputedTabsDimens({
          frameWidth: frameD.width,
        })
      }
    },
    [tabsFrameRef.current]
  )
  
  
  useEffect(
    ()=>{
      updateComputedTabsDimens()
      const frame = tabsFrameRef.current
      if (frame){
        const resizeObserver = new ResizeObserver(()=>updateComputedTabsDimens())
        frame && resizeObserver.observe(frame)
        return ()=>resizeObserver.disconnect()
      }
    },
    [tabsFrameRef.current]
  )
  
  
  const [
    tabsCnt, // 0..+inf
    snapPointsPx, // non-zero len
    realDefaultOpenIdx, // 0..+inf
    lastTabIdx, // 0..+inf
    maxScrollLeft, // 0..+inf
  ] =
  useMemo<[
    number,
    number[],
    number,
    number,
    number,
  ]>(
    ()=>{
      
      const tabsCnt = tabsFrameRef.current?.firstElementChild?.childElementCount ?? 0
      const lastTabIdx = Math.max(0,tabsCnt-1)
      
      const snapPointsPx = ArrayUtils.ofIndices(Math.max(tabsCnt,1))
        .map(tab=>tab*computedTabsDimens.frameWidth)
        
      const realDefaultOpenIdx = function(){
        if (notExists(options.defaultOpenIdx)) return DefaultTabIdx
        return fitRange2(
          options.defaultOpenIdx,[0,lastTabIdx]
        )
      }()
      
      const maxScrollLeft = last(snapPointsPx)
      
      return [tabsCnt, snapPointsPx, realDefaultOpenIdx, lastTabIdx, maxScrollLeft] as const
    },
    [tabsFrameRef.current, computedTabsDimens, options.defaultOpenIdx]
  )
  
  
  const [prevState, setPrevState] = useState<TabsState>('opened')
  const [prevTabIdx, setPrevTabIdx] = useState<TabIdx>(0)
  
  const newState = options.state
  const setNewState = options.setState
  const newTabIdx = options.tabIdx
  const setNewTabIdx = options.setTabIdx
  
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  
  
  const dragStartRef = useRef({...dragStartInitialValue})
  const [tabContainerSpring, tabContainerSpringApi] = useSpring(()=>({ scrollLeft: 0 }))
  
  
  
  
  const runAnimation = useCallback(
    (endScrollLeft: number, lastSpeed: number|null, onFinish: Callback)=>{
      const duration = function(){
        console.log('lastSpeed',lastSpeed)
        if (notExists(lastSpeed)) return animationDuration
        const startScrollLeft = tabContainerSpring.scrollLeft.get()
        const pathPercent = pathProgressPercent(startScrollLeft, endScrollLeft)
        return pathPercent/lastSpeed*1.2*1000
      }()
      ;(async()=>{
        const animation = await tabContainerSpring.scrollLeft.start(
          endScrollLeft,
          {
            /* config: {
              duration: duration,
              easing: animationEasing,
            }, */
            config: {
              mass: 1 * duration / 100,
              tension: 500,
              friction: 24,
              clamp: true,
            },
          }
        )
        //console.log('animation',animation)
        if (animation.finished) onFinish()
      })()
    },
    [animationDuration]
  )
  
  
  
  const reactOnState = useEffectEvent(
    ()=>{
      const currState = prevState
      const currTab = prevTabIdx
      const currScrollLeft = tabContainerSpring.scrollLeft.get()
      
      const toTab = function(){
        if (newState==='adjusting')
          return getTabIdxToAdjust(currScrollLeft, snapPointsPx)
        return fitRange2(newTabIdx, [0,lastIndex(snapPointsPx)])
      }()
      
      const toScrollLeft = snapPointsPx[toTab]
      
      
      // prevent unnecessary state changes
      if (newState===currState && newTabIdx===currTab) return
      
      
      
      const toDragging = newState==='dragging'
      const toAnimated =
        (['snapping','adjusting'] as TabsState[]).includes(newState)
      const lastSpeed = function(){
        if (currState!=='dragging') return null
        return dragStartRef.current.lastSpeed
      }()
      
      
      const setStateAndIndex = (s: TabsState, index: TabIdx)=>{
        if (s!=='dragging') dragStartRef.current = {...dragStartInitialValue}
        if (!initialRender){
          setNewState(s)
          setNewTabIdx(index)
        }
        setPrevState(s)
        setPrevTabIdx(index)
        //console.log('setStateAndIndex:',s,index)
      }
      
      
      //console.log('i',i)
      //console.log({ newState, state: prevState, newSnap: toTab, snapIdx: prevTabIdx })
      //console.log({ canClose })
      //console.log({ isOpened, isClosed, toOpened, toClosed })
      
      
      if (toDragging){
        setStateAndIndex('dragging', currTab)
        return
      }
      else if (!toAnimated){
        tabContainerSpring.scrollLeft.set(toScrollLeft)
        setStateAndIndex('opened', toTab)
        return
      }
      else {
        setStateAndIndex('snapping', toTab)
        runAnimation(toScrollLeft, lastSpeed, ()=>{
          setStateAndIndex('opened', toTab)
        })
        return
      }
    }
  )
  useEffect(
    ()=>reactOnState(),
    [newState, newTabIdx, initialRender]
  )
  
  
  
  
  
  // You MUST use css 'touch-action: none;' before start dragging
  // to prevent browser gesture handling
  // noinspection JSVoidFunctionReturnValueUsed
  const tabDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        movement: [mx,my],
        velocity: [spdx,spdy], // px/ms (nonnegative)
        direction: [dirx,diry], // positive for y is from top to bottom
        xy: [vpx,vpy], // viewport scrollLeft, viewport y
      } = gesture
      
      /* console.log(
        'mx:', mx,
        'my:', my,
      ) */
      
      if (first) {
        dragStartRef.current = {...dragStartInitialValue}
        dragStartRef.current.scrollLeft = tabContainerSpring.scrollLeft.get()
      }
      
      const isMoreRadius = Math.hypot(mx,my) >= 5
      const isToSideways = Math.abs(mx) > Math.abs(my)
      
      const isCanDrag = isMoreRadius && isToSideways
      const isCannotStart = isMoreRadius && !isToSideways
      
      /* console.log({
        isMoreRadius, isToSideways,
        isCanDrag, isCannotStart
      }) */
      
      if (!dragStartRef.current.isDragging){
        if (isCannotStart) dragStartRef.current.canStart = false
      }
      if (dragStartRef.current.canStart){
        if (isCanDrag){
          setNewState('dragging')
          dragStartRef.current.canStart = false
          dragStartRef.current.isDragging = true
        }
      }
      
      const newScrollLeft = fitRange2(
        dragStartRef.current.scrollLeft - mx,
        [0, ArrayUtils.last(snapPointsPx)]
      )
      
      if (active && dragStartRef.current.isDragging) {
        tabContainerSpring.scrollLeft.set(newScrollLeft)
      }
      if (last && dragStartRef.current.isDragging){
        // % ширины viewport в секунду
        const speed = pxPerMsToPercentVpHPerS(spdx)
        if (speed>speedThreshold){
          dragStartRef.current.lastSpeed = speed
          if (dirx<0){
            setNewState('snapping')
            setNewTabIdx(Math.min(prevTabIdx+1, lastTabIdx))
          } else {
            setNewState('snapping')
            setNewTabIdx(Math.max(prevTabIdx-1, 0))
          }
        } else {
          setNewState('adjusting')
        }
      }
      
    }
  ) as (...args: any[]) => ReactDOMAttributes
  
  
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(prevState==='dragging')
  
  
  useEffect(()=>setInitialRender(false),[])
  
  
  return {
    computedTabsDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    tabContainerSpring,
    tabDrag,
  } as const
}









// px/ms => (percent of viewport height)/s
function pxPerMsToPercentVpHPerS(pxPerMs: number): number {
  return pxPerMs*1000 / window.innerWidth * 100
}
function pathProgressPercent(start: number, end: number): number {
  return Math.abs(end-start)/window.innerWidth*100
}







function getTabIdxToAdjust
(scrollLeft: number, snapPointsPx: number[]): number {
  const snapStart = findLastBy(snapPointsPx, elem=>scrollLeft>=elem).index
  
  const snapPointsPxInf = [Number.NEGATIVE_INFINITY, ...snapPointsPx, Number.POSITIVE_INFINITY]
  const threshold = Math.round(
    (snapPointsPxInf[snapStart+1] + snapPointsPxInf[snapStart+2]) / 2
  )
  if (scrollLeft>threshold) return snapStart+1
  return snapStart
}


