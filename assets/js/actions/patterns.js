export function setPatternCompletionStatus(patternName, completionStatus) {
    return dispatch => api.post('/patterns', {
        patternName: patternName,
        completed: completionStatus
    })
      .then((response) => {
        dispatch({ type: 'PATTERN_CHANGED_COMPLETION_STATUS', response });
        router.transitionTo(`/r/${response.data.id}`);
      });
  }