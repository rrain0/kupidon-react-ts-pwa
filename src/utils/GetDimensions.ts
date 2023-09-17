

/*
    viewport(V)

    top(t) left(l) bottom(b) right(r)
    margin(M) border(B) scrollbar(S) padding(P) content-box(C)
        (where content-box(C) is frame for part of margin(M) border(B) useScrollbar(S) padding(P) content-box(C) of scrollable child)
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
*/




export class GetDimensions {
    constructor(public domElement: HTMLElement) { }
    
    
    get computedStyle(){
        return window.getComputedStyle(this.domElement)
    }
    cssPropValue(propName: string){
      return this.computedStyle.getPropertyValue(propName)
    }
    

    private _rect: DOMRect|undefined
    get rect(){ return this._rect ??= this.domElement.getBoundingClientRect() }
    
    
    
    
    // viewport is the window-frame, showing us a part of whole page
    
    // 'page' dimensions - relative page
    // 'client' dimensions - relative viewport - they change if you scroll
    
    // Если масштаб страницы не 100%, значения могут иметь погрешность.
    // Возвращают дробные значения.
    
    // расстояние между левым краем viewport и внешней границей левого бордера
    get clientX(){ return this.rect.x }
    // расстояние между верхним краем viewport и внешней границей верхнего бордера
    get clientY(){ return this.rect.y }
    // расстояние между правым краем viewport и внешней границей правого бордера
    get clientRight(){ return this.right }
    // расстояние между нижним краем viewport и внешней границей нижнего бордера
    get clientBottom(){ return this.bottom }
    
    // расстояние между внешними границами левого и правого бордеров
    get width(){ return this.rect.width }
    // расстояние между внешними границами верхнего и нижнего бордеров
    get height(){ return this.rect.height }
    
    
    
    
    
    
    


    
    
    // float distance from viewport to element border (outer boundary of border)

    // viewport top to element top (V->B)
    // clientY
    get top(){ return this.rect.top }
    get viewportTopToBorderTop(){ return this.top }

    // viewport left to element left (V->B)
    // clientX
    get left(){ return this.rect.left }
    get viewportLeftToBorderLeft(){ return this.left }

    // viewport top to element bottom (V->BSPCPSB)
    get bottom(){ return this.rect.bottom }
    get viewportTopToBorderBottom(){ return this.bottom }

    // viewport left to element right (V->BSPCPSB)
    get right(){ return this.rect.right }
    get viewportLeftToBorderRight(){ return this.right }



    // width / height includes border (BSPCPSB)
    // rounded int value
    // Если масштаб страницы не 100%, значения могут иметь погрешность.
    get widthRounded(){ return this.domElement.offsetWidth }
    get heightRounded(){ return this.domElement.offsetHeight }



    // width / height of content
    // !!! for <img> works as offset width / height
    // rounded int value
    // Если масштаб страницы не 100%, значения остаются правильными.
    get contentWidthRounded(){ return this.domElement.clientWidth }
    get contentHeightRounded(){ return this.domElement.clientHeight }

    
    
    
    
    
    
    

    // Ширина / высота  левой / верхней  прокрученной части контента
    // width of horizontal-paddings + part of full content located behind the border-left inner boundary
    get scrollLeft(){ return this.domElement.scrollLeft }
    // height of vertical-paddings + part of full content located behind the border-top inner boundary
    get scrollTop(){ return this.domElement.scrollTop }
    // Установка значения scrollTop на 0 или Infinity прокрутит элемент в самый верх/низ соответственно.


    // max width of horizontal-paddings + content located behind the border-left inner boundary
    // максимальная ширина невидимого контента
    // !!! non-standard
    get scrollLeftMax(){
        // @ts-ignore
        return this.domElement.scrollLeftMax as number|undefined
          ?? this.scrollWidth-this.contentWidthRounded
    }
    // max height of vertical-paddings + content located behind the border-top inner boundary
    // максимальная высота невидимого контента
    // !!! non-standard
    get scrollTopMax(){
        // @ts-ignore
        return this.domElement.scrollTopMax as number|undefined
          ?? this.scrollHeight-this.contentHeightRounded
    }

    // width / height includes paddings + full content (not only visible part)
    get scrollWidth(){ return this.domElement.scrollWidth }
    get scrollHeight(){ return this.domElement.scrollHeight }
}



export const ElementProps = (element: HTMLElement) => new GetDimensions(element)