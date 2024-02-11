import axios from 'axios';
import getEnvProperty from '@/utils/getEnvProperty';
import ApiOptions from '@/types/apiOptions';
import Todo from '@/types/todo';

const DEFAULT_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const apiCall = (url: string, options?: ApiOptions) => {
    return axios(url, {...DEFAULT_OPTIONS, ...options});
};
const appendParams = (url: string, options: ApiOptions) => {
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
    getTodos: async (options: ApiOptions) => {
        const response = await apiCall(appendParams(defaultUrl, options));
        const todos = await response?.data ?? [];
        // @ts-ignore
        const totalCount = response?.headers?.get('X-Total-Count') ?? 0;
        return {
            todos,
            totalCount
        };
    },
    addTodo: (todo: Todo) => {
        return apiCall(defaultUrl, {
            method: 'POST',
            data: JSON.stringify(todo)
        }).then(res => res.data);
    },
    updateTodo: (todo: Todo) => {
        return apiCall(`${defaultUrl}/${todo.id}`, {
            method: 'PUT',
            data: JSON.stringify(todo)
        }).then(res => res.data);
    },
    removeTodo: (id: string) => {
        return apiCall(`${defaultUrl}/${id}`, {
            method: 'DELETE'
        }).then(res => res.data);
    }
};

export default TodoApi;
