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




const dragStartInitialValue = {
  sheetH: 0,
  isDragging: false,
  lastSpeed: null as number|null,
}



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
  |'adjusting' // set state & snap according current height
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
  
  const [initialRender, setInitialRender] = useState(true)
  
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
  
  
  
  const [
    snapPoints, // non-zero len
    snapPointsPx, // non-zero len
    realFirstOpenIdx, // if sheet can be opened, then realFirstOpenIdx!==null
    realDefaultOpenIdx, // default open idx, if sheet can be opened, then openIdx!==null
    closeIdx, // if there is snap point evaluated to 0, then closeIdx!==null
  ] =
  useMemo<[
    (number|string)[],
    number[],
    number|null,
    number|null,
    number|null,
  ]>(
    ()=>{
      const snapPoints = function(){
        if (options.snapPoints?.length) return options.snapPoints
        return DefaultSheetSnaps
      }()
      
      const snapPointsPx = calculateSnapPointsPx(snapPoints,computedSheetDimens)
      if (!initialRender && snapPointsPx.every(elem=>elem===0))
        console.warn(
          "Every calculated snap point equals 0, bottom sheet cannot be opened."
        )
      
      const firstOpenIdx = function(){
        const f = findBy(snapPointsPx, elem=>elem>0)
        if (!f.isFound) return null
        return f.index
      }()
      
      const realDefaultOpenIdx = function(){
        if (firstOpenIdx===null) return null
        
        const idx = options.defaultOpenIdx ?? null
        
        if (idx!==null) return fitRange2(
          idx,[firstOpenIdx, lastIndex(snapPointsPx)]
        )
        
        if (snapPoints===DefaultSheetSnaps) return DefaultSheetOpenIdx
        
        return Math.ceil((firstOpenIdx + lastIndex(snapPointsPx)) / 2)
      }()
      
      const closeIdx = function(){
        const f = findBy(snapPointsPx, elem=>elem===0)
        if (!f.isFound) return null
        return f.index
      }()
      
      return [snapPoints, snapPointsPx, firstOpenIdx, realDefaultOpenIdx, closeIdx] as const
    },
    [computedSheetDimens, options.defaultOpenIdx, ...(options.snapPoints??[])]
  )
  
  
  const [prevState, setPrevState] = useState<SheetState>(null)
  const [prevSnapIdx, setPrevSnapIdx] = useState<SheetSnapIdx>(null)
  const [prevCloseable, setPrevCloseable] = useState(false)
  
  const newState = options.state
  const setNewState = options.setState
  const newSnapIdx = options.snapIdx
  const setNewSnapIdx = options.setSnapIdx
  const newCloseable = options.closeable ?? true
  
  const animationDuration = options.animationDuration ?? defaultAutoAnimationDuration
  
  
  
  const dragStartRef = useRef({...dragStartInitialValue})
  const [sheetSpring, sheetSpringApi] = useSpring(()=>({ height: 0 }))
  
  
  
  
  const runAnimation = useCallback(
    (endH: number, lastSpeed: number|null, onFinish: Callback)=>{
      const duration = function(){
        //console.log('lastSpeed',lastSpeed)
        if (notExists(lastSpeed)) return animationDuration
        const startH = computedSheetDimensRef.current.sheetH
        sheetSpring.height.set(startH)
        const pathPercent = pathProgressPercent(startH, endH)
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
        if (animation.finished) onFinish()
      })()
    },
    [animationDuration]
  )
  
  
  
  const reactOnState = useEffectEvent(
    ()=>{
      const canOpen = exists(realDefaultOpenIdx)
      const canClose = newCloseable
      
      const currState = prevState
      const currSnap = prevSnapIdx
      const currHeight = computedSheetDimens.sheetH
      
      const toSnap = function(){
        if (newState==='adjusting')
          return getSnapIndexToAdjust(currHeight, snapPoints, snapPointsPx)
        if (newSnapIdx===null) return null
        return fitRange2(newSnapIdx, [0,lastIndex(snapPointsPx)])
      }()
      
      const toHeight = function(){
        if (toSnap===null) return 0
        return snapPointsPx[toSnap]
      }()
      
      const toOpenSnap = function(){
        if (toHeight>0) return toSnap
        if (newState==='adjusting') return realFirstOpenIdx
        return realDefaultOpenIdx
      }()
      const toCloseSnap = closeIdx
      
      const toOpenHeight = function(){
        if (toOpenSnap===null) return 0
        return snapPointsPx[toOpenSnap]
      }()
      const toCloseHeight = function(){
        if (toCloseSnap===null) return 0
        return snapPointsPx[toCloseSnap]
      }()
      
      
      // prevent unnecessary state changes
      if (newState===currState && newSnapIdx===currSnap && newCloseable===prevCloseable) return
      
      
      const isOpened = ![null, 'closed'].includes(prevState)
      const isClosed = [null, 'closed'].includes(prevState)
      const toOpened = function(){
        if (!canOpen) return false
        if (!canClose) return true
        if (newState==='adjusting') return toHeight>0
        return !([null,'closed','closing'] as SheetState[]).includes(newState)
      }()
      const toClosed = function(){
        if (!canClose) return false
        if (!canOpen) return true
        if (newState==='adjusting') return toHeight===0
        return (['closed','closing'] as SheetState[]).includes(newState)
      }()
      
      const toDragging = newState==='dragging'
      const toAnimated =
        (['closing','snapping','opening','adjusting'] as SheetState[]).includes(newState)
      const lastSpeed = function(){
        if (currState!=='dragging') return null
        return dragStartRef.current.lastSpeed
      }()
      const toFreeHeight = function(){
        if (notExists(toOpenSnap)) return false
        if (snapPoints[toOpenSnap]!=='free') return false
        return inRange2(
          sheetSpring.height.get(),
          [
            snapPointsPx[toOpenSnap],
            snapPointsPx[toOpenSnap+1]??Number.POSITIVE_INFINITY
          ]
        )
      }()
      
      const isCloseToOpen = isClosed && toOpened
      const isCloseToClose = isClosed && toClosed
      const isOpenToClose = isOpened && toClosed
      const isOpenToOpen = isOpened && toOpened
      
      
      
      const setStateAndIndex = (s: SheetState, index: SheetSnapIdx)=>{
        if (s!=='dragging') dragStartRef.current = {...dragStartInitialValue}
        if (!initialRender){
          setNewState(s)
          setNewSnapIdx(index)
        }
        setPrevCloseable(newCloseable)
        setPrevState(s)
        setPrevSnapIdx(index)
        //console.log('setStateAndIndex:',s,index)
      }
      
      
      //console.log('i',i)
      //console.log({ newState, state: prevState, newSnap: toSnap, snapIdx: prevSnapIdx })
      //console.log({ canClose })
      //console.log({ isOpened, isClosed, toOpened, toClosed })
      
      
      if (isCloseToOpen){
        if (!toAnimated){
          sheetSpring.height.set(toOpenHeight)
          setStateAndIndex('opened', toOpenSnap)
          return
        }
        else {
          setStateAndIndex('opening', null)
          runAnimation(toOpenHeight, lastSpeed, ()=>{
            setStateAndIndex('opened', toOpenSnap)
          })
          return
        }
      }
      else if (isCloseToClose){
        sheetSpring.height.set(toCloseHeight)
        setStateAndIndex('closed', toCloseSnap)
        return
      }
      else if (isOpenToClose){
        if (!toAnimated){
          sheetSpring.height.set(toCloseHeight)
          setStateAndIndex('closed', toCloseSnap)
          return
        }
        else {
          setStateAndIndex('closing', null)
          runAnimation(toCloseHeight, lastSpeed, () => {
            setStateAndIndex('closed', toCloseSnap)
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
          setStateAndIndex('opened', toOpenSnap)
        }
        else if (!toAnimated){
          sheetSpring.height.set(toOpenHeight)
          setStateAndIndex('opened', toOpenSnap)
          return
        }
        else {
          setStateAndIndex('snapping', null)
          runAnimation(toOpenHeight, lastSpeed, ()=>{
            setStateAndIndex('opened', toOpenSnap)
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
  )
  useEffect(
    ()=>reactOnState(),
    [newState, newSnapIdx, newCloseable, initialRender]
  )
  
  
  
  
  
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
        dragStartRef.current = {...dragStartInitialValue}
        dragStartRef.current.isDragging = true
        dragStartRef.current.sheetH = computedSheetDimensRef.current.sheetH
      }
      const newSheetH = dragStartRef.current.sheetH - my
      if (active && dragStartRef.current.isDragging) {
        sheetSpring.height.set(newSheetH)
      }
      if (last && dragStartRef.current.isDragging){
        dragStartRef.current.isDragging = false
        const speed = pxPerMsToPercentVpHPerS(spdy) // % высоты viewport в секунду
        if (speed>speedThreshold){
          dragStartRef.current.lastSpeed = speed
          if (diry<0){
            setNewState('snapping')
            setNewSnapIdx(lastIndex(snapPoints))
          } else {
            setNewState('closing')
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
    computedSheetDimens,
    snapPointsPx,
    realDefaultOpenIdx,
    sheetSpring,
    sheetDrag,
  } as const
}





// px/ms => (percent of viewport height)/s
function pxPerMsToPercentVpHPerS(pxPerMs: number): number {
  return pxPerMs*1000 / window.innerHeight * 100
}
function pathProgressPercent(start: number, end: number): number {
  return Math.abs(end-start)/window.innerHeight*100
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
(height: number, snapPoints: (number|string)[], snapPointsPx: number[]): number {
  //if (!snapPointsPx.length) return null
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
