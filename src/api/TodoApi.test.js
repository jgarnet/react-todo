import axios from 'axios';
import TodoApi from './TodoApi';

jest.mock('axios');
jest.mock('../utils/getEnvProperty', () => () => 'localhost');

describe('TodoApi', () => {
    it('should append query params on getTodos call and return expected payload', async () => {
        const options = { done: true, _order: 'asc', _sort: 'date' };
        axios.mockResolvedValue({
            headers: new Map([
                ['X-Total-Count', 0]
            ]),
            data: []
        });
        const response = await TodoApi.getTodos(options);
        expect(axios).toHaveBeenCalledWith('localhost/todos?done=true&_order=asc&_sort=date', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response.todos).toEqual([]);
        expect(response.totalCount).toEqual(0);
    });
    it('should send JSON todo on addTodo and return expected payload', async () => {
        const todo = { text: 'Test Todo', done: false };
        const result = { id: '1', text: 'Test Todo', done: false };
        axios.mockResolvedValue({
            data: result
        });
        const response = await TodoApi.addTodo(todo);
        expect(axios).toHaveBeenCalledWith('localhost/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(todo)
        });
        expect(response).toEqual(result);
    });
    it('should send JSON todo on updateTodo and return expected payload', async () => {
        const todo = { id: '1', text: 'Test Todo', done: true };
        const result = { id: '1', text: 'Test Todo', done: true };
        axios.mockResolvedValue({
            data: result
        });
        const response = await TodoApi.updateTodo(todo);
        expect(axios).toHaveBeenCalledWith('localhost/todos/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(todo)
        });
        expect(response).toEqual(result);
    });
    it('should send todo ID on removeTodo and return expected payload', async () => {
        const todo = { id: '1', text: 'Test Todo', done: true };
        const result = {};
        axios.mockResolvedValue({
            data: result
        });
        const response = await TodoApi.removeTodo(todo.id);
        expect(axios).toHaveBeenCalledWith('localhost/todos/1', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(response).toEqual(result);
    });
});
