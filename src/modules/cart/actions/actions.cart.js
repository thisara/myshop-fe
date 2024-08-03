import {
    CART_CHECKOUT,
    CART_DELIVERY,
    CART_PAYMENT
} from './actionTypes.cart';

const checkoutCart = (payload, delivery, payment) => ({type:CART_CHECKOUT, payload, delivery, payment});

const setCartDelivery = (payload) => ({type:CART_DELIVERY, payload});

const setCartPayment = (payload) => ({type:CART_PAYMENT, payload});

export {
    checkoutCart,
    setCartDelivery,
    setCartPayment
}