

/*
  viewport(V)
  
  top(t) left(l) bottom(b) right(r)
  margin(M) border(B) scrollbar(S) padding(P) content-box(C)
  (where content-box(C) is frame for part of margin(M) border(B) scrollbar(S) padding(P) content-box(C) of scrollable child)
  (note: paddings are positioned 'under' content, so you can see content when it is scrolled above paddings)
  (note: distances are gotten from outer boundaries of smth (e.g. border))
  
  When scroll is enabled:
  ● Scrollbars are placed between border and padding
  ● Paddings become scrollable with content
  ● In Firefox right padding is omitted
  
  Useful:
  ● element.getBoundingClientRect()
  ● window.getComputedStyle(element)
  ● ширина вертикального скроллбара: let scrollWidth = div.offsetWidth - div.clientWidth;
 

  WINDOW / VIEWPORT
  ● Get window (viewport):
  const windowObject = window
  const windowObject = document.defaultView
  
  ● Check window:
  windowObject instanceof Window
  
  ● Check any element (html, body, div, ...):
  someHtmlElement instanceof Element
  
  HTML / DOCUMENT
  ● Get document (html):
  const htmlElement = document.documentElement
  const htmlElement = document.querySelector('html')
  
  BODY
  ● Get document body:
  const bodyElement = document.body
  const bodyElement = document.querySelector('body')
*/


function isWindow<T extends {}|null|undefined>(view: T): view is T & Window {
  return view instanceof Window
}

function html(){ return document.documentElement }

export const ElementProps = (element: HTMLElement) => new GetDimensions(element)



export class GetDimensions {
  constructor(public view: HTMLElement | Window) { }
  
  // computed style values after applying all classes and styles
  get computedStyle(): CSSStyleDeclaration {
    if (isWindow(this.view)) return window.getComputedStyle(html())
    return window.getComputedStyle(this.view)
  }
  // css custom property (variable) value
  cssPropValue(propName: string): string {
    return this.computedStyle.getPropertyValue(propName)
  }
  
  // get element bounding rect
  get rect(): DOMRect {
    if (isWindow(this.view)) return html().getBoundingClientRect()
    return this.view.getBoundingClientRect()
  }
  
  
  
  
  // viewport is the window-frame, showing us a part of whole page
  
  // 'page' dimensions - relative page
  // 'client' dimensions - relative viewport - they change if you scroll
  
  // Если масштаб страницы не 100%, значения могут иметь погрешность.
  // Возвращают дробные значения.
  // Float distance from viewport to element border (outer boundary of border)
  
  
  // левый край viewport <---> внешняя граница левого бордера элемента
  // расстояние между левым краем viewport и внешней границей левого бордера
  get clientXFloat(){
    if (isWindow(this.view)) return 0
    // Returns the 'top' coordinate value of the DOMRect
    // (has the same value as 'y', or 'y' + 'height' if 'height' is negative).
    return this.rect.top
  }
  
  // верхний край viewport <---> внешняя граница верхнего бордера элемента
  // расстояние между верхним краем viewport и внешней границей верхнего бордера
  get clientYFloat(){
    if (isWindow(this.view)) return 0
    // Returns the 'left' coordinate value of the DOMRect
    // (has the same value as 'x', or 'x' + 'width' if 'width' is negative).
    return this.rect.left
  }
  
  // расстояние между правым краем viewport и внешней границей правого бордера
  get clientRightFloat(){
    if (isWindow(this.view)) return 0
    return this.rect.right
  }
  
  // расстояние между нижним краем viewport и внешней границей нижнего бордера
  get clientBottomFloat(){
    if (isWindow(this.view)) return 0
    return this.rect.bottom
  }
  
  // расстояние между внешними границами левого и правого бордеров
  get widthFloat(){
    if (isWindow(this.view)) return window.innerWidth
    return Math.abs(this.rect.width)
  }
  
  // расстояние между внешними границами верхнего и нижнего бордеров
  get heightFloat(){
    if (isWindow(this.view)) return window.innerHeight
    return Math.abs(this.rect.height)
  }
  
  
  
  
  
  
  
  // width / height includes border (BSPCPSB)
  // rounded int value
  // Если масштаб страницы не 100%, значения могут иметь погрешность.
  get width(){
    if (isWindow(this.view)) return window.innerWidth
    return this.view.offsetWidth
  }
  get height(){
    if (isWindow(this.view)) return window.innerHeight
    return this.view.offsetHeight
  }
  
  
  
  // width / height of content
  // !!! for <img> works as offset width / height
  // rounded int value
  // Если масштаб страницы не 100%, значения остаются правильными.
  get contentWidth(){
    if (isWindow(this.view)) return html().clientWidth
    return this.view.clientWidth
  }
  get contentHeight(){
    if (isWindow(this.view)) return html().clientHeight
    return this.view.clientHeight
  }
  
  
  
  
  
  
  
  // Ширина / высота  левой / верхней  прокрученной части контента
  // width of horizontal-paddings + part of full content located behind the border-left inner boundary
  get scrollLeft(){
    if (isWindow(this.view)) return window.scrollX
    return this.view.scrollLeft
  }
  // height of vertical-paddings + part of full content located behind the border-top inner boundary
  get scrollTop(){
    if (isWindow(this.view)) return window.scrollY
    return this.view.scrollTop
  }
  // Установка значения scrollTop на 0 или Infinity прокрутит элемент в самый верх/низ соответственно.
  
  
  // max width of horizontal-paddings + content located behind the border-left inner boundary
  // максимальная ширина невидимого контента
  get scrollLeftMax(): number {
    if (isWindow(this.view) || !this.view['scrollLeftMax'])
      return this.scrollWidth-this.contentWidth
    return this.view['scrollLeftMax'] as number
  }
  // max height of vertical-paddings + content located behind the border-top inner boundary
  // максимальная высота невидимого контента
  get scrollTopMax(): number {
    if (isWindow(this.view) || !this.view['scrollTopMax'])
      return this.scrollHeight-this.contentHeight
    return this.view['scrollTopMax'] as number
  }
  
  // width / height includes paddings + full content (not only visible part)
  get scrollWidth(): number {
    if (isWindow(this.view)) return html().scrollWidth
    return this.view.scrollWidth
  }
  get scrollHeight(): number {
    if (isWindow(this.view)) return html().scrollHeight
    return this.view.scrollHeight
  }
  
}

