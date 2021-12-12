import React from "react";
import Todo from "./todo/Todo";
import AddTodo from "./add-todo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';
import {Card, Header, Icon, Loader} from "semantic-ui-react";
import TodoApi from "../../api/TodoApi";

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        TodoApi.getTodos(todos => {
            this.props.setTodos(todos)
        }, error => {}, () => {
            this.setState({isLoading: false});
        });
    }
    render() {
        return (
            <div className="todos">
                <Header as="h2" icon textAlign="center">
                    <Icon name="list" circular/>
                    <Header.Content>Todos</Header.Content>
                </Header>
                {this.props.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
                {this.props.todos.length === 0 && <Card description="There are no todos :("/>}
                <AddTodo />
                <Loader active={this.state.isLoading} />
            </div>
        );
    }
}

const ConnectedTodos = connect(state => {
    return {
        todos: state.todos
    };
}, dispatch => {
    return {
        setTodos: todos => dispatch({type: 'SET', todos})
    };
})(Todos);

export default ConnectedTodos;
