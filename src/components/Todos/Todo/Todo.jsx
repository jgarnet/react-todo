import './Todo.scss';
import {Icon, Loader} from "semantic-ui-react";
import TodoApi from "../../../api/TodoApi";
import {useRef, useState} from "react";

const Todo = (props) => {
    const { todo, onChange } = props;
    const [isLoading, setIsLoading] = useState(false);
    const todoRef = useRef();
    const markDone = () => {
        if (!todo.done && !isLoading) {
            setIsLoading(true);
            const updatedTodo = Object.assign({}, todo);
            updatedTodo.done = true;
            TodoApi
                .updateTodo(updatedTodo)
                .then(onChange)
                .finally(() => setIsLoading(false));
        }
    };
    const removeTodo = () => {
        if (!isLoading && todoRef.current) {
            setIsLoading(true);
            TodoApi.removeTodo(todo.id).then(() => {
                todoRef.current.classList.add('fade-out');
                setTimeout(onChange, 200);
            }).finally(() => setIsLoading(false));
        }
    };
    return (
        <div id={todo.id} data-testid='todo' className={`todo${todo.done ? ' done' : ''} fade-in`} ref={todoRef}>
            <div data-testid='todo-complete' className="todo-check hover-fade" onClick={markDone}>
                <Icon name="check" />
            </div>
            <div className="todo-box">
                <span>{todo.text}</span>
            </div>
            <div data-testid='todo-remove' className="todo-remove hover-fade" onClick={removeTodo}>
                <Icon name='x'/>
            </div>
            <Loader active={isLoading}/>
        </div>
    );
};

export default Todo;
