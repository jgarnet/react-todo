import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';
import setupStore from '../../../store/setupStore';
import {Provider} from 'react-redux';
import FilterTodos from './FilterTodos';

describe('FilterTodos', () => {
    afterEach(cleanup);
    const store = setupStore();
    const _render = () => render((
        <Provider store={store}>
            <FilterTodos />
        </Provider>
    ));
    it('should render all filter options', () => {
        _render();
        const filters = ['all', 'todo', 'done'];
        filters.forEach(filter => {
            const filterButton = screen.queryByTestId(`filter-${filter}`);
            expect(filterButton).toBeInTheDocument();
        });
    });
    it('should dispatch filter on click', async () => {
        _render();
        await act(async () => {
            const filters = {
                all: {},
                todo: {done: false},
                done: {done: true}
            };
            for (const filter of Object.keys(filters)) {
                const filterButton = screen.queryByTestId(`filter-${filter}`);
                await fireEvent.click(filterButton);
                expect(store.getState().todoApi.filters).toEqual(filters[filter]);
                expect(filterButton).toHaveClass('active');
            }
        });
    });
});
