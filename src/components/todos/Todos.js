import Todo from "./todo/Todo";
import AddTodo from "./add-todo/AddTodo";
import {connect} from "react-redux";
import './Todos.scss';

const Todos = (props) => {
    return (
        <div className="todos">
            <h2>Todos</h2>
            {props.todos.map((todo, index) => <Todo key={`${todo}-${index}`} todo={todo} />)}
            {props.todos.length === 0 && 'There are no Todos :('}
            <AddTodo />
        </div>
    );
};

export default connect(state => {
    return {
        todos: state.todos
    };
})(Todos);
