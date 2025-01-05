import type { HookFunction } from "./hooks";
export const wind = window;

export type Component<T extends object> = (hooks: HookFunction, props: T&object) => HTMLElement;
export type ComponentProps<T> = 
    T extends (hooks: HookFunction, props: infer P) => HTMLElement ? P : object
