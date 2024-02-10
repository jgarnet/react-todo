import {Provider} from 'react-redux';
import Todo from './Todo';
import setupStore from '../../../store/setupStore';
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';

const mockInvocations = {
    update: {},
    remove: ''
};
jest.mock('../../../api/TodoApi', () => ({
    updateTodo: todo => {
        mockInvocations.update = todo;
        return Promise.resolve();
    },
    removeTodo: todoId => {
        mockInvocations.remove = todoId;
        return Promise.resolve();
    }
}));
jest.useFakeTimers();

describe('Todo', () => {
    afterEach(() => {
        cleanup();
        mockInvocations.update = {};
        mockInvocations.remove = '';
    });
    const store = setupStore();
    const _render = props => render(
        <Provider store={store}>
            <Todo {...props} />
        </Provider>
    );
    it('should render todo text', () => {
        _render({ todo: { text: 'Test Todo' } });
        const todoElem = screen.queryByText('Test Todo');
        expect(todoElem).toBeInTheDocument();
    });
    it('should render completed todo if complete', () => {
        _render({ todo: { text: 'Test Todo', done: true } });
        const todoElem = screen.queryByTestId('todo');
        expect(todoElem).toHaveClass('done');
    })
    it('should render complete icon', () => {
        _render({ todo: { text: 'Test Todo' } });
        let completeButton = screen.queryByTestId('todo-complete');
        expect(completeButton).toBeInTheDocument();
        cleanup();
        _render({ todo: { text: 'Test Todo', done: true } });
        completeButton = screen.queryByTestId('todo-complete');
        expect(completeButton).toBeInTheDocument();
    });
    it('should render remove button', () => {
        _render({ todo: { text: 'Test Todo' } });
        let removeButton = screen.queryByTestId('todo-remove');
        expect(removeButton).toBeInTheDocument();
        cleanup();
        _render({ todo: { text: 'Test Todo', done: true } });
        removeButton = screen.queryByTestId('todo-remove');
        expect(removeButton).toBeInTheDocument();
    });
    it('should invoke TodoApi when remove is clicked', async () => {
        let invoked = false;
        const onChange = () => {
            invoked = true;
        };
        const todo = { id: 'test', text: 'Test Todo' };
        _render({ todo, onChange });
        const removeButton = screen.queryByTestId('todo-remove');
        const todoElem = screen.queryByTestId('todo');
        await act(async () => {
            await fireEvent.click(removeButton);
            jest.runAllTimers();
            expect(invoked).toEqual(true);
            expect(mockInvocations.remove).toEqual('test');
            expect(todoElem).toHaveClass('fade-out');
        });
    });
    it('should invoke TodoApi when complete is clicked and todo is not complete', async () => {
        let invoked = false;
        const onChange = () => {
            invoked = true;
        };
        const todo = { id: 'test', text: 'Test Todo' };
        _render({ todo, onChange });
        const completeButton = screen.queryByTestId('todo-complete');
        await act(async () => {
            await fireEvent.click(completeButton);
            expect(invoked).toEqual(true);
            expect(mockInvocations.update).toEqual({ ...todo, done: true });
        });
    });
    it('should not invoke TodoApi when complete is clicked and todo is complete', async () => {
        let invoked = false;
        const onChange = () => {
            invoked = true;
        };
        const todo = { id: 'test', text: 'Test Todo', done: true };
        _render({ todo, onChange });
        const completeButton = screen.queryByTestId('todo-complete');
        await act(async () => {
            await fireEvent.click(completeButton);
            expect(invoked).toEqual(false);
            expect(mockInvocations.update).toEqual({});
        });
    });
});
