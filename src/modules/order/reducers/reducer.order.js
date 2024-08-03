import {
    ORDER_GET_ASYNC,
    ORDER_SEARCH_ASYNC,
    ORDER_LIST_ASYNC,
    ORDER_DELETE_ASYNC,
    ORDER_PRODUCT_ITEMS_ASYNC
} from '../actions/actionTypes.order';

const initialState = {
    listOrders : [],
    searchOrders : [],
    orderProductItems: {},
    order : null,
    deleteOrder : null
}

const orderReducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === ORDER_GET_ASYNC){
        return{
            ...state,
            order : action.output.order,
        }
    }else if(action.type === ORDER_SEARCH_ASYNC){
        return{
            ...state,
            searchOrders : action.output.orders
        }
    }else if(action.type === ORDER_LIST_ASYNC){
        return{
            ...state,
            listOrders : action.output.orders
        }
    }else if(action.type === ORDER_DELETE_ASYNC){
        return{
            ...state,
            deleteOrder : action.output.deleteOrder,
        }
    }else if(action.type === ORDER_PRODUCT_ITEMS_ASYNC){
        return{
            ...state,
            orderProductItems: action.output.orderProductItems
        }
    }
    
    return newState;
}

export default orderReducer;