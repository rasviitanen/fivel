const initialState = {
    all: [],
    stateCompletions: {}, // Includes all states and their completions in a dict
    alphaId: null,
    expand: false,
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALPHAS_SUCCESS':
            return {
                ...state,
                all: action.response.data,
            };

        case 'TOGGLE_ALPHA_EXPANDED':
            return {
                ...state,
                alphaId: action.alphaId,
                expand: !action.expand,
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