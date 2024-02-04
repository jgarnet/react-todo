import './App.css';
import Todos from "./components/Todos/Todos";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <Todos />
        </div>
    </Provider>
  );
}

export default App;
