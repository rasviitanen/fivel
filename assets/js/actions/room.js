import { Presence } from 'phoenix';
import { reset } from 'redux-form';

const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = [];
  Presence.list(presences, (id, { metas: [first] }) => first.user)
          .map(user => presentUsers.push(user));
  dispatch({ type: 'ROOM_PRESENCE_UPDATE', presentUsers });
};


export function connectToChannel(socket, roomId) {
    return (dispatch) => {
        if (!socket) { return false; }
        const channel = socket.channel(`rooms:${roomId}`);
        let presences = {};

        channel.join().receive('ok', (response) => {
            dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
        });

        channel.on('presence_state', (state) => {
            presences = Presence.syncState(presences, state);
            syncPresentUsers(dispatch, presences);
          });
      
        channel.on('presence_diff', (diff) => {
            presences = Presence.syncDiff(presences, diff);
            syncPresentUsers(dispatch, presences);
        });
            
        channel.on('todo_created', (response) => {
            dispatch({ type: 'TODOS_UPDATED', response });
        });

        channel.on('todo_updated', (response) => {
            dispatch({ type: 'TODOS_UPDATED', response });
        });

        channel.on('todo_deleted', (response) => {
            dispatch({ type: 'TODOS_UPDATED', response });
        });

        channel.on('pattern_changed', (response) => {
            dispatch({ type: 'PATTERN_COMPLETION_CHANGED', response });
        });

        return false;
    };
}

export function sendMessage(channel, actionType, data) {
    return dispatch => new Promise((resolve, reject) => {
        channel.push(actionType, data)
        .receive('ok', () => resolve(
            dispatch(reset('newTodo'))
        ))
        .receive('error', () => reject());
    });
}

export function leaveChannel(channel) {
    return (dispatch) => {
        if (channel) {
        channel.leave();
        }
        dispatch({ type: 'USER_LEFT_ROOM' });
    };
}