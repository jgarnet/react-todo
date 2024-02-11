import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';
import App from './App';

jest.mock('./components/Todos/Todos', () => () => <div>Mock Todos</div>);
jest.mock('./store/setupStore', () => () => {});
jest.mock('react-redux', () => ({
  __esModule: true,
  Provider: jest.fn((props) => <div data-testid='Provider'>{props.children}</div>)
}));

describe('App tests', () => {
  afterEach(cleanup);
  test('renders Todos', () => {
    render(<App />);
    const provider = screen.getByTestId('Provider');
    const todos = screen.getByText('Mock Todos');
    expect(provider).toBeInTheDocument();
    expect(todos).toBeInTheDocument();
  });
});
