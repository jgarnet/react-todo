import './FilterTodos.scss';
import React from "react";
import {connect} from "react-redux";
import {Button, Icon} from "semantic-ui-react";

const selectionFilters = {
    all: {},
    todo: {done: false},
    done: {done: true}
};

class FilterTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'all'
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(selection) {
        if (this.state.selected !== selection) {
            this.setState({
                selected: selection
            });
            this.props.setFilters({...selectionFilters[selection]});
        }
    }
    render() {
        return (
            <div>
                <Icon name='filter'/>
                <Button.Group>
                    {Object.keys(selectionFilters).map(filter => {
                        return (
                        <Button
                            key={filter}
                            active={this.state.selected === filter}
                            onClick={() => this.handleSelect(filter)}>
                            <span className='capitalize'>{filter}</span>
                        </Button>
                        );
                    })}
                </Button.Group>
            </div>
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
