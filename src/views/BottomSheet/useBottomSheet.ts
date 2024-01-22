import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/src/types'
import React, {
  useCallback,
  useEffect,
  useMemo, useRef,
  useState,
} from 'react'
import { ArrayUtils } from 'src/utils/common/ArrayUtils'
import { GetDimensions } from 'src/utils/common/GetDimensions'
import { MathUtils } from 'src/utils/common/MathUtils'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import { useEffectEvent } from 'src/utils/react/useEffectEvent'
import fitRange = MathUtils.fitRange
import { useNoSelect } from 'src/utils/react/useNoSelect'
import { CssUtils } from 'src/utils/common/CssUtils'
import parseCssValue = CssUtils.parseCssStringValue
import CssValue = CssUtils.CssValue
import PartialUndef = TypeUtils.PartialUndef
import { useStateAndRef } from 'src/utils/react/useStateAndRef'
import Setter = TypeUtils.Setter
import findLastBy3 = ArrayUtils.findLastBy3
import exists = TypeUtils.exists
import findBy3 = ArrayUtils.findBy3
import fitRange2 = MathUtils.fitRange2
import Callback = TypeUtils.Callback
import lastIndex = ArrayUtils.lastIndex
import findLastBy = ArrayUtils.findLastBy
import findBy = ArrayUtils.findBy
import inRange2 = MathUtils.inRange2
import notExists = TypeUtils.notExists





export const DefaultSheetSnaps = [0,'15%'/*200*/,'free','fit-content','free','50%','free','80%']
export const DefaultSheetOpenIdx = 3


// % высоты viewport в секунду
const speedThreshold = 50
const defaultAutoAnimationDuration = 400
// 'cubic-bezier(0.17,0.84,0.44,1)'
//import BezierEasing from 'bezier-easing'
//const animationEasing = BezierEasing(0.17,0.84,0.44,1)




/*
 maybe it’s worth adding the ability to go to a specific height, not just to snap point
 */
/*
bugs:
 todo Move to callbacks - new state via props, but actual state will be stored inside sheet
   with callbacks on state changes
 todo Maybe move to callbacks instead of exposing state because of unnecessary rerenders
 
 todo Adjust sheet if real sheet height does not match state
 todo when dragging close, open button is not working for a long time
 */

export type SheetStableState =
  |null // like 'closed' but when sheet can't be opened & can't be closed & sheet is not closable
  |'opened' // sheet is opened
  |'closed' // sheet is closed
export type SheetIntermediateState =
  |'open' // request to open instantly (if 'closed') (open to snap-index)
  |'close' // request to close instantly (if not 'closed' or not 'closing')
  |'snap' // request to snap to instantly (to snap-index)
  
  |'opening' // request to open animated / playing opening animation
  |'closing' // request to close animated / playing closing animation
  |'snapping' // request to snap animated / playing snapping animation
  
  |'dragging' // user is dragging the sheet
export type SheetState = SheetStableState | SheetIntermediateState


export type SheetSnapPoints = (number | string)[]
export type SheetSnapIdx = number | null


export type ComputedBottomSheetDimens = {
  frameH: number,
  sheetH: number,
  headerH: number,
  contentH: number,
  headerAndContentH: number,
}


export type UseBottomSheetOptions = {
  state: SheetState
  setState: Setter<SheetState>
  snapIdx: SheetSnapIdx
  setSnapIdx: Setter<SheetSnapIdx>
} & PartialUndef<{
  snapPoints: SheetSnapPoints
  animationDuration: number
  closeable: boolean
  defaultOpenIdx: number
}>



export const useBottomSheet = (
  bottomSheetFrameRef: React.RefObject<HTMLElement>,
  bottomSheetRef: React.RefObject<HTMLElement>,
  bottomSheetHeaderRef: React.RefObject<HTMLElement>,
  bottomSheetContentRef: React.RefObject<HTMLElement>,
  options: UseBottomSheetOptions,
) => {
  
  const [computedSheetDimens, setComputedSheetDimens, computedSheetDimensRef] =
    useStateAndRef<ComputedBottomSheetDimens>({
      frameH: 0,
      sheetH: 0,
      headerH: 0,
      contentH: 0,
      headerAndContentH: 0,
    })
  
  
  const updateComputedSheetDimens = useCallback(
    ()=>{
      const frame = bottomSheetFrameRef.current
      const sheet = bottomSheetRef.current
      const header = bottomSheetHeaderRef.current
      const content = bottomSheetContentRef.current
      if (frame && sheet && header && content){
        const frameD = new GetDimensions(frame)
        const sheetD = new GetDimensions(sheet)
        const headerD = new GetDimensions(header)
        const contentD = new GetDimensions(content)
        setComputedSheetDimens({
          frameH: frameD.height,
          sheetH: sheetD.height,
          headerH: headerD.height,
          contentH: contentD.height,
          headerAndContentH: headerD.height+contentD.height,
        })
      }
    },
    [
      bottomSheetFrameRef.current,
      bottomSheetRef.current,
      bottomSheetHeaderRef.current,
      bottomSheetContentRef.current,
    ]
  )
  
  
  useEffect(
    ()=>{
      updateComputedSheetDimens()
      const frame = bottomSheetFrameRef.current
      const sheet = bottomSheetRef.current
      const header = bottomSheetHeaderRef.current
      const content = bottomSheetContentRef.current
      if (frame || sheet || header || content){
        const resizeObserver = new ResizeObserver(()=>updateComputedSheetDimens())
        frame && resizeObserver.observe(frame)
        sheet && resizeObserver.observe(sheet)
        header && resizeObserver.observe(header)
        content && resizeObserver.observe(content)
        return ()=>resizeObserver.disconnect()
      }
    },
    [
      bottomSheetFrameRef.current,
      bottomSheetRef.current,
      bottomSheetHeaderRef.current,
      bottomSheetContentRef.current,
      updateComputedSheetDimens,
    ]
  )
  
  
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  const closeable = options.closeable ?? true
  
  
  
  const [
    snapPoints,
    snapPointsPx,
    openIdx, // if sheet can be opened, then openIdx!==null
    closeIdx, // if there is snap point evaluated to 0, then closeIdx!==null
  ] =
  useMemo<[(number|string)[], number[], number|null, number|null]>(
    ()=>{
      const snapPoints = function(){
        if (options.snapPoints?.length) return options.snapPoints
        return DefaultSheetSnaps
      }()
      
      const snapPointsPx = calculateSnapPointsPx(snapPoints,computedSheetDimens)
      if (snapPointsPx.every(elem=>elem===0)) console.warn(
        "Every calculated snap point equals 0, bottom sheet cannot be opened."
      )
      
      const openIdx = function(){
        const firstNonZeroIdx = function(){
          const f = findBy(snapPointsPx, elem=>elem>0)
          if (!f.isFound) return null
          return f.index
        }()
        if (firstNonZeroIdx===null) return null
        
        const idx = options.defaultOpenIdx ?? null
        
        if (idx!==null) return fitRange2(
          idx,[firstNonZeroIdx, lastIndex(snapPointsPx)]
        )
        
        if (snapPoints===DefaultSheetSnaps) return DefaultSheetOpenIdx
        
        return Math.ceil((firstNonZeroIdx + lastIndex(snapPointsPx)) / 2)
      }()
      
      const closeIdx = function(){
        const f = findBy(snapPointsPx, elem=>elem===0)
        if (!f.isFound) return null
        return f.index
      }()
      
      return [snapPoints, snapPointsPx, openIdx, closeIdx] as const
    },
    [computedSheetDimens, options.defaultOpenIdx, ...(options.snapPoints??[])]
  )
  
  
  // TODO immediately assign outer state
  const [state,setState] = useState<SheetState>(null)
  const [snapIdx, setSnapIdx] = useState<SheetSnapIdx>(null)
  const [initialRender, setInitialRender] = useState(true)
  
  
  const newState = options.state
  const setNewState = options.setState
  const newSnapIdx = options.snapIdx
  const setNewSnapIdx = options.setSnapIdx
  
  
  const dragStartStateRef = useRef({ isDragging: false, sheetH: 0 })
  const [lastSpeed, setLastSpeed] = useState(undefined as undefined|number)
  const [sheetSpring, sheetSpringApi] = useSpring(()=>({ height: 0 }))
  
  
  
  
  const runAnimation = useCallback(
    (endH: number, onFinish: Callback)=>{
      const duration = function(){
        if (!lastSpeed) return animationDuration
        const startH = sheetSpring.height.get()
        const pathPercent = Math.abs(endH-startH)/window.innerHeight*100
        return pathPercent/lastSpeed*1.2*1000
      }()
      ;(async()=>{
        const animation = await sheetSpring.height.start(
          endH,
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
        setLastSpeed(undefined)
        if (animation.finished) onFinish()
      })()
    },
    [animationDuration, lastSpeed]
  )
  
  
  
  // TODO synchronize snapIdx and make new value 'closed' (always if closed)
  const reactOnState = useEffectEvent(
    ()=>{
      const canOpen = exists(openIdx)
      const canClose = closeable
      
      const currState = state
      const currSnap = snapIdx
      const currHeight = computedSheetDimens.sheetH
      
      const currOpened = currState!=='closed' && currState!==null
      const currClosed = currState==='closed'
      const currNull = currState===null
      
      const rawNewState = newState
      const rawNewSnap = newSnapIdx
      let newSt = rawNewState
      const newSnap = rawNewSnap===null
        ? null
        : fitRange2(rawNewSnap, [0,lastIndex(snapPointsPx)])
      const newHeight = (
        newSnap===null ? null : snapPointsPx[newSnap]
      ) ?? 0
      
      const realOpenIdx = function(){
        if (newHeight>0) return newSnap
        return openIdx
      }()
      const realCloseIdx = closeIdx
      
      const realOpenH = realOpenIdx===null ? 0 : snapPointsPx[realOpenIdx]
      const realCloseH = realCloseIdx===null ? 0 : snapPointsPx[realCloseIdx]
      
      
      const setStateAndIndex = (s: SheetState, index: SheetSnapIdx)=>{
        if (s!=='dragging') dragStartStateRef.current.isDragging = false
        if (!initialRender){
          setNewState(s)
          setNewSnapIdx(index)
        }
        setState(s)
        setSnapIdx(index)
        console.log('setStateAndIndex:',s,index)
      }
      
      
      // prevent unnecessary state changes
      if (rawNewState===currState && rawNewSnap===currSnap) return
      
      
      if (true){
        const isOpened = ![null, 'closed'].includes(state)
        const isClosed = [null, 'closed'].includes(state)
        const toOpened = function(){
          if (!canOpen) return false
          if (!canClose) return true
          return !([null,'closed','closing'] as SheetState[]).includes(rawNewState)
        }()
        const toClosed = function(){
          if (!canClose) return false
          if (!canOpen) return true
          return (['closed','closing'] as SheetState[]).includes(rawNewState)
        }()
        const toDragging = rawNewState==='dragging'
        const toAnimated = (['closing','snapping','opening'] as SheetState[]).includes(rawNewState)
        const toFreeHeight = function(){
          if (notExists(realOpenIdx)) return false
          if (snapPoints[realOpenIdx]!=='free') return false
          return inRange2(
            sheetSpring.height.get(),
            [
              snapPointsPx[realOpenIdx],
              snapPointsPx[realOpenIdx+1]??Number.POSITIVE_INFINITY
            ]
          )
        }()
        
        const isCloseToOpen = isClosed && toOpened
        const isCloseToClose = isClosed && toClosed
        const isOpenToClose = isOpened && toClosed
        const isOpenToOpen = isOpened && toOpened
        
        
        
        
        //console.log('i',i)
        console.log({ newState, state, newSnap, snapIdx })
        console.log({ canClose })
        console.log({ isOpened, isClosed, toOpened, toClosed })
        
        
        if (isCloseToOpen){
          if (!toAnimated){
            sheetSpring.height.set(realOpenH)
            setStateAndIndex('opened', realOpenIdx)
            return
          }
          else {
            setStateAndIndex('opening', null)
            runAnimation(realOpenH, ()=>{
              setStateAndIndex('opened', realOpenIdx)
            })
            return
          }
        }
        else if (isCloseToClose){
          sheetSpring.height.set(realCloseH)
          setStateAndIndex('closed', realCloseIdx)
          return
        }
        else if (isOpenToClose){
          if (!toAnimated){
            sheetSpring.height.set(realCloseH)
            setStateAndIndex('closed', realCloseIdx)
            return
          }
          else {
            setStateAndIndex('closing', null)
            runAnimation(realCloseH, () => {
              setStateAndIndex('closed', realCloseIdx)
            })
            return
          }
        }
        else if (isOpenToOpen){
          if (toDragging){
            setStateAndIndex('dragging', currSnap)
            return
          }
          else if (toFreeHeight){
            setStateAndIndex('opened', realOpenIdx)
          }
          else if (!toAnimated){
            sheetSpring.height.set(realOpenH)
            setStateAndIndex('opened', realOpenIdx)
            return
          }
          else {
            setStateAndIndex('snapping', null)
            runAnimation(realOpenH, ()=>{
              setStateAndIndex('opened', realOpenIdx)
            })
            return
          }
        }
        else {
          sheetSpring.height.set(0)
          setStateAndIndex(null,null)
          return
        }
      }
      
      // prevents infinite loops if any bug exists
      /* for (let i = 0; i < 10; i++) {
        
        //console.log('i',i)
        //console.log({ newSt, currState, newSnap, newHeight, snapIdx, currClosed })
        
        // if (newSt===currState && newSnap===snapIdx) {
        //   setStateAndIndex(newSt,newSnap)
        //   return
        // }
        if (false) {
          if (false) {} else if (!canClose && !canOpen) newSt = null
          
          // open instantly
          else if (newSt === 'open') {
            if (currClosed && newHeight > 0) {
              sheetSpring.height.set(newHeight)
              setStateAndIndex('opened', newSnap ?? 0)
              return
            } else if (currClosed && newHeight === 0) newSt = 'closed'
            else if (!currClosed && newHeight !== 0) newSt = 'snap'
            else if (!currClosed && newHeight === 0) newSt = 'close'
          }
          
          // open animated
          else if (newSt === 'opening') {
            if (currClosed && newHeight !== 0) {
              setStateAndIndex('opening', newSnap ?? 0)
              runAnimation(newHeight, () => {
                setStateAndIndex('opened', newSnap ?? 0)
              })
              return
            } else if (currClosed && newHeight === 0) newSt = 'closed'
            else if (!currClosed && newHeight !== 0) newSt = 'snapping'
            else if (!currClosed && newHeight === 0) newSt = 'closing'
          }
          
          // close instantly
          else if (newSt === 'close') {
            if (!currClosed) {
              sheetSpring.height.set(0)
              setStateAndIndex('closed', closeIdx)
              return
            } else if (currClosed) newSt = 'closed'
          }
          
          // close animated
          else if (newSt === 'closing') {
            if (!currClosed) {
              setStateAndIndex('closing', newSnap ?? 0)
              runAnimation(0, () => {
                setStateAndIndex('closed', closeIdx)
              })
              return
            } else if (currClosed) newSt = 'closed'
          }
          
          // snap instantly
          else if (newSt === 'snap') {
            if (!currClosed && newHeight !== 0) {
              sheetSpring.height.set(newHeight)
              setStateAndIndex('opened', newSnap ?? 0)
              return
            } else if (!currClosed && newHeight === 0) newSt = 'close'
            else if (currClosed && newHeight !== 0) newSt = 'open'
            else if (currClosed && newHeight === 0) newSt = 'closed'
          }
          
          // snap animated
          else if (newSt === 'snapping') {
            if (!currClosed && newHeight !== 0) {
              setStateAndIndex('snapping', newSnap ?? 0)
              runAnimation(newHeight, () => {
                setStateAndIndex('opened', newSnap ?? 0)
              })
              return
            } else if (!currClosed && newHeight === 0) newSt = 'closing'
            else if (currClosed && newHeight !== 0) newSt = 'opening'
            else if (currClosed && newHeight === 0) newSt = 'closed'
          }
          
          // dragging
          else if (newSt === 'dragging') {
            setStateAndIndex('dragging', newSnap ?? 0)
            return
          }
          
          // opened
          else if (newSt === 'opened') {
            setStateAndIndex('opened', newSnap ?? 0)
            return
          }
          
          // closed
          else if (newSt === 'closed') {
            setStateAndIndex('closed', closeIdx)
            return
          }
          
          // null
          else if (newSt === null) {
            sheetSpring.height.set(0)
            setStateAndIndex(null, null)
            return
          }
        }
      } */
    }
  )
  useEffect(
    ()=>reactOnState(),
    [newState, newSnapIdx, closeable, initialRender]
  )
  useEffect(()=>setInitialRender(false),[])
  
  
  // You MUST use css 'touch-action: none;' before start dragging
  // to prevent browser gesture handling
  // noinspection JSVoidFunctionReturnValueUsed
  const sheetDrag = useDrag(
    gesture=>{
      const {
        first, active, last,
        movement: [mx,my],
        velocity: [spdx,spdy], // px/ms (nonnegative)
        direction: [dirx,diry], // positive for y is from top to bottom
        xy: [vpx,vpy], // viewport x, viewport y
      } = gesture
      
      /* console.log(
        'velocityY:', spdy,
        'directionY:', diry,
      ) */
      
      if (first) {
        setNewState('dragging')
        dragStartStateRef.current.isDragging = true
        dragStartStateRef.current.sheetH = computedSheetDimensRef.current.sheetH
      }
      const newSheetH = dragStartStateRef.current.sheetH - my
      if (active && dragStartStateRef.current.isDragging) {
        sheetSpring.height.set(newSheetH)
      }
      if (last && dragStartStateRef.current.isDragging){
        dragStartStateRef.current.isDragging = false
        const speed = pxPerMsToPercentVpHPerS(spdy) // % высоты viewport в секунду
        if (speed>speedThreshold){
          setLastSpeed(speed)
          if (diry<0){
            setNewState('snapping')
            setNewSnapIdx(lastIndex(snapPoints))
          } else {
            setNewState('closing')
          }
        } else {
          const snapIdxToAdjust = getSnapIndexToAdjust(newSheetH, snapPoints, snapPointsPx)
          console.log('snapIdxToAdjust',snapIdxToAdjust)
          if (snapIdxToAdjust===null) setNewState('opened')
          else {
            setNewState('snapping')
            setNewSnapIdx(snapIdxToAdjust)
          }
        }
      }
      
    }
  ) as (...args: any[]) => ReactDOMAttributes
  
  
  
  
  // forbid content selection for all elements while dragging
  useNoSelect(state==='dragging')
  
  
  
  return {
    computedSheetDimens,
    snapPointsPx,
    sheetSpring,
    sheetDrag,
  } as const
}





// px/ms => (percent of viewport height)/s
function pxPerMsToPercentVpHPerS(pxPerMs: number): number {
  return pxPerMs*1000 / window.innerHeight * 100
}


function calculateSnapPointsPx(
  snapPoints: (number|string)[],
  computedSheetDimens: ComputedBottomSheetDimens,
): number[] {
  const allowedUnits = ['px','',undefined,'%']
  const allowedKeywords = ['fit-content','fit-header','free']
  const snapPointsCssValues = snapPoints.map(it=>{
    const cssValue = parseCssValue(it+'')
    if (
      !cssValue
      || (cssValue.type==='keyword' && !allowedKeywords.includes(cssValue.value))
      || (cssValue.type==='numeric' && !allowedUnits.includes(cssValue.unit))
    ) cssValueParsingError(it, cssValue)
    return cssValue
  })
  
  const snapPointsPx: (number|undefined)[] = Array(snapPoints.length).fill(undefined)
  
  ;[['px','',undefined],['%'],['fit-content','fit-header'],['free']].forEach(units=>{
    snapPointsCssValues.forEach((cssValue,cssValueI)=>{
      
      if (
        (cssValue.type==='keyword' && !units.includes(cssValue.value))
        || (cssValue.type==='numeric' && !units.includes(cssValue.unit))
      ) return
      
      let computed = function(){
        if (cssValue.type==='keyword') {
          switch (cssValue.value) {
            case 'fit-content':
              return computedSheetDimens.headerAndContentH
            case 'fit-header':
              return computedSheetDimens.headerH
            case 'free':
              return 0 // will be adjusted
            default:
              cssValueParsingError(snapPoints[cssValueI], cssValue)
          }
        }
        if (cssValue.type==='numeric') {
          switch (cssValue.unit) {
            case 'px':
            case '':
            case undefined:
              return fitRange(
                0,
                +cssValue.value,
                computedSheetDimens.frameH,
              )
            case '%':
              return fitRange(
                0,
                Math.round(+cssValue.value / 100 * computedSheetDimens.frameH),
                computedSheetDimens.frameH,
              )
            default:
              cssValueParsingError(snapPoints[cssValueI], cssValue)
          }
        }
        cssValueParsingError(snapPoints[cssValueI], cssValue)
      }()
      
      const left = findLastBy3({
        arr: snapPointsPx,
        filter: elem=>exists(elem),
        startIdx: cssValueI-1,
        orElse: Number.NEGATIVE_INFINITY,
      }).elem as number
      const right = findBy3({
        arr: snapPointsPx,
        filter: elem=>exists(elem),
        startIdx: cssValueI+1,
        orElse: Number.POSITIVE_INFINITY,
      }).elem as number
      computed = fitRange2(computed,[left,right])
      
      snapPointsPx[cssValueI] = computed
    })
  })
  return snapPointsPx as number[]
}



function cssValueParsingError(raw: string|number, parsed: CssValue|undefined): never {
  throw new Error(
    `Supported units:
    ● 'px' - just raw pixels
    ● number - will be 'px' - just raw pixels with type 'number'
    ● '' - empty string - will be 'px'
    ● '%' - % of height of element in frameRef
    Supported keywords:
    ● 'fit-header' - height of element in headerRef
    ● 'fit-content' - height of element in headerRef + height of element in contentRef
    ● 'free' - indicates that between prev & next snap point
      bottom sheet won't be automatically snapped to nearest snap point after dragging
    ✖ And your input: {
      raw: ${raw},
      parsed: ${JSON.stringify(parsed)}
    }`
  )
}



function getSnapIndexToAdjust
(height: number, snapPoints: (number|string)[], snapPointsPx: number[]): number|null {
  if (!snapPointsPx.length) return null
  const snapStart = findLastBy(snapPointsPx, elem=>height>=elem).index
  
  if (snapPoints[snapStart]==='free') return snapStart
  //if (height===snapPointsPx[snapStart]) return null
  
  const snapPointsPxInf = [Number.NEGATIVE_INFINITY, ...snapPointsPx, Number.POSITIVE_INFINITY]
  const threshold = Math.round(
    (snapPointsPxInf[snapStart+1] + snapPointsPxInf[snapStart+2]) / 2
  )
  if (height>threshold) return snapStart+1
  return snapStart
}



/*
function getOpenSnapIndexToAdjust
(height: number, snapPoints: (number|string)[], snapPointsPx: number[]): number|null {
  if (!snapPointsPx.length) return null
  const snapStart = findLastBy(snapPointsPx, elem=>elem>0 && height>=elem).index
  if (snapStart===-1) return null
  
  // if (snapPoints[snapStart]==='free') return null
  // if (height===snapPointsPx[snapStart]) return null
  //
  // const snapPointsPxInf = [Number.NEGATIVE_INFINITY, ...snapPointsPx, Number.POSITIVE_INFINITY]
  // const threshold = Math.round(
  //   (snapPointsPxInf[snapStart+1] + snapPointsPxInf[snapStart+2]) / 2
  // )
  // if (height>threshold) return snapStart+1
  return snapStart
}
*/
