import type { HookFunction } from "./hooks";

export type Component = <T extends object>(hooks: HookFunction, props: T) => HTMLElement;