import {connect} from "react-redux";
import {Button, Icon} from "semantic-ui-react";

const SortTodos = props => {
    return (
        <div>
            <Icon name='sort'/>
            <Button.Group>
                <Button active={props.sort === 'asc'} onClick={() => props.setSort('asc')}>ASC</Button>
                <Button active={props.sort === 'desc'} onClick={() => props.setSort('desc')}>DESC</Button>
            </Button.Group>
        </div>
    );
};

const ConnectedSortTodos = connect(state => {
    return {
        sort: state.todoApi.sort
    };
}, dispatch => {
    return {
        setSort: sort => dispatch({type: 'SORT', value: sort})
    };
})(SortTodos);

export default ConnectedSortTodos;
