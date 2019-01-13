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