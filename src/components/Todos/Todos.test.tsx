import {act, cleanup, render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import Todos from './Todos';
import setupStore from '@/store/setupStore';
import {GlobalState} from '@/types/globalStore';
import {Store} from 'redux';
import React from 'react';
import Todo from '@/types/todo';

const mockFetchTodos = {
    invoked: 0
};
jest.mock('@/hooks/useFetchTodos', () => () => {
    return () => {
        mockFetchTodos.invoked++;
        return Promise.resolve();
    };
});
jest.mock('./SortTodos/SortTodos', () => () => <div data-testid='sort'>&nbsp;</div>);
jest.mock('./FilterTodos/FilterTodos', () => () => <div data-testid='filter'>&nbsp;</div>);
jest.mock('./PaginateTodos/PaginateTodos', () => () => <div data-testid='pagination'>&nbsp;</div>);
jest.mock('./AddTodo/AddTodo', () => () => <div data-testid='add'>&nbsp;</div>);
jest.mock('@/utils/getEnvProperty', () => () => 'localhost');

describe('Todos', () => {
    let store: Store<GlobalState>;
    beforeEach(() => {
        store = setupStore();
        mockFetchTodos.invoked = 0;
    });
    afterEach(cleanup);
    const _render = () => render(
        <Provider store={store}>
            <Todos/>
        </Provider>
    );
    it('should render each Todo', async () => {
        const todos = [
            { id: '1', text: 'Todo 1' },
            { id: '2', text: 'Todo 2' }
        ];
        await act(async () => {
            store.dispatch({ type: 'SET', todos });
            _render();
            todos.forEach(todo => {
                const elem = screen.queryByText(todo.text);
                expect(elem).toBeInTheDocument();
            });
        });
    });
    it('should render message when todos is empty', async () => {
        const todos: Todo[] = [];
        await act(async () => {
            store.dispatch({ type: 'SET', todos });
            _render();
            const empty = screen.queryByTestId('todos-empty');
            expect(empty).toBeInTheDocument();
        });
    });
    it('should render Sort', async () => {
        await act(async () => {
            _render();
            const sort = screen.queryByTestId('sort');
            expect(sort).toBeInTheDocument();
        });
    });
    it('should render Filter', async () => {
        await act(async () => {
            _render();
            const filter = screen.queryByTestId('filter');
            expect(filter).toBeInTheDocument();
        });
    });
    it('should render Paginate', async () => {
        await act(async () => {
            _render();
            const pagination = screen.queryByTestId('pagination');
            expect(pagination).toBeInTheDocument();
        });
    });
    it('should render Add', async () => {
        await act(async () => {
            _render();
            const add = screen.queryByTestId('add');
            expect(add).toBeInTheDocument();
        });
    });
    it('should reset the page when filters change', async () => {
        store = setupStore({
            todoApi: {
                page: 2,
                total: 2,
                filters: {}
            }
        });
        await act(async () => {
            const spy = jest.spyOn(store, 'dispatch');
            _render();
            store.dispatch({ type: 'SET_FILTERS', value: { done: true } });
            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith({ type: 'PAGE', value: 1 });
                expect(mockFetchTodos.invoked).toEqual(3);
            });
        });
    });
    it('should reset the page when sort changes', async () => {
        store = setupStore({
            todoApi: {
                page: 2,
                total: 2,
                sort: 'desc'
            }
        });
        await act(async () => {
            const spy = jest.spyOn(store, 'dispatch');
            _render();
            store.dispatch({ type: 'SORT', value: 'asc' });
            await waitFor(() => {
                expect(spy).toHaveBeenCalledWith({ type: 'PAGE', value: 1 });
                expect(mockFetchTodos.invoked).toEqual(3);
            });
        });
    });
    it('should fetch todos when filters change on page 1', async () => {
        store = setupStore({
            todoApi: {
                page: 1,
                total: 1,
                filters: {}
            }
        });
        await act(async () => {
            const spy = jest.spyOn(store, 'dispatch');
            _render();
            store.dispatch({ type: 'SET_FILTERS', value: { done: true } });
            await waitFor(() => {
                expect(spy).not.toHaveBeenCalledWith({ type: 'PAGE', value: 1 });
                expect(mockFetchTodos.invoked).toEqual(2);
            });
        });
    });
    it('should fetch todos when sort changes on page 1', async () => {
        store = setupStore({
            todoApi: {
                page: 1,
                total: 1,
                sort: 'desc'
            }
        });
        await act(async () => {
            const spy = jest.spyOn(store, 'dispatch');
            _render();
            store.dispatch({ type: 'SORT', value: 'asc' });
            await waitFor(() => {
                expect(spy).not.toHaveBeenCalledWith({ type: 'PAGE', value: 1 });
                expect(mockFetchTodos.invoked).toEqual(2);
            });
        });
    });
    it('should fetch todos when page changes', async () => {
        store = setupStore({
            todoApi: {
                page: 1,
                total: 2
            }
        });
        await act(async () => {
            _render();
            store.dispatch({ type: 'PAGE', value: 2 });
            await waitFor(() => {
                expect(mockFetchTodos.invoked).toEqual(3);
            });
        });
    });
    it('should fetch todos when limit changes', async () => {
        store = setupStore({
            todoApi: {
                page: 2,
                total: 2,
                limit: 10
            }
        });
        await act(async () => {
            _render();
            store.dispatch({ type: 'LIMIT', value: 5 });
            await waitFor(() => {
                expect(mockFetchTodos.invoked).toEqual(3);
            });
        });
    });
});
