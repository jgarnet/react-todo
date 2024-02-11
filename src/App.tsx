import './App.scss';
import Todos from './components/Todos/Todos';
import setupStore from './store/setupStore';
import {Provider} from 'react-redux';
import React from 'react';

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
