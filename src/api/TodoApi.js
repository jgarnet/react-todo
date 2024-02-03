const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url, options) => {
    return fetch(url, {...DEFAULT_OPTIONS, ...options});
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
    getTodos: async (options) => {
        const response = await apiCall(appendParams(defaultUrl, options));
        const todos = await response.json();
        return {
            todos,
            totalCount: response.headers.get('X-Total-Count')
        };
    },
    getCount: (filters) => {
        return fetch(appendParams(defaultUrl, {...filters, _limit: 1, _page: 1}))
            .then(res => res.headers.get('X-Total-Count'));
    },
    addTodo: (todo) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify(todo)
        }).then(res => res.json());
    },
    updateTodo: (todo) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo)
        }).then(res => res.json());
    },
    removeTodo: (id) => {
        return apiCall(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
            method: 'DELETE'
        }).then(res => res.json());
    }
};

export default TodoApi;
