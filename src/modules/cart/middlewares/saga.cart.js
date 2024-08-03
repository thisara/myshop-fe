import { takeLatest, put } from 'redux-saga/effects';

import { checkoutOrder, createDelivery } from '../services/services.cart';
import createOrders, { updateOrders } from '../../order/services/services.order';

import { getOrderStatus } from '../../commons/constants/common.enums';

import {
    CART_CHECKOUT,
}from '../actions/actionTypes.cart';

import {
    START_LOADING
}from '../../commons/actions/actionTypes.global';

import {
    loadingController,
}from '../../commons/actions/actions.global';

function* checkoutAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Checkout cart in-progress ... '}));

    try{

    let isAllLinesSaved = true; 

    let orderStatus = getOrderStatus().INIT;

    const orderItems = action.payload.cartItems;
    const orderItemTotal = action.payload.cartItemTotal;
    const deliveryInfo = action.delivery;
    const paymentInfo = action.payment;

    //Create delivery and get delivery object ID
    const delivery = {
        deliveryAddress : deliveryInfo.deliveryAddress,
        contactName : deliveryInfo.contactName,
        contactNumber : deliveryInfo.contactNumber,
        emailAddress : deliveryInfo.emailAddress
    }

    const deliveryResponse = yield createDelivery(delivery);

    const deliveryID = deliveryResponse.data.deliveryID;
    let orderTotal = 0;
    let orderGrandTotal = 0;
    let orderDeliveryCharges = 0.;

    for(let i in orderItemTotal){
        orderTotal = orderItemTotal[i].itemTotal;
        orderDeliveryCharges = orderItemTotal[i].delivery;
        orderGrandTotal = orderItemTotal[i].grandItemTotal;
    }

    //Create order and get orderID
    const order = {
        orderNumber: new Date(),
        orderName: new Date(),
        orderTotal: orderTotal,
        orderDeliveryCharges : orderDeliveryCharges,
        orderGrandTotal : orderGrandTotal,
        orderDateCreated: new Date(),
        billingAddress : paymentInfo.billingAddress,
        paymentMethod : paymentInfo.paymentMethod,
        delivery : deliveryID,
        orderStatus : orderStatus
    };

    const response = yield createOrders(order);

    const orderID = response.data.orderID;

    order._id = orderID;

    for(let k in orderItems){

        let orderItem = {};

        orderItem.quantity = orderItems[k].quantity;
        orderItem.lineTotal = orderItems[k].lineTotal;
        orderItem.product = orderItems[k].productID;
        orderItem.order = orderID;
        orderItem.productWhenAddToCart = orderItems[k].productWhenAddToCart;

       const res = yield checkoutOrder(orderItem);

       if(!(res && res.status === 200)){
            isAllLinesSaved = false;
       }
    }

    if(isAllLinesSaved){
        order.orderStatus = getOrderStatus().PENDING;
    }else{
        order.orderStatus = getOrderStatus().PARTIAL;
    }

    yield updateOrders(order);

    yield put(loadingController(START_LOADING, {loading:false, result:'Order placed successfully ... '}));

    }catch(e){
        console.log(e);
        yield put(loadingController(START_LOADING, {loading:false, result:'Something wrong with placing order ... '}));
    }
}

export function* watchCartCheckout(){
    yield takeLatest(CART_CHECKOUT, checkoutAsync);
}