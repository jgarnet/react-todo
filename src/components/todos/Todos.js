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
    }
    componentDidMount() {
        this.fetchTodos();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filters !== this.props.filters) {
            this.fetchTodos(this.props.filters);
        }
    }
    fetchTodos(filters = []) {
        TodoApi.getTodos(todos => {
            this.props.setTodos(todos)
        }, error => {}, () => {
            this.setState({isLoading: false});
        }, {filters, page: this.props.page, limit: this.props.limit});
    }
    filterTodo(todo) {
        if (!!this.props.filters) {
            for (const filter of this.props.filters) {
                for (const [key, value] of Object.entries(filter)) {
                    if (todo[key] !== value) {
                        return false;
                    }
                }
            }
            return true;
        }
        return true;
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
                {this.props.todos
                    .filter(todo => this.filterTodo(todo))
                    .reverse()
                    .map(todo => <Todo key={todo.id} todo={todo} />)
                }
                {this.props.todos.filter(todo => this.filterTodo(todo)).length === 0 &&
                <Card description="There are no todos :(" className="fade-in"/>
                }
                <Divider/>
                <PaginateTodos/>
                <Divider/>
                <AddTodo />
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
        setTodos: todos => dispatch({type: 'SET', todos})
    };
})(Todos);

export default ConnectedTodos;
