import { takeLatest, put, delay } from 'redux-saga/effects';

import validateObject from './validations.order';

import createOrders, { getOrder, getOrderProductItems, getDelivery, updateOrders, listOrders, searchOrders, deleteOrders } from '../services/services.order';
import { getCartProducts } from '../../commons/services/services.global';

import {
    ORDER_CREATE,
    ORDER_GET,
    ORDER_GET_ASYNC,
    ORDER_EDIT_UPDATE,
    ORDER_LIST,
    ORDER_LIST_ASYNC,
    ORDER_SEARCH,
    ORDER_SEARCH_ASYNC,
    ORDER_DELETE,
    ORDER_DELETE_ASYNC,
    ORDER_DELETE_COMMIT,
    ORDER_PRODUCT_ITEMS,
    ORDER_PRODUCT_ITEMS_ASYNC
} from '../actions/actionTypes.order';

import{
    START_LOADING
}from '../../commons/actions/actionTypes.global';

import { loadingController } from '../../commons/actions/actions.global';

function* createAsync(action){

    yield put(loadingController(START_LOADING, { loading:true, message:'Saving order ... ' }));

    const order = action.payload;

    let orderMessage = 'Order successfully saved.';

    let empty = validateObject(order);

    if(!empty){
        createOrders(order);
    }else{
        orderMessage = 'Error : Empty form submitted !';
    }
    
    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, {loading:false, result:orderMessage}));
}

function* getAsync(action){

    let order = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Loading order ... '}));

    const response = yield getOrder(action.payload);

    yield delay(1000); // to check the loading

    if(response){ 
        order = response.data;
    }

    yield put(loadingController(ORDER_GET_ASYNC, {order:order}));
    yield put(loadingController(START_LOADING, {loading:false, result:''}));
}

function* editUpdateAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Updating order ... '}));

    updateOrders(action.payload);

    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, {loading:false, result:'Updated successfully.'}));
}

function* listAsync(action){

    let orders = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Listing orders ... '}));

    yield delay(500);

    const response = yield listOrders();

    if(response){
        orders = response.data;
    }
    
    yield put(loadingController(START_LOADING, {loading:false, message:''}));
    yield put(loadingController(ORDER_LIST_ASYNC, {orders : orders}))
}

function* searchAsync(action){

    let orders = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Searching order ... '}));

    yield delay(500); // to check the loading

    const response = yield searchOrders(action.payload);

    if(response){
        orders = response.data;
    }

    yield put(loadingController(START_LOADING, {loading:false, message:'', result:''}));
    yield put(loadingController(ORDER_SEARCH_ASYNC, {orders : orders}))
}

function* deleteAsync(action){

    let order = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Listing order ... '}));

    const response = yield getOrder(action.payload);

    yield delay(1000); // to check the loading

    if(response){ 
        order = response.data;
    }

    yield put(loadingController(START_LOADING, {loading:true, message:'',result:''}));
    yield put(loadingController(ORDER_DELETE_ASYNC, {deleteOrder:order}));
}

function* deleteCommitAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Deleting order ... '}));

    yield deleteOrders(action.payload._id);

    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, {loading:false, result:'Deleted successfully.'}));
}

function* getOrderProductItemsAsync(action){
    yield put(loadingController(START_LOADING, {loading:true, message:'Getting order ... '}));

    let orderProductItems = {};
    let orderItemsArray = [];
    let cartItems = {};

    //get order items
    const orderItemresponse = yield getOrderProductItems(action.payload);

    //TODO : validate response
    if(orderItemresponse.data){

    let orderItems = orderItemresponse.data;

    for (let d in orderItems){

        let productItem = orderItems[d];

        let productID = (productItem.product)[0];
        let productWhenAddToCart = productItem.productWhenAddToCart;
        let quantity = productItem.quantity;
        let lineTotal = productItem.lineTotal;

        //get related product info
        let response = yield getCartProducts(productID);

        //TODO : handle response empty
        let productWhenViewCart = response.data;

        let cartItems = {
            productID : productID,
            productWhenAddToCart : productWhenAddToCart,
            quantity : quantity,
            productWhenViewCart: productWhenViewCart,
            lineTotal : lineTotal
        }

        orderItemsArray.push(cartItems);
    }

    cartItems.cartItems = orderItemsArray;

    const orderResponse = yield getOrder(action.payload);

    const orderData = orderResponse.data;

    let payment = {
        paymentMethod : orderData.paymentMethod,
        billingAddress : orderData.billingAddress
    }

    let order = {
        orderID : orderData._id,
        orderNumber : orderData.orderNumber,
        orderName : orderData.orderName,
        orderDateCreated : orderData.orderDateCreated,
        orderStatus : orderData.orderStatus
    }

    let orderItemTotal = {
        delivery : orderData.orderDeliveryCharges,
        grandItemTotal : orderData.orderGrandTotal,
        itemTotal : orderData.orderTotal
    }

    //get delivery info
    const deliveryID = (orderData.delivery)[0];

    const deliveryResponse = yield getDelivery(deliveryID);

    const deliveryData = deliveryResponse.data;

    let delivery = {
        deliveryAddress : deliveryData.deliveryAddress,
        contactName : deliveryData.contactName,
        contactNumber : deliveryData.contactNumber,
        emailAddress : deliveryData.emailAddress
    }

    cartItems.cartItemTotal = [orderItemTotal];

    orderProductItems.orderItems = cartItems;
    orderProductItems.delivery = delivery;
    orderProductItems.payment = payment;
    orderProductItems.order = order;

    }else{
        console.log('No product items!')
    }
    yield put(loadingController(ORDER_PRODUCT_ITEMS_ASYNC, {orderProductItems:orderProductItems}));
    yield put(loadingController(START_LOADING, {loading:false, message:''}));

}

export function* watchOrderCreate(){
    yield takeLatest(ORDER_CREATE, createAsync);
}

export function* watchOrderEdit(){
    yield takeLatest(ORDER_GET, getAsync);
}

export function* watchOrderEditUpdate(){
    yield takeLatest(ORDER_EDIT_UPDATE, editUpdateAsync);
}

export function* watchOrderList(){
    yield takeLatest(ORDER_LIST, listAsync);
}

export function* watchSearchOrder(){
    yield takeLatest(ORDER_SEARCH, searchAsync);
}

export function* watchDeleteOrder(){
    yield takeLatest(ORDER_DELETE, deleteAsync);
}

export function* watchOrderDeleteCommit(){
    yield takeLatest(ORDER_DELETE_COMMIT, deleteCommitAsync);
}

export function* watchGetOrderProductItems(){
    yield takeLatest(ORDER_PRODUCT_ITEMS, getOrderProductItemsAsync);
}