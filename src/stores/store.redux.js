import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import orderReducer from '../modules/order/reducers/reducer.order';
import productReducer from '../modules/product/reducers/reducer.product';
import cartReducer from '../modules/cart/reducers/reducer.cart';
import globalReducer from '../modules/commons/reducers/reducer.global';

import rootSaga from '../middleware/sagas/root.saga';

const rootReducer = combineReducers({
    order:orderReducer,
    product:productReducer,
    cart : cartReducer,
    global : globalReducer
})

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;