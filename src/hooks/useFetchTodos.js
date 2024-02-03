import TodoApi from "../api/TodoApi";
import {useDispatch, useSelector} from "react-redux";

const useFetchTodos = () => {
    const { page, limit, sort, filters } = useSelector(state => ({
        page: state.todoApi.page,
        limit: state.todoApi.limit,
        sort: state.todoApi.sort,
        filters: state.todoApi.filters
    }));
    const dispatch = useDispatch();
    // Todo: decouple sort from date & make it more dynamic?
    let options = {
        ...filters,
        _page: page,
        _limit: limit,
        _sort: 'date',
        _order: sort,
    };
    return () => {
        dispatch({ type: 'LOADING', value: true });
        return TodoApi.getTodos(options).then(data => {
            const { todos, totalCount } = data;
            dispatch({ type: 'SET', todos });
            const totalPages = Math.max(1, Math.ceil(totalCount / limit));
            dispatch({ type: 'TOTAL', value: totalPages });
            if (page > totalPages) {
                dispatch({ type: 'PAGE', value: totalPages });
            }
        }).finally(() => dispatch({ type: 'LOADING', value: false }));
    };
};

export default useFetchTodos;
