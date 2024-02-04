import {useRef, useState} from 'react';
import {connect} from 'react-redux';
import './AddTodo.scss';
import {Icon, Input, Loader, Message} from 'semantic-ui-react';
import {v4 as uuidV4} from 'uuid';
import TodoApi from '../../../api/TodoApi';
import useFetchTodos from '../../../hooks/useFetchTodos';

const AddTodo = (props) => {
    // state
    const { isLoading, setIsLoading } = props;
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);
    // hooks
    const fetchTodos = useFetchTodos();
    const inputRef = useRef(null);
    // actions
    const addTodo = () => {
        if (!todo || todo.trim() === '') {
            setError('Todo cannot be empty');
        } else if (!isLoading) {
            setIsLoading(true);
            const newTodo = {id: uuidV4(), text: todo.trim(), done: false, date: new Date().toUTCString()};
            TodoApi.addTodo(newTodo).then(() => {
                setError(null);
                setTodo('');
                fetchTodos().finally(() => inputRef.current.focus());
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
            <Input
                data-testid='Add Todo'
                ref={inputRef}
                icon={<Icon data-testid='Add Todo Icon' name="plus" link onClick={addTodo} disabled={todo.trim().length === 0}/>}
                onKeyDown={onKeyDown}
                onChange={e => setTodo(e.target.value)}
                name="add-todo"
                placeholder="Add Todo"
                disabled={isLoading}
                value={todo}
            />
            <Loader active={isLoading}/>
            {error && <Message data-testid='Add Todo Error' negative className="fade-in"><p>{error}</p></Message>}
        </div>
    );
};

const ConnectedAddTodo = connect(state => {
    return {
        isLoading: state.todoApi.isLoading
    };
}, dispatch => {
    return {
        setIsLoading: isLoading => dispatch({ type: 'LOADING', value: isLoading })
    };
})(AddTodo);

export default ConnectedAddTodo;
