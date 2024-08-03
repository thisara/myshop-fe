import {
    UPDATE_CART,
    CLEAR_CART,
    CART_PRODUCT_GET_ASYNC,
    START_LOADING,
    CLEAN_RESULT,
    CLEAN_MESSAGE,
    CLEAN_LOADING
} from '../actions/actionTypes.global';

const initialState = {
    orderItems : {},
    itemMessage : '',

    loading : false,
    message : '',
    result : ''
}

const globalReducer = (state = initialState, action) => {
    const newState = {...state};

   if(action.type === UPDATE_CART){
        return{
            ...state,
            orderItems : action.payload,
            itemMessage : 'Item added !'
        }
    }else if(action.type === CLEAR_CART){
        return {
            ...state,
            orderItems:action.payload
        }
    }else if(action.type === CART_PRODUCT_GET_ASYNC){
        return {
            ...state,
            orderItems:action.output.orderItems
        }
    }else if(action.type === START_LOADING){
        return {
            ...state,
            loading : action.output.loading,
            message : action.output.message,
            result : action.output.result
        }
    }else if(action.type === CLEAN_RESULT){
        return{
            ...state,
            result : ''
        }
    }else if(action.type === CLEAN_MESSAGE){
        return{
            ...state,
            message : ''
        }
    }else if(action.type === CLEAN_LOADING){
        return{
            ...state,
            loading : false
        }
    }
    return newState;
}

export default globalReducer;