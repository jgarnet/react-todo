import {useState} from "react";
import Button from "../../button/Button";
import {connect} from "react-redux";
import './AddTodo.scss';

const AddTodo = (props) => {
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);
    const addTodo = () => {
        if (!!!todo) {
            setError('Todo cannot be empty');
        } else if (props.todos.findIndex(t => t.text === todo.trim()) !== -1) {
            setError(`${todo} already exists`);
        } else {
            setError(null);
            props.addTodo(todo.trim());
            setTodo('');
            document.querySelector('input[name=add-todo]').value = '';
        }
    };
    const onKeyDown = e => {
        if (e.keyCode === 13) {
            addTodo();
        }
    };
    return (
        <div className="add-todo">
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                name="add-todo"
                onKeyDown={onKeyDown}
                onChange={(e) => setTodo(e.target.value)} />
            <Button
                text="Add Todo"
                click={addTodo}
                disabled={todo.trim().length === 0}
            />
        </div>
    );
};

export default connect(state => {
    return {
        todos: state.todos
    };
}, dispatch => {
    return {
        addTodo: todo => dispatch({type: 'ADD', todo: {text: todo, done: false}})
    };
})(AddTodo);
