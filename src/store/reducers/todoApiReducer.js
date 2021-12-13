const todoApiDefaultState = {
    filters: [],
    page: 1,
    limit: 5,
    total: 1,
    sort: 'desc'
};

const todoApiReducer = (state = todoApiDefaultState, action) => {
    switch (action.type) {
        case 'ADD_FILTER':
            return {
                ...state,
                filters: [...state.filters, action.filter]
            };
        case 'REMOVE_FILTER':
            return {
                ...state,
                filters: state.filter(filter => filter !== action.filter)
            };
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.filters
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
