import React from "react";
import Todo from "./todo/Todo";
import AddTodo from "./add-todo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';
import {Card, Divider, Header, Icon, Loader} from "semantic-ui-react";
import TodoApi from "../../api/TodoApi";
import FilterTodos from "./filter-todos/FilterTodos";
import PaginateTodos from "./paginate-todos/PaginateTodos";
import SortTodos from "./sort-todos/SortTodos";

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.fetchTodos = this.fetchTodos.bind(this);
        this.fetchCount = this.fetchCount.bind(this);
        this.resetPage = this.resetPage.bind(this);
    }
    componentDidMount() {
        this.fetchTodos();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filters !== this.props.filters || prevProps.sort !== this.props.sort) {
            this.resetPage();
        } else if (prevProps.page !== this.props.page || prevProps.limit !== this.props.limit) {
            this.fetchTodos();
        }
    }
    fetchTodos() {
        // todo: decouple sort from date & make it more dynamic?
        let options = {
            ...this.props.filters,
            _page: this.props.page,
            _limit: this.props.limit,
            _sort: 'date',
            _order: this.props.sort,
        };
        this.setState({isLoading: true});
        TodoApi.getTodos(options).then(todos => {
                this.props.setTodos(todos);
                this.fetchCount();
            }).finally(() => this.setState({isLoading: false}));
    }
    fetchCount() {
        TodoApi
            .getCount(this.props.filters)
            .then(totalCount => {
                this.props.setTotal(Math.max(1, Math.ceil(totalCount / this.props.limit)));
                if (this.props.page > this.props.total) {
                    this.props.setPage(this.props.total);
                    this.fetchTodos();
                }
            }).finally(() => this.setState({isLoading: false}));
    }
    resetPage() {
        this.fetchTodos();
        this.props.setPage(1);
    }
    render() {
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
                {this.props.todos.map(todo => <Todo key={todo.id} todo={todo} onChange={this.fetchTodos} />)}
                {this.props.todos.length === 0 && <Card description="There are no todos :(" className="fade-in"/>}
                <Divider/>
                <PaginateTodos/>
                <Divider/>
                <AddTodo onAdd={this.resetPage} />
                <Loader active={this.state.isLoading} />
            </div>
        );
    }
}

const ConnectedTodos = connect(state => {
    return {
        todos: state.todo.todos,
        filters: state.todoApi.filters,
        page: state.todoApi.page,
        limit: state.todoApi.limit,
        sort: state.todoApi.sort,
        total: state.todoApi.total
    };
}, dispatch => {
    return {
        setTodos: todos => dispatch({type: 'SET', todos}),
        setPage: page => dispatch({type: 'PAGE', value: page}),
        setTotal: total => dispatch({type: 'TOTAL', value: total})
    };
})(Todos);

export default ConnectedTodos;
