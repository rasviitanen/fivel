export type Room = {
    id: number,
    name: string,
}

export type State = {
    id: number,
    name: string,
    description: string,
}

export type Pattern = {
    id: number,
    name: string,
    description: string,
    completed: boolean,
}

export type Todo = {
    id: number,
    name: string,
    state: string,
}

export type Alpha = {
    id: number,
    name: string,
    description: string,
    essence_states: Array<State>,
}

