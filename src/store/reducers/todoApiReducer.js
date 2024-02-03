const todoApiDefaultState = {
    filters: {},
    page: 1,
    limit: 5,
    total: 1,
    sort: 'desc',
    isLoading: false
};

const todoApiReducer = (state = todoApiDefaultState, action) => {
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
