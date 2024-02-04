import {useState} from "react";
import {connect} from "react-redux";
import './AddTodo.scss';
import {Icon, Input, Loader, Message} from "semantic-ui-react";
import {v4 as uuidV4} from 'uuid';
import TodoApi from "../../../api/TodoApi";
import useFetchTodos from "../../../hooks/useFetchTodos";

const AddTodo = () => {
    // state
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // hooks
    const fetchTodos = useFetchTodos();
    // actions
    const addTodo = () => {
        if (!!!todo || todo.trim() === '') {
            setError('Todo cannot be empty');
        } else if (!isLoading) {
            setIsLoading(true);
            const newTodo = {id: uuidV4(), text: todo.trim(), done: false, date: new Date().toUTCString()};
            TodoApi.addTodo(newTodo).then(() => {
                setError(null);
                setTodo('');
                document.querySelector('input[name=add-todo]').value = '';
                fetchTodos();
            }).catch(e => setError(e)).finally(() => setIsLoading(false));
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
                disabled={isLoading}
            />
            <Loader active={isLoading}/>
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
