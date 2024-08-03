import {
    START_LOADING,
    CART_CHECKOUT_ASYNC,
    CART_DELIVERY,
    CART_PAYMENT
}from '../actions/actionTypes.cart';

const initialState = {
    loading : false,
    message : 'pending',
    result : '',
    delivery : {},
    payment : {}
}

const cartReducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === START_LOADING){
        return {
            ...state,
            loading : action.output.loading,
            message : action.output.message,
            result : action.output.result
        }
    }else if(action.type === CART_CHECKOUT_ASYNC){
        return{
            ...state,
            loading : action.output.loading,
            message : action.output.message,
            result : action.output.result
        }
    }else if(action.type === CART_DELIVERY){
        return{
            ...state,
            delivery : action.payload
        }
    }else if(action.type === CART_PAYMENT){
        return{
            ...state,
            payment : action.payload
        }
    }

    return newState;
}


export default cartReducer;