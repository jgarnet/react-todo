import {TodoAction, TodoState} from '@/types/todoStore';

const todoDefaultState: TodoState = {
    todos: []
};

const todoReducer = (state = todoDefaultState, action: TodoAction) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                todos: [...action.todos ?? []]
            };
        case 'ADD':
            return {
                ...state,
                todos: [...state.todos, action.todo]
            };
        case 'REMOVE':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.todo?.id)
            };
        case 'DONE':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id === action.todo?.id) {
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
