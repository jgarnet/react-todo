import {connect} from "react-redux";
import Button from "../../button/Button";
import './Todo.scss';

const Todo = (props) => {
    const markDone = () => {
        if (!props.todo.done) {
            props.markDone(props.todo);
        }
    };
    return (
        <div className={`todo ${props.todo.done && 'done'}`}>
            <div className="todo-box">
                <input
                    type="checkbox"
                    onClick={markDone}
                    checked={props.todo.done}
                    readOnly={true}
                    disabled={props.todo.done}
                />
                <span>{props.todo.text}</span>
            </div>
            {!props.todo.done &&
            <div className="todo-remove" onClick={() => props.removeTodo(props.todo)}>
                <span>x</span>
            </div>
            }
        </div>
    );
};

export default connect(state => {
    return {};
}, dispatch => {
    return {
        removeTodo: todo => dispatch({type: 'REMOVE', todo}),
        markDone: todo => dispatch({type: 'DONE', todo})
    };
})(Todo);
