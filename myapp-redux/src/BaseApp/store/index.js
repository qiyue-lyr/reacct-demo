import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logger from 'redux-logger';
import thunk from 'redux-thunk'

import curUser from './reducer/curUser'
import items from './reducer/items'
import cart from './reducer/cart'

const reducers = combineReducers({
    curUser,
    items,
    cart
})

// const store = createStore(
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && 
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk,logger))//logger一定要放在最后，否则输出结果会不正确。
);

export default store;


