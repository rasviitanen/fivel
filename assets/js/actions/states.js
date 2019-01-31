import api from '../api';
import { reset } from 'redux-form';

export function leaveChannel(channel) {
    return (dispatch) => {
        dispatch({ type: 'UPDATE_PATTERN_COMPLETED' });
    };
}

export function fetchTodos(stateId) {
    return dispatch => api.post(`/states/${stateId}/todos`)
      .then((response) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', response, stateId: stateId });
      });
  }
  
export function fetchComments(stateId) {
    return dispatch => api.post(`/states/${stateId}/comments`)
        .then((response) => {
            dispatch({ type: 'FETCH_COMMENTS_SUCCESS', response, stateId: stateId });
        });
}

export function addTodo(stateId, name) {
    const todo = {"todo": name};
    return dispatch => api.post(`/states/${stateId}/add/todo`, todo)
        .then((response) => {
            dispatch({ type: 'TODOS_UPDATED', response, stateId: stateId });
        });
}

export function changeTodo(stateId, todoId, change) {
    return dispatch => api.post(`/states/${stateId}/todos/${todoId}/update`, change)
        .then((response) => {
            dispatch({ type: 'TODOS_UPDATED', response, stateId: stateId });
        });
}

export function deleteTodo(stateId, todoId) {
    return dispatch => api.post(`/states/${stateId}/todos/${todoId}/delete`)
        .then((response) => {
            dispatch({ type: 'TODOS_UPDATED', response, stateId: stateId });
        });
}

export function addComment(channel, data) {
    return dispatch => new Promise((resolve, reject) => {
        channel.push("create_comment", data)
        .receive('ok', () => resolve(
            dispatch(reset('newComment'))
        ))
        .receive('error', () => reject());
    });
}