import setupStore from '../../../store/setupStore';
import {Provider} from 'react-redux';
import SortTodos from './SortTodos';
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';

describe('SortTodos', () => {
    const store = setupStore();
    const _render = () => render((
        <Provider store={store}>
            <SortTodos />
        </Provider>
    ));
    afterEach(cleanup);
    it('should render ASC, DESC sort options', () => {
        _render();
        const sortAsc = screen.queryByTestId('sort-asc');
        const sortDesc = screen.queryByTestId('sort-desc');
        expect(sortAsc).toBeInTheDocument();
        expect(sortDesc).toBeInTheDocument();
    });
    it('should dispatch sort on click', async () => {
        _render();
        await act(async () => {
            const sortAsc = screen.queryByTestId('sort-asc');
            const sortDesc = screen.queryByTestId('sort-desc');
            await fireEvent.click(sortAsc);
            expect(store.getState().todoApi.sort).toEqual('asc');
            expect(sortAsc).toHaveClass('active');
            await fireEvent.click(sortDesc);
            expect(store.getState().todoApi.sort).toEqual('desc');
            expect(sortDesc).toHaveClass('active');
        });
    });
});
