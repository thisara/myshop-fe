import {
    CART_PRODUCT_GET,
    CART_PRODUCT_GET_ASYNC,
    CART_PRODUCT_REMOVE,
    START_LOADING
} from '../actions/actionTypes.global'

import { takeLatest, put } from 'redux-saga/effects';

import { loadingController } from '../actions/actions.global';

import { getCartProducts } from '../services/services.global';

import { getCartProduct } from '../actions/actions.global';

function* productGetAsync(action){

    console.log('GET Product ' + JSON.stringify(action));

    yield put(loadingController(START_LOADING, {loading:true, message:'Loading cart ... '}));

    let orderItems = action.payload;

    let formatedCartItems = [];
    let compositeCartItems = {};
    
    let itemTotalCounter = 0;
    let orderItemTotal = {};

    const formatedCartTotal = [];
    
    if(orderItems){
        for(let i in orderItems){

            let orderItem = orderItems[i];
            let productId = orderItem['productID'];

            const response = yield getCartProducts(productId);

            //yield delay(1000);

            let product = response.data;

            orderItem['productWhenViewCart'] = product;
            orderItem['lineTotal'] = orderItem['quantity'] * product['productUnitPrice'];

            itemTotalCounter += orderItem['lineTotal'];

            formatedCartItems.push(orderItem);
        }

        orderItemTotal.itemTotal = itemTotalCounter;
        orderItemTotal.delivery = 0;
        orderItemTotal.grandItemTotal = itemTotalCounter;

        formatedCartTotal.push(orderItemTotal);

        compositeCartItems.cartItems = formatedCartItems;
        compositeCartItems.cartItemTotal = formatedCartTotal;

        console.log(JSON.stringify(compositeCartItems));
    }

    yield put(loadingController(CART_PRODUCT_GET_ASYNC, {orderItems:compositeCartItems}));
    yield put(loadingController(START_LOADING, {loading:false, message:'', result:''}));
}

function* productRemoveAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Preparing to remove product ... '}));

    const productID = action.payload;
    const currentCartItems = action.currentCartItems;

    let newCart = [];

    currentCartItems.map(function(object,i){
        console.log(JSON.stringify(object) + JSON.stringify(productID));
        if(!(object['productID'] === productID)){
            newCart.push(object);
        }
        return 0; //TODO: Avoid linters!
    });

    yield put(loadingController(START_LOADING, {loading:false, message:'Removing product ... '}));
    yield put(getCartProduct(newCart));
}

export function* watchCartProductGet(){
    yield takeLatest(CART_PRODUCT_GET, productGetAsync);
}

export function* watchCartProductRemove(){
    yield takeLatest(CART_PRODUCT_REMOVE, productRemoveAsync)
}
