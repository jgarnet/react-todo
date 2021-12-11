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
                todos: state.todos.filter(todo => todo.id !== action.todo.id)
            };
        case 'DONE':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.todo.id) {
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
