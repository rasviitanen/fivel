import api from '../api';

export function leaveChannel(channel) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_PATTERN_COMPLETED' });
    };
}

export function fetchTodos(stateId) {
    return dispatch => api.post(`/states/${stateId}/todos`)
      .then((response) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', response });
      });
  }
  
export function addTodo(stateId, name) {
    const todo = {"todo": name};
    return dispatch => api.post(`/states/${stateId}/add/todo`, todo)
        .then((response) => {
            dispatch({ type: 'TODOS_UPDATED', response });
        });
}

export function deleteTodo(stateId, todoId) {
    return dispatch => api.post(`/states/${stateId}/todos/${todoId}/delete`)
        .then((response) => {
            dispatch({ type: 'TODOS_UPDATED', response });
        });
}