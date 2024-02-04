import './App.css';
import Todos from "./components/Todos/Todos";
import setupStore from "./store/setupStore";
import {Provider} from "react-redux";

const store = setupStore();

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
