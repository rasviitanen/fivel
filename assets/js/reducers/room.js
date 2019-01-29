const initialState = {
    channel: null,
    currentRoom: {},
    presentUsers: []
};
  
export default function (state = initialState, action) {
    switch (action.type) {
        case 'ROOM_CONNECTED_TO_CHANNEL':
            return {
                ...state,
                channel: action.channel,
                currentRoom: action.response.room,
            };
        case 'USER_LEFT_ROOM':
            return initialState;
        case 'ROOM_PRESENCE_UPDATE':
            return {
                ...state,
                presentUsers: action.presentUsers,
        };
        default:
            return state;
    }
}