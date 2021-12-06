const todoDefaultState = {
    todos: []
};

const todoReducer = (state = todoDefaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };
        case 'REMOVE':
            return {
                ...state,
                todos: state.todos.filter(todo => todo !== action.todo)
            };
        case 'DONE':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.text === action.todo.text) {
                        return {
                            ...todo,
                            done: true
                        };
                    }
                    return todo;
                })
            };
        default:
            return state;
    }
};

export default todoReducer;
