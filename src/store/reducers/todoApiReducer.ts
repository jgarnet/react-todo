import {TodoApiAction, TodoApiState} from '@/types/todoApiStore';

const todoApiDefaultState: TodoApiState = {
    filters: {},
    page: 1,
    limit: 5,
    total: 1,
    sort: 'desc',
    isLoading: false
};

const todoApiReducer = (state = todoApiDefaultState, action: TodoApiAction) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.filters
            };
        case 'LOADING':
            return {
                ...state,
                isLoading: action.value
            };
        case 'PAGE':
        case 'LIMIT':
        case 'TOTAL':
        case 'SORT':
            return {
                ...state,
                [action.type.toLowerCase()]: action.value
            };
        default:
            return state;
    }
};

export default  todoApiReducer;
