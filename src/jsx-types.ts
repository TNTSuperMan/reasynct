    type EventProvider<E extends HTMLElementEventMap> = {
    [key in keyof E]?: (ev: E[key]) => void;
}
type BaseElement<E extends HTMLElementEventMap = HTMLElementEventMap> = {
    style?: {[key in keyof CSSStyleDeclaration]?: string}
    className?: string | string[],
    id?: string,
    on?: EventProvider<E>
}


interface ImageElement extends BaseElement{
    src: string,
    alt: string,
    width?: string | number,
    height?: string | number
}
interface AnchorElement extends BaseElement{
    download?: string,
    href?: string,
}
declare global{
    namespace JSX{
        interface IntrinsicElements {
            h1: BaseElement,
            h2: BaseElement,
            h3: BaseElement,
            h4: BaseElement,
            h5: BaseElement,
            h6: BaseElement,
            p:  BaseElement,
            img:ImageElement,
            a: AnchorElement,
            none: null
        }
    }
}
export const elements: JSX.IntrinsicElements = {
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    p: {},
    img: {src: "", alt: ""},
    a: {},
    none: null
}
