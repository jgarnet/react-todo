import {combineReducers, createStore} from "redux";
import todoReducer from "./reducers/todoReducer";
import todoApiReducer from "./reducers/todoApiReducer";

const configureStore = () => {
    return createStore(combineReducers({
        todo: todoReducer,
        todoApi: todoApiReducer
    }));
};

export default configureStore;
