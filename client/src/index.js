import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';

import * as reducers from "./reducers";
import App from './App';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
)

