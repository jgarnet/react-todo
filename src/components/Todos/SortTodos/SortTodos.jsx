import {useDispatch, useSelector} from "react-redux";
import {Button, Icon} from "semantic-ui-react";

const SortTodos = () => {
    const sort = useSelector(state => state.todoApi.sort);
    const dispatch = useDispatch();
    const setSort = sort => dispatch({type: 'SORT', value: sort});
    return (
        <div>
            <Icon name='sort'/>
            <Button.Group>
                <Button data-testid='sort-asc' active={sort === 'asc'} onClick={() => setSort('asc')}>ASC</Button>
                <Button data-testid='sort-desc' active={sort === 'desc'} onClick={() => setSort('desc')}>DESC</Button>
            </Button.Group>
        </div>
    );
};

export default SortTodos;
