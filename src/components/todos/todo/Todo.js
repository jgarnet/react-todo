import './Todo.scss';
import {Icon} from "semantic-ui-react";
import TodoApi from "../../../api/TodoApi";

const Todo = (props) => {
    const markDone = () => {
        if (!props.todo.done) {
            const updatedTodo = Object.assign({}, props.todo);
            updatedTodo.done = true;
            TodoApi.updateTodo(updatedTodo, props.resetPage);
        }
    };
    const removeTodo = () => {
        TodoApi.removeTodo(props.todo.id, props.resetPage);
    };
    return (
        <div id={props.todo.id} className={`todo${props.todo.done ? ' done' : ''} fade-in`}>
            <div className="todo-check hover-fade" onClick={markDone}>
                <Icon name="check" />
            </div>
            <div className="todo-box">
                <span>{props.todo.text}</span>
            </div>
            {!props.todo.done &&
            <div className="todo-remove hover-fade" onClick={removeTodo}>
                <Icon name='x'/>
            </div>
            }
        </div>
    );
};

export default Todo;
