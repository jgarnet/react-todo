import React, {useEffect, useState} from "react";
import Todo from "./Todo/Todo";
import AddTodo from "./AddTodo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';
import {Card, Divider, Header, Icon, Loader} from "semantic-ui-react";
import FilterTodos from "./FilterTodos/FilterTodos";
import PaginateTodos from "./PaginateTodos/PaginateTodos";
import SortTodos from "./SortTodos/SortTodos";
import useFetchTodos from "../../hooks/useFetchTodos";

const Todos = props => {

    // state

    const {
        filters = {},
        sort = 'asc',
        limit = 10,
        page = 1,
        todos = [],
        setPage,
        isLoading
    } = props;
    const [initialized, setInitialized] = useState(false);

    // hooks

    const fetchTodos = useFetchTodos();

    useEffect(() => {
        fetchTodos().finally(() => setInitialized(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

const ConnectedTodos = connect(state => {
    return {
        todos: state.todo.todos,
        filters: state.todoApi.filters,
        page: state.todoApi.page,
        limit: state.todoApi.limit,
        sort: state.todoApi.sort,
        total: state.todoApi.total,
        isLoading: state.todoApi.isLoading
    };
}, dispatch => {
    return {
        setPage: page => dispatch({type: 'PAGE', value: page})
    };
})(Todos);

export default ConnectedTodos;