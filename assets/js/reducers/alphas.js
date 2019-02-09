const initialState = {
    all: [],
    stateCompletions: {} // Includes all states and their completions in a dict
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALPHAS_SUCCESS':
            return {
                ...state,
                all: action.response.data,
            };

        case 'STATE_COMPLETION_CHANGED':
            var completions = {...state.stateCompletions};
            completions[action.alphaId + ':' + action.stateId] = action.completed;

            return {
                ...state,
                stateCompletions: completions
            };
        default:
            return state;
    }
}