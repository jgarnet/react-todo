import {createStore} from "redux";
import todoReducer from "./reducers/todoReducer";

const configureStore = () => {
    return createStore(todoReducer);
};

export default configureStore;
