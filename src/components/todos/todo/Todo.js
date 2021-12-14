import './Todo.scss';
import {Icon, Loader} from "semantic-ui-react";
import TodoApi from "../../../api/TodoApi";
import {useState} from "react";
import {connect} from "react-redux";

const Todo = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const markDone = () => {
        if (!props.todo.done && !isLoading) {
            setIsLoading(true);
            const updatedTodo = Object.assign({}, props.todo);
            updatedTodo.done = true;
            TodoApi.updateTodo(
                updatedTodo,
                props.onChange,
                null,
                () => setIsLoading(false)
            );
        }
    };
    const removeTodo = () => {
        const elem = document.querySelector(`div[id='${props.todo.id}']`);
        if (!isLoading && !!elem) {
            setIsLoading(true);
            TodoApi.removeTodo(props.todo.id, () => {
                elem.classList.add('fade-out');
                setTimeout(props.onChange, 200);
            }, null, () => setIsLoading(false));
        }
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
            <Loader active={isLoading}/>
        </div>
    );
};

export default connect(() => {
    return {};
}, dispatch => {
    return {
        markDone: todo => dispatch({type: 'DONE', todo})
    };
})(Todo);
