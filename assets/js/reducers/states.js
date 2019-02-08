const initialState = {
    states: [],
    todos: [],
    comments: [],
    numTodos: 0,
    numDoing: 0,
    numDone: 0,
    updatedStateId: 0,
    updatedCommentsForStateId: 0,
};
  
export default function (state = initialState, action) {    
    switch (action.type) {

        case 'FETCH_STATES_SUCCESS':
            return {
                ...state,
                states: action.response.data.reverse(),
            };

        case 'FETCH_COMMENTS_SUCCESS':
            return {
                ...state,
                updatedCommentsForStateId: action.stateId,
                comments: action.response.data,
            };

        case 'FETCH_TODOS_SUCCESS':
            var todos = 0;
            var doing = 0;
            var done = 0;

            action.response.data.map((todo) => {
                if (todo.state === "todo") {
                    todos += 1;
                } else if (todo.state === "doing") {
                    doing += 1;
                } else {
                    done += 1;
                }
            });
            return {
                ...state,
                todos: action.response.data,
                updatedStateId: action.stateId,
                numTodos: todos,
                numDoing: doing,
                numDone: done,
            };

        case 'COMMENTS_UPDATED': {
            return {
                ...state,
                updatedCommentsForStateId: action.response.state_id,
                comments: action.response.comments,
            }
        }

        case 'TODOS_UPDATED':
            var todos = 0;
            var doing = 0;
            var done = 0;

            action.response.todos.map((todo) => {
                if (todo.state === "todo") {
                    todos += 1;
                } else if (todo.state === "doing") {
                    doing += 1;
                } else {
                    done += 1;
                }
            });

            return {
                ...state,
                todos: action.response.todos,
                updatedStateId: action.response.state_id,
                numTodos: todos,
                numDoing: doing,
                numDone: done,
            };

        default:
            return state;
    }
}