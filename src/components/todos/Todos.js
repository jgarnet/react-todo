import Todo from "./todo/Todo";
import AddTodo from "./add-todo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';
import {Card, Header, Icon} from "semantic-ui-react";

const Todos = (props) => {
    return (
        <div className="todos">
            <Header as="h2" icon textAlign="center">
                <Icon name="list" circular/>
                <Header.Content>Todos</Header.Content>
            </Header>
            {props.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
            {props.todos.length === 0 && <Card description="There are no todos :("/>}
            <AddTodo />
        </div>
    );
};

const ConnectedTodos = connect(state => {
    return {
        todos: state.todos
    };
})(Todos);

export default ConnectedTodos;
