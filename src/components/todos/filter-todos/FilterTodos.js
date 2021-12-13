import React from "react";
import {connect} from "react-redux";
import {Button} from "semantic-ui-react";

const selectionFilters = {
    all: [],
    todo: [{done: false}],
    done: [{done: true}]
};

class FilterTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'all'
        };
        this.selectAll = this.selectAll.bind(this);
        this.selectTodo = this.selectTodo.bind(this);
        this.selectDone = this.selectDone.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    selectAll() {
        this.handleSelect('all');
    }
    selectTodo() {
        this.handleSelect('todo');
    }
    selectDone() {
        this.handleSelect('done');
    }
    handleSelect(selection) {
        if (this.state.selected !== selection) {
            this.setState({
                selected: selection
            });
            this.props.setFilters([...selectionFilters[selection]]);
        }
    }
    render() {
        return (
            <Button.Group>
                <Button active={this.state.selected === 'all'} onClick={this.selectAll}>All</Button>
                <Button active={this.state.selected === 'todo'} onClick={this.selectTodo}>Todo</Button>
                <Button active={this.state.selected === 'done'} onClick={this.selectDone}>Done</Button>
            </Button.Group>
        );
    }
}

const ConnectedFilterTodos = connect(state => {
    return {};
}, dispatch => {
    return {
        setFilters: filters => dispatch({type: 'SET_FILTERS', filters})
    };
})(FilterTodos);

export default ConnectedFilterTodos;
