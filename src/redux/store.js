import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import inventoryReducer from './reducers';

const store = createStore(inventoryReducer, applyMiddleware(thunkMiddleware));

export default store;
