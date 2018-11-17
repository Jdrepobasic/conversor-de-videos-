import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import fileReducer from "./reducers/reducers";
import App from './App';


require('dotenv').config();

function configureStore() {
    return createStore(fileReducer,
    applyMiddleware(thunk)
    );
}


ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
    , document.getElementById('root')
)

