export const ObjKeys = <O extends object>(target: O): (keyof O)[] => {
    const keys: any = Object.keys(target);
    return keys;
}

export const ObjEntries = <O extends object, T = unknown>(target: O): [keyof O, T][] => {
    const entries: any = Object.entries(target);
    return entries;
}
