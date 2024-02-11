import Todo from './todo';

export type TodoState = {
    todos: Todo[];
};

export type TodoAction = {
    type: string;
    todos?: Todo[];
    todo?: Todo;
};
