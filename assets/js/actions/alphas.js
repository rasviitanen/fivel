import api from '../api';

export function fetchAlphas(roomId) {
  return dispatch => api.post(`/rooms/${roomId}/alphas`)
    .then((response) => {
      dispatch({ type: 'FETCH_ALPHAS_SUCCESS', response });
    });
}

export function fetchStates(alphaId) {
  return dispatch => api.post(`/room/alphas/${alphaId}/states`)
      .then((response) => {
          dispatch({ type: 'FETCH_STATES_SUCCESS', response });
      });
}

export function messageStateCompletionForAlpha(alphaId, stateId, completed) {
  return (dispatch) => {
      dispatch({ type: 'STATE_COMPLETION_CHANGED', alphaId, stateId, completed });
  };
}

export function expandAlpha(alphaId, expand) {
  return (dispatch) => {
      dispatch({ type: 'TOGGLE_ALPHA_EXPANDED', alphaId: alphaId, expand: expand});
  };
}

export function updateInitTodos(stateId, todos) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_TODOS_SUCCESS', response: {data: state.todos}, stateId: stateId });
  };
}