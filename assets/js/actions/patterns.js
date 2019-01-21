import api from '../api';

export function setPatternCompleted(patternId) {
    return dispatch => api.post(`/patterns/${patternId}/completed`)
        .then((response) => {
        dispatch({ type: 'PATTERN_CHANGED_TO_COMPLETED', response });
    });
}

export function setPatternUncompleted(patternId) {
    return dispatch => api.post(`/patterns/${patternId}/uncompleted`)
        .then((response) => {
        dispatch({ type: 'PATTERN_CHANGED_TO_UNCOMPLETED', response });
    });
}