const initialState = {
    states: [],
    todos: [],
    updatedStateId: 0,
};
  
export default function (state = initialState, action) {    
    switch (action.type) {

        case 'FETCH_STATES_SUCCESS':
            return {
                ...state,
                states: action.response.data.reverse(),
            };

        case 'FETCH_TODOS_SUCCESS':
            var todos_copy = action.response.data.reverse();
            return {
                ...state,
                todos: todos_copy,
                updatedStateId: action.stateId
            };
        case 'TODOS_UPDATED':
            var todos_copy = action.response.data.reverse();
            return {
                ...state,
                todos: todos_copy,
                updatedStateId: action.stateId
            };
        default:
            return state;
    }
}