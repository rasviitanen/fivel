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

export function togglePatternInListCompleted(patterns, index) {
    console.log("ran toggle");
    if (patterns[index].completed) {
        return dispatch => api.post(`/patterns/${patterns[index].id}/uncompleted`)
            .then((response) => {
            dispatch({ type: 'PATTERN_LIST_CHANGED', response, patterns, index });
        });
    } else {
        return dispatch => api.post(`/patterns/${patterns[index].id}/completed`)
            .then((response) => {
            dispatch({ type: 'PATTERN_LIST_CHANGED', response, patterns, index });
        });
    }
}


