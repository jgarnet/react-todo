import {useState} from "react";
import {connect} from "react-redux";
import './AddTodo.scss';
import {Icon, Input, Message} from "semantic-ui-react";
import {v4 as uuidv4} from 'uuid';
import TodoApi from "../../../api/TodoApi";

const AddTodo = (props) => {
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);
    const addTodo = () => {
        if (!!!todo || todo.trim() === '') {
            setError('Todo cannot be empty');
        } else {
            const newTodo = {id: uuidv4(), text: todo.trim(), done: false, date: new Date().toUTCString()};
            TodoApi.addTodo(newTodo, todo => {
                setError(null);
                setTodo('');
                document.querySelector('input[name=add-todo]').value = '';
                props.onAdd();
            }, e => setError(e));
        }
    };
    const onKeyDown = e => {
        if (e.keyCode === 13) {
            addTodo();
        }
    };
    return (
        <div className="add-todo">
            {error && <Message negative className="fade-in"><p>{error}</p></Message>}
            <Input
                icon={<Icon name="plus" link onClick={addTodo} disabled={todo.trim().length === 0}/>}
                onKeyDown={onKeyDown}
                onChange={e => setTodo(e.target.value)}
                name="add-todo"
                placeholder="Add Todo"
            />
        </div>
    );
};

const ConnectedAddTodo = connect(state => {
    return {};
}, dispatch => {
    return {
        addTodo: todo => dispatch({type: 'ADD', todo})
    };
})(AddTodo);

export default ConnectedAddTodo;
