import axios from 'axios';
import getEnvProperty from '../utils/getEnvProperty';

const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url, options) => {
    return axios(url, {...DEFAULT_OPTIONS, ...options});
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
const defaultUrl = `${getEnvProperty('VITE_APP_API_URL')}/todos`;
const TodoApi = {
    getTodos: async (options) => {
        const response = await apiCall(appendParams(defaultUrl, options));
        const todos = await response.data;
        return {
            todos,
            totalCount: response.headers.get('X-Total-Count')
        };
    },
    addTodo: (todo) => {
        return apiCall(defaultUrl, {
            method: 'POST',
            data: JSON.stringify(todo)
        }).then(res => res.data);
    },
    updateTodo: (todo) => {
        return apiCall(`${defaultUrl}/${todo.id}`, {
            method: 'PUT',
            data: JSON.stringify(todo)
        }).then(res => res.data);
    },
    removeTodo: (id) => {
        return apiCall(`${defaultUrl}/${id}`, {
            method: 'DELETE'
        }).then(res => res.data);
    }
};

export default TodoApi;
