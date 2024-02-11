import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import AddTodo from './AddTodo';
import setupStore from '@/store/setupStore';
import Todo from '@/types/todo';
import React from 'react';

const mockFetchTodos = {
    pass: true,
    data: {},
    error: null
};
jest.mock('@/hooks/useFetchTodos', () => () => {
    if (mockFetchTodos.pass) {
        return () => Promise.resolve(mockFetchTodos.data);
    } else {
        return () => Promise.reject(mockFetchTodos.error);
    }
});
const mockInvocations: { addTodo: Todo[] } = {
    addTodo: []
};
const mockAddTodo: { pass: boolean, error: string | null } = {
    pass: true,
    error: null
};
jest.mock('@/api/TodoApi', () => ({
    addTodo: (todo: Todo) => {
        mockInvocations.addTodo.push(todo);
        if (mockAddTodo.pass) {
            return Promise.resolve(todo);
        } else {
            return Promise.reject(mockAddTodo.error);
        }
    }
}));

describe('AddTodo tests', () => {

    afterEach(() => {
        cleanup();
        mockInvocations.addTodo = [];
        mockFetchTodos.pass = true;
        mockFetchTodos.error = null;
        mockFetchTodos.data = {};
        mockAddTodo.pass = true;
        mockAddTodo.error = null;
    });
    const store = setupStore({
        todoApi: {
            isLoading: false
        }
    });
    const _render = () => {
        render(
            <Provider store={store}>
                <AddTodo />
            </Provider>
        );
    };
    const testSuccessfulAdd = async (input: any) => {
        await waitFor(async () => {
            const error = await screen.queryByTestId('Add Todo Error');
            expect(error).not.toBeInTheDocument();
            expect(mockInvocations.addTodo.length === 1).toBeTruthy();
            expect(mockInvocations.addTodo[0].text).toEqual('Test');
            expect(mockInvocations.addTodo[0].done).toEqual(false);
            expect(input).toHaveFocus();
        });
    };

    it('should render Add Todo Input', () => {
        _render();
        const input = screen.getByTestId('Add Todo');
        expect(input).toBeInTheDocument();
    });

    it('should invoke TodoApi when enter is pressed with a valid payload', async () => {
        _render();
        const input = screen.getByTestId('Add Todo').children[0];
        await act(async () => {
            await fireEvent.change(input, {target: {value: 'Test'}});
            await fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});
            await testSuccessfulAdd(input);
        });
    });

    it('should invoke TodoApi when icon is clicked with a valid payload', async () => {
        _render();
        const input = screen.getByTestId('Add Todo').children[0];
        await act(async () => {
            const icon = screen.getByTestId('Add Todo Icon');
            await fireEvent.change(input, { target: { value: 'Test' } });
            await fireEvent.click(icon);
            await testSuccessfulAdd(input);
        });
    });

    it('should display error when Todo text is empty', async () => {
        _render();
        const input = screen.getByTestId('Add Todo').children[0];
        await act(async () => {
            await fireEvent.change(input, { target: { value: ' ' } });
            await fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});
            await waitFor(async () => {
                const error = await screen.getByTestId('Add Todo Error');
                expect(mockInvocations.addTodo.length === 0).toBeTruthy();
                expect(error).toBeInTheDocument();
            });
        });
    });

    it('should display error when Add Todo call fails', async () => {
        mockAddTodo.pass = false;
        mockAddTodo.error = 'Test Error';
        _render();
        const input = screen.getByTestId('Add Todo').children[0];
        await act(async () => {
            await fireEvent.change(input, { target: { value: 'Test' } });
            await fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});
            await waitFor(async () => {
                const error = await screen.getByTestId('Add Todo Error');
                expect(error).toBeInTheDocument();
                expect(error).toHaveTextContent('Test Error');
            });
        });
    });

});
