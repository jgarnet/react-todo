import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';
import setupStore from '../../../store/setupStore';
import {Provider} from 'react-redux';
import PaginateTodos from './PaginateTodos';

jest.mock('semantic-ui-react', () => ({
    __esModule: true,
    Pagination: ({ totalPages, activePage, onPageChange }) => {
        return (
            <div data-testid='mock-pagination'>
                <span data-testid='totalPages'>{totalPages}</span>
                <span data-testid='activePage'>{activePage}</span>
                <span data-testid='changePage' onClick={e => onPageChange(e, { activePage: activePage + 1 })}>&nbsp;</span>
            </div>
        );
    }
}));

describe('PaginateTodos', () => {
    afterEach(cleanup);
    const store = setupStore({
        todoApi: {
            total: 2,
            page: 1
        }
    });
    const _render = () => render((
        <Provider store={store}>
            <PaginateTodos />
        </Provider>
    ));
    it('should render Pagination component', () => {
        _render();
        const pagination = screen.queryByTestId('mock-pagination');
        expect(pagination).toBeInTheDocument();
    });
    it('should pass state from store into Pagination', () => {
        _render();
        const activePage = screen.queryByTestId('activePage');
        const totalPages = screen.queryByTestId('totalPages');
        expect(activePage).toHaveTextContent('1');
        expect(totalPages).toHaveTextContent('2');
    });
    it('should dispatch total when page changes from Pagination', async () => {
        _render();
        const changePage = screen.queryByTestId('changePage');
        await act(async () => {
            await fireEvent.click(changePage);
            expect(store.getState().todoApi.page).toEqual(2);
        });
    });
})
