import api from '../api';

/*
export function fetchAlphas() {
  return dispatch => api.fetch('/essence_alphas')
    .then((response) => {
      dispatch({ type: 'FETCH_ALPHAS_SUCCESS', response });
    });
}
*/
export function fetchAlphas(roomId) {
  return dispatch => api.post(`/rooms/${roomId}/alphas`)
    .then((response) => {
      dispatch({ type: 'FETCH_ALPHAS_SUCCESS', response });
    });
}