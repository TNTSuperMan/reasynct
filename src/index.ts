import type { HookFunction } from "./hooks";

export type Component<T extends object> = (hooks: HookFunction, props: T&object) => HTMLElement;
export type ComponentProps<T> = 
    T extends (hooks: HookFunction, props: infer P) => HTMLElement ? P : object

export { h } from "./jsx"
