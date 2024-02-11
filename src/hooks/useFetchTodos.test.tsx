import {cleanup, render, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import useFetchTodos from './useFetchTodos';
import React, {useEffect} from 'react';
import setupStore from '@/store/setupStore';
import TodoApi from '@/api/TodoApi';
import {Store} from 'redux';
import {GlobalState} from '@/types/globalStore';

const TestComponent = () => {
    const fetchTodos = useFetchTodos();
    useEffect(() => {
        fetchTodos();
    }, []);
    return (<div>&nbsp;</div>);
};
jest.mock('@/api/TodoApi');
jest.mock('@/utils/getEnvProperty', () => () => 'localhost');

describe('useFetchTodos', () => {
    const mockStore = {
        todoApi: {
            filters: {
                done: true
            },
            limit: 10,
            sort: 'desc',
            page: 1
        }
    };
    let store: Store<GlobalState>;
    beforeEach(() => {
        mockStore.todoApi = {
            filters: {
                done: true
            },
            limit: 10,
            sort: 'desc',
            page: 1
        };
        store = setupStore(mockStore);
    });
    afterEach(cleanup);
    const _render = () => render(
        <Provider store={store}>
            <TestComponent />
        </Provider>
    );
    const mockResponse = {
        todos: [],
        totalCount: 0
    };
    // @ts-ignore
    TodoApi.getTodos.mockResolvedValue(mockResponse);
    it('should call TodoApi with expected options', () => {
        _render();
        expect(TodoApi.getTodos).toHaveBeenCalledWith({
            done: true,
            _limit: 10,
            _order: 'desc',
            _sort: 'date',
            _page: 1
        });
    });
    it('should set loading on store', async () => {
        const spy = jest.spyOn(store, 'dispatch');
        _render();
        await waitFor(() => {
            expect(spy.mock.calls).toContainEqual([{ type: 'LOADING', value: true }]);
            expect(spy.mock.calls).toContainEqual([{ type: 'LOADING', value: false }]);
        });
    });
    it('should set todos on store', async () => {
        const spy = jest.spyOn(store, 'dispatch');
        _render();
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith({ type: 'SET', todos: [] });
        });
    });
    it('should set total pages on store', async () => {
        const spy = jest.spyOn(store, 'dispatch');
        _render();
        await waitFor(() => {
            expect(spy.mock.calls).toContainEqual([{ type: 'TOTAL', value: 1 }]);
        });
    });
    it('should set reset page if total pages changes', async () => {
        store = setupStore({
            todoApi: {
                ...mockStore.todoApi,
                page: 3
            }
        });
        const spy = jest.spyOn(store, 'dispatch');
        mockResponse.totalCount = 20;
        _render();
        await waitFor(() => {
            expect(spy.mock.calls).toContainEqual([{ type: 'PAGE', value: 2 }]);
        });
    });
});
