import {TodoState} from './todoStore';
import {TodoApiState} from './todoApiStore';

export type GlobalState = {
    todo: TodoState;
    todoApi: TodoApiState;
};
