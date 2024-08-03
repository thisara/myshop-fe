import {
    PRODUCT_EDIT_ASYNC,
    PRODUCT_SEARCH_ASYNC,
    PRODUCT_LIST_ASYNC,
    PRODUCT_DELETE_ASYNC,
    CLEAN_SEARCH_PRODUCTS
} from '../actions/actionTypes.product';

const initialState = {
    productNotifications : '',
    listProducts : [],
    searchProducts : [],
    orderItems : [],
}

const productReducer = (state = initialState, action) => {
    const newState = {...state};

    if(action.type === PRODUCT_EDIT_ASYNC){
        return{
            ...state,
            editProduct : action.output.editProduct,
        }
    }else if(action.type === PRODUCT_SEARCH_ASYNC){
        return{
            ...state,
            searchProducts : action.output.products
        }
    }else if(action.type === PRODUCT_LIST_ASYNC){
        return{
            ...state,
            listProducts : action.output.products
        }
    }else if(action.type === PRODUCT_DELETE_ASYNC){
        return{
            ...state,
            deleteProduct : action.output.deleteProduct,
        }
    }else if(action.type === CLEAN_SEARCH_PRODUCTS){
        return{
            ...state,
            searchProducts : []
        }
    }
    
    return newState;
}

export default productReducer;