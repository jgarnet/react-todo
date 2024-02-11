import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './AddTodo.scss';
import {Icon, Input, Loader, Message} from 'semantic-ui-react';
// @ts-ignore
import {v4 as uuidV4} from 'uuid';
import TodoApi from '@/api/TodoApi';
import useFetchTodos from '@/hooks/useFetchTodos';
import {GlobalState} from '@/types/globalStore';

const AddTodo = () => {
    // state
    const isLoading = useSelector((state: GlobalState) => state.todoApi.isLoading);
    const dispatch = useDispatch();
    const setIsLoading = (isLoading: boolean) => dispatch({type: 'LOADING', value: isLoading});
    const [todo, setTodo] = useState<string>('');
    const [error, setError] = useState<string>('');
    // hooks
    const fetchTodos = useFetchTodos();
    const inputRef = useRef<HTMLInputElement>(null);
    // actions
    const addTodo = () => {
        if (!todo || todo.trim() === '') {
            setError('Todo cannot be empty');
        } else if (!isLoading) {
            setIsLoading(true);
            const newTodo = {id: uuidV4(), text: todo.trim(), done: false, date: new Date().toUTCString()};
            TodoApi.addTodo(newTodo).then(() => {
                setError('');
                setTodo('');
                fetchTodos().finally(() => inputRef.current?.focus());
            }).catch(e => setError(e)).finally(() => setIsLoading(false));
        }
    };
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            addTodo();
        }
    };
    return (
        <div className="add-todo">
            <Input
                data-testid='Add Todo'
                ref={inputRef as any}
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

export default AddTodo;
