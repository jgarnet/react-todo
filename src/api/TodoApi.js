const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url, success, error, finalize, options = DEFAULT_OPTIONS) => {
    fetch(url, options)
        .then(res => res.json())
        .then(success)
        .catch(error)
        .finally(finalize);
};
const appendParams = (url, options) => {
    const params = [{_order: 'desc'}, {_sort: 'date'}];
    if (!!options.filters) {
        params.push(...options.filters);
    }
    if (!!options.page && !!options.limit) {
        params.push({_page: options.page}, {_limit: options.limit})
    }
    if (params.length > 0) {
        url += '?';
        params.forEach(filter => {
            for (const [key, value] of Object.entries(filter)) {
                url += `${key}=${value}&`;
            }
        });
        url = url.substring(0, url.length - 1);
    }
    return url;
};
const defaultUrl = `${process.env.REACT_APP_API_URL}/todos`;
const TodoApi = {
    getTodos: (success, error, finalize, options) => {
        apiCall(appendParams(defaultUrl, options), success, error, finalize)
    },
    getCount: (filters) => {
        return fetch(appendParams(defaultUrl, {filters, limit: 1, page: 1}))
            .then(res => res.headers.get('X-Total-Count'));
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
