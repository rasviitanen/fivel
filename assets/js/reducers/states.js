const initialState = {
    states: [],
  };
  
export default function (state = initialState, action) {    
    switch (action.type) {

        case 'FETCH_STATES_SUCCESS':
            return {
                ...state,
                states: action.response.data.reverse(),
            };
        default:
            return state;
    }
}