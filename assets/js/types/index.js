export type Room = {
    id: number,
    name: string,
}

export type State = {
    id: number,
    name: string,
    description: string,
}

export type Alpha = {
    id: number,
    name: string,
    description: string,
    essence_states: Array<State>,
}

