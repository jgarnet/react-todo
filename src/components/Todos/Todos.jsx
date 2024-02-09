import React, {useEffect, useState} from "react";
import Todo from "./Todo/Todo";
import AddTodo from "./AddTodo/AddTodo";
import {useDispatch, useSelector} from "react-redux";
import './Todos.scss';
import {Card, Divider, Header, Icon, Loader} from "semantic-ui-react";
import FilterTodos from "./FilterTodos/FilterTodos";
import PaginateTodos from "./PaginateTodos/PaginateTodos";
import SortTodos from "./SortTodos/SortTodos";
import useFetchTodos from "../../hooks/useFetchTodos";

const Todos = () => {
    // state
    const {
        filters = {},
        sort = 'asc',
        limit = 10,
        page = 1,
        todos = [],
        isLoading
    } = useSelector(state => ({
        filters: state.todoApi.filters,
        sort: state.todoApi.sort,
        limit: state.todoApi.limit,
        page: state.todoApi.page,
        todos: state.todo.todos,
        isLoading: state.todoApi.isLoading
    }));
    const dispatch = useDispatch();
    const setPage = page => dispatch({type: 'PAGE', value: page});
    const [initialized, setInitialized] = useState(false);
    // hooks
    const fetchTodos = useFetchTodos();
    // component mount
    useEffect(() => {
        fetchTodos().finally(() => setInitialized(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // reset page and fetch todos when filters or sort change
    useEffect(() => {
        if (initialized) {
            if (page === 1) {
                fetchTodos();
            } else {
                resetPage();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, sort]);
    // fetch todos when page or limit changes
    useEffect(() => {
        if (initialized) {
            fetchTodos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit]);
    // helpers
    const resetPage = () => {
        setPage(1);
    };

    return (
        <div className="todos">
            <Header as="h2" icon textAlign="center">
                <Icon name="list" circular/>
                <Header.Content>Todos</Header.Content>
            </Header>
            <div className='options'>
                <FilterTodos/>
                <SortTodos/>
            </div>
            <Divider/>
            {todos.map(todo => <Todo key={todo.id} todo={todo} onChange={fetchTodos} />)}
            {todos.length === 0 && <Card description="There are no todos :(" className="fade-in"/>}
            <Divider/>
            <PaginateTodos/>
            <Divider/>
            <AddTodo />
            <Loader active={isLoading} />
        </div>
    );

};

export default Todos;
