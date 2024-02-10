import './FilterTodos.scss';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, Icon} from "semantic-ui-react";

const selectionFilters = {
    all: {},
    todo: {done: false},
    done: {done: true}
};

const FilterTodos = () => {
    const dispatch = useDispatch();
    const setFilters = filters => dispatch({type: 'SET_FILTERS', filters});
    const [selected, setSelected] = useState('all');
    const handleSelect = selection => {
        if (selected !== selection) {
            setSelected(selection);
            setFilters({...selectionFilters[selection]});
        }
    }
    return (
        <div data-testid='filter'>
            <Icon name='filter'/>
            <Button.Group>
                {Object.keys(selectionFilters).map(filter => {
                    return (
                        <Button
                            data-testid={`filter-${filter}`}
                            key={filter}
                            active={selected === filter}
                            onClick={() => handleSelect(filter)}>
                            <span className='capitalize'>{filter}</span>
                        </Button>
                    );
                })}
            </Button.Group>
        </div>
    );
};

export default FilterTodos;
