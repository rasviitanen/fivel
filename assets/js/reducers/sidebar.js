const initialState = {
    currentRoom: {},
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'ROOM_CONNECTED_TO_CHANNEL':
            return {
                currentRoom: action.response.room,
            };
        case 'USER_LEFT_ROOM':
            return initialState;
        default:
            return state;
    }
}