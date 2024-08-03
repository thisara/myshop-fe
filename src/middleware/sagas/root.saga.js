import { all, takeLatest } from 'redux-saga/effects';

import {
  watchOrderCreate, 
  watchGetOrderProductItems,
  watchOrderEdit, 
  watchOrderEditUpdate, 
  watchSearchOrder, 
  watchOrderList,
  watchDeleteOrder,
  watchOrderDeleteCommit
} from '../../modules/order/middlewares/saga.order';

import {
  watchProductCreate, 
  watchProductEdit, 
  watchProductEditUpdate, 
  watchSearchProduct, 
  watchProductList,
  watchDeleteProduct,
  watchProductDeleteCommit
} from '../../modules/product/middlewares/saga.product';

import {
  watchCartProductGet,
  watchCartProductRemove
} from '../../modules/commons/middlewares/saga.global';

import {
  watchCartCheckout
} from '../../modules/cart/middlewares/saga.cart';

export default function* rootSaga() {
  yield all([
    watchCartProductGet(),
    watchCartProductRemove(),
    watchCartCheckout(),

    watchOrderCreate(), 
    watchGetOrderProductItems(),
    watchOrderEdit(),
    watchOrderEditUpdate(), 
    watchSearchOrder(), 
    watchOrderList(),
    watchDeleteOrder(),
    watchOrderDeleteCommit(),

    watchProductCreate(), 
    watchProductEdit(),
    watchProductEditUpdate(), 
    watchSearchProduct(), 
    watchProductList(),
    watchDeleteProduct(),
    watchProductDeleteCommit(),

   
  ]);

  yield takeLatest([
    
  ]);
}