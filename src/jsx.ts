import { wind, type Component } from ".";
import { createInitialHook, type State } from "./hooks";
import { elements } from "./jsx-types";
import { ObjEntries } from "./util";

const StateMap: Map<HTMLElement, State> = new Map();

const jsxDOM = <K extends keyof JSX.IntrinsicElements>
    (tag: K, props: typeof elements[K] | null,
    ...children: (string | HTMLElement | HTMLElement[])[]): HTMLElement => {
    const el = wind.document.createElement(tag);
    el.append(...children.flatMap(e=>typeof e == "string" ? new wind.Text(e) : e));
    if(!props) return el;
    
    el.id = props.id ?? "";
    if(Array.isArray(props.className))
        el.classList.add(...props.className)
    else
        el.className = props.className ?? "";
    if(props.style)
        ObjEntries<typeof props.style, string | undefined>(props.style)
            .forEach(e=>{
                if(e[0] != "length" && e[0] != "parentRule" && e[1])
                    Reflect.set(el.style, e[0], e[1])})
    return el;
}

export const h = <T extends object = object, K extends keyof JSX.IntrinsicElements = "none",>
    (tag: K | Component<T>, props: ((typeof elements[K] | null) & T),
        ...children: (string | HTMLElement | HTMLElement[])[]): HTMLElement => {

    if(typeof tag == "string"){
        return jsxDOM(tag, props, ...children);
    }else{
        return tag(createInitialHook(()=>0)[0], props)
    }
}