export type HookFunction = {
    useState: <T>(initial: T) => [T, (value: T) => void],
    useRef:   <T>(initial: T) => {current: T},
    useEffect: (effect:
        ()=>(void | (()=>void)),
        deps?: unknown[]) => void,
}
export type State = {
    states: any[],
    refs: any[],
    effects: [(()=>void) | void, ...unknown[]][],
    rerender: ()=>void
}
export const createInitialHook = (rerender: ()=>void): [HookFunction, State] => {
    const state: State = { states: [], refs: [], effects: [], rerender }
    return [{
        useState(initial) {
            const thisI = state.states.length;
            state.states.push(initial);
            return [initial, v=>{
                state.states[thisI] = v;
                rerender();
            }]
        },
        useRef(initial) {
            const thisI = state.refs.length;
            state.refs.push(initial);
            return {
                get current(){
                    return state.refs[thisI];
                },
                set current(v){
                    state.refs[thisI] = v;
                }
            }
        },
        useEffect(effect, deps) {
            state.effects.push([effect(), ...deps ?? []]);
        },
    }, state]
}

export const createHook = (state: State): HookFunction => {
    let si = 0, ri = 0, ei = 0;
    return {
        useState(){
            const thisI = si++;
            return [state.states[thisI], v=>{
                state.states[thisI] = v;
                state.rerender();
            }]
        },
        useRef(){
            const thisI = ri++;
            return {
                get current(){
                    return state.refs[thisI];
                },
                set current(v){
                    state.refs[thisI] = v;
                }
            }
        },
        useEffect(effect, deps) {
            const thisI = ei++;
            const executeEffect = () => {
                (state.effects[thisI][0]??(()=>{}))(); //Cleaner or noop
                effect();
            }
            if(deps){
                if(deps.some((e,i)=>state.effects[thisI][i+1]!==e))
                    executeEffect()
            }else executeEffect();
        },
    }
}