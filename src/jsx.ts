import type { Component } from ".";
import { createInitialHook, type State } from "./hooks";

const StateMap: Map<HTMLElement, State> = new Map();

export const jsx = (tag: string | Component, props: object | null, ...children: (string | HTMLElement | HTMLElement[])[]): HTMLElement => {
    if(typeof tag == "string"){
        const el = document.createElement(tag);
        Object.entries(props??{}).forEach(e=>
            /^on/.test(e[0]) ?
                el.addEventListener(e[0].substring(2), e[1]) :
                el.setAttribute(...e));
        el.append(...children.map(e=>
            typeof e == "string" ? new Text(e) : e
        ).flat());
        return el;
    }else{
        return tag(createInitialHook(()=>0)[0], props??{})
    }
}