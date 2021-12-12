const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url, success, error, finalize, options = DEFAULT_OPTIONS) => {
    fetch(url, options)
        .then(res => res.json())
        .then(res => success(res))
        .catch(e => error(e))
        .finally(finalize);
};
const TodoApi = {
    getTodos: (success, error, finalize) => {
        apiCall(`${process.env.REACT_APP_API_URL}/todos`, success, error, finalize)
    },
    addTodo: (todo, success, error, finalize) => {
        apiCall(`${process.env.REACT_APP_API_URL}/todos`, success, error, finalize, {
            ...DEFAULT_OPTIONS,
            method: 'POST',
            body: JSON.stringify(todo)
        });
    },
    updateTodo: (todo, success, error, finalize) => {
        apiCall(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, success, error, finalize, {
            ...DEFAULT_OPTIONS,
            method: 'PUT',
            body: JSON.stringify(todo)
        });
    },
    removeTodo: (id, success, error, finalize) => {
        apiCall(`${process.env.REACT_APP_API_URL}/todos/${id}`, success, error, finalize, {
            ...DEFAULT_OPTIONS,
            method: 'DELETE'
        });
    }
};

export default TodoApi;
