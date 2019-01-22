const initialState = {
    pattern: {},
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'PATTERN_CHANGED_TO_COMPLETED':
            return {
                ...state,
                pattern: action.response.data,
            };
        case 'PATTERN_CHANGED_TO_UNCOMPLETED':

            return {
                ...state,
                pattern: action.response.data,
            };
        default:
            return state;
    }
}