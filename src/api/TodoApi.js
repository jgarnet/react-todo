const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url, options = DEFAULT_OPTIONS) => {
    return fetch(url, options);
};
const appendParams = (url, options) => {
    if (!!options) {
        url += '?';
        for (const [key, value] of Object.entries(options)) {
            url += `${key}=${value}&`;
        }
        url = url.substring(0, url.length - 1);
    }
    return url;
};
const defaultUrl = `${process.env.REACT_APP_API_URL}/todos`;
const TodoApi = {
    getTodos: (options) => {
        return apiCall(appendParams(defaultUrl, options)).then(res => res.json());
    },
    getCount: (filters) => {
        return fetch(appendParams(defaultUrl, {...filters, _limit: 1, _page: 1}))
            .then(res => res.headers.get('X-Total-Count'));
    },
    addTodo: (todo) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos`, {
            ...DEFAULT_OPTIONS,
            method: 'POST',
            body: JSON.stringify(todo)
        }).then(res => res.json());
    },
    updateTodo: (todo) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
            ...DEFAULT_OPTIONS,
            method: 'PUT',
            body: JSON.stringify(todo)
        }).then(res => res.json());
    },
    removeTodo: (id) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
            ...DEFAULT_OPTIONS,
            method: 'DELETE'
        }).then(res => res.json());
    }
};

export default TodoApi;
