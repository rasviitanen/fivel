const initialState = {
    states: [],
    todos: [],
    comments: [],
    numTodos: 0,
    numDoing: 0,
    numDone: 0,
    updatedStateId: 0,
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
                updatedStateId: action.stateId,
                comments: action.response.data,
            };

        case 'FETCH_TODOS_SUCCESS':
            var todos_copy = action.response.data;

            var todos = 0;
            var doing = 0;
            var done = 0;

            todos_copy.map((todo) => {
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
                todos: todos_copy,
                updatedStateId: action.stateId,
                numTodos: todos,
                numDoing: doing,
                numDone: done,
            };

        case 'COMMENTS_UPDATED': {
            return {
                ...state,
                updatedStateId: action.stateId,
                comments: action.response.comments,
            }
        }

        case 'TODOS_UPDATED':
            var todos_copy = action.response.todos;

            var todos = 0;
            var doing = 0;
            var done = 0;

            todos_copy.map((todo) => {
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
                todos: todos_copy,
                updatedStateId: action.response.state_id,
                numTodos: todos,
                numDoing: doing,
                numDone: done,
            };

        default:
            return state;
    }
}