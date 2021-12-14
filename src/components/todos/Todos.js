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
        this.changePage = this.changePage.bind(this);
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
        // todo: decouple sort from date & make it more dynamic
        // todo: add useStore() to TodoApi to simplify API
        const options = {
            filters: this.props.filters,
            page: this.props.page,
            limit: this.props.limit,
            sort: this.props.sort
        };
        this.setState({isLoading: true});
        TodoApi.getTodos(todos => {
            this.props.setTodos(todos);
            this.fetchCount();
        }, () => this.setState({isLoading: false}),
            () => {},
            options);
    }
    fetchCount() {
        TodoApi
            .getCount(this.props.filters, () => {}, () => this.setState({isLoading: false}))
            .then(totalCount => {
                this.props.setTotal(Math.max(1, Math.ceil(totalCount / this.props.limit)));
                if (this.props.page > this.props.total) {
                    this.props.setPage(this.props.total);
                    this.fetchTodos();
                }
            });
    }
    changePage(page) {
        this.props.setPage(page);
    }
    resetPage() {
        this.fetchTodos();
        this.changePage(1);
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
                {this.props.todos.map(todo => <Todo key={todo.id} todo={todo} onRemove={this.fetchTodos} />)}
                {this.props.todos.length === 0 && <Card description="There are no todos :(" className="fade-in"/>}
                <Divider/>
                <PaginateTodos onPageChange={page => this.changePage(page)}/>
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
