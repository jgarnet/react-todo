import {connect} from "react-redux";
import './Todo.scss';
import {Icon} from "semantic-ui-react";
import TodoApi from "../../../api/TodoApi";

const Todo = (props) => {
    const markDone = () => {
        if (!props.todo.done) {
            const updatedTodo = Object.assign({}, props.todo);
            updatedTodo.done = true;
            TodoApi.updateTodo(updatedTodo, () => {
                props.markDone(props.todo);
            });
        }
    };
    const removeTodo = () => {
        TodoApi.removeTodo(props.todo.id, () => {
            document.querySelector(`div[id='${props.todo.id}']`).classList.add('fade-out');
            setTimeout(() => props.removeTodo(props.todo), 200);
        });
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

export default connect(() => {
    return {};
}, dispatch => {
    return {
        removeTodo: todo => dispatch({type: 'REMOVE', todo}),
        markDone: todo => dispatch({type: 'DONE', todo})
    };
})(Todo);
