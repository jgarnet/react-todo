import React from "react";
import Todo from "./todo/Todo";
import AddTodo from "./add-todo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';
import {Card, Divider, Header, Icon, Loader} from "semantic-ui-react";
import TodoApi from "../../api/TodoApi";
import FilterTodos from "./filter-todos/FilterTodos";
import PaginateTodos from "./paginate-todos/PaginateTodos";

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.fetchTodos = this.fetchTodos.bind(this);
        this.changePage = this.changePage.bind(this);
        this.resetPage = this.resetPage.bind(this);
    }
    componentDidMount() {
        this.fetchTodos();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filters !== this.props.filters) {
            this.resetPage();
        } else if (prevProps.page !== this.props.page || prevProps.limit !== this.props.limit) {
            this.fetchTodos(this.props.filters);
        }
    }
    fetchTodos(filters = []) {
        TodoApi.getTodos(todos => {
            this.props.setTodos(todos);
            TodoApi.getCount(filters).then(totalCount => {
                this.props.setTotal(Math.max(1, Math.ceil(totalCount / this.props.limit)));
            });
        }, error => {}, () => {
            this.setState({isLoading: false});
        }, {filters, page: this.props.page, limit: this.props.limit});
    }
    changePage(page) {
        this.props.setPage(page);
    }
    resetPage() {
        this.fetchTodos(this.props.filters);
        this.changePage(1);
    }
    render() {
        return (
            <div className="todos">
                <Header as="h2" icon textAlign="center">
                    <Icon name="list" circular/>
                    <Header.Content>Todos</Header.Content>
                </Header>
                <FilterTodos/>
                <Divider/>
                {this.props.todos.map(todo => <Todo key={todo.id} todo={todo} resetPage={this.resetPage} />)}
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
        limit: state.todoApi.limit
    };
}, dispatch => {
    return {
        setTodos: todos => dispatch({type: 'SET', todos}),
        setPage: page => dispatch({type: 'PAGE', value: page}),
        setTotal: total => dispatch({type: 'TOTAL', value: total})
    };
})(Todos);

export default ConnectedTodos;
