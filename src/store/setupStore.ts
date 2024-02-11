import {combineReducers} from "redux";
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoReducer';
import todoApiReducer from './reducers/todoApiReducer';

const setupStore = (preloadedState = {}) => {
    return configureStore({
        reducer: combineReducers({
            todo: todoReducer,
            todoApi: todoApiReducer
        }),
        preloadedState
    });
};

export default setupStore;
