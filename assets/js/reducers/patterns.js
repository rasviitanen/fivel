const initialState = {
    all: []
  };
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'PATTERN_CHANGED_TO_COMPLETED':
            return {
                all: action.response.data.completed,
            };
        case 'PATTERN_CHANGED_TO_UNCOMPLETED':
            return {
                all: action.response.data.completed,
            };
        default:
            return state;
    }
}