import api from '../api';

export function togglePatternCompleted(pattern) {
    if (pattern.completed) {
        return dispatch => api.post(`/patterns/${pattern.id}/uncompleted`)
            .then((response) => {
            dispatch({ type: 'PATTERN_COMPLETION_CHANGED', response });
        });
    } else {
        return dispatch => api.post(`/patterns/${pattern.id}/completed`)
            .then((response) => {
            dispatch({ type: 'PATTERN_COMPLETION_CHANGED', response });
        });
    }
}

