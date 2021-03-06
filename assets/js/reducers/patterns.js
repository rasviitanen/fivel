
const initialState = {
    patterns: {},
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'PATTERN_COMPLETION_CHANGED':
            var patterns_copy = {...state.patterns};
            patterns_copy[action.response.pattern.data.id] = action.response.pattern.data;
            return {
                ...state,
                patterns: patterns_copy,
            };
        default:
            return state;
    }
}