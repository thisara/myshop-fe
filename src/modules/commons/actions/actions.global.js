import{
    UPDATE_CART,
    CART_PRODUCT_REMOVE,
    CART_PRODUCT_GET,
    CLEAR_CART,
    CLEAN_RESULT,
    CLEAN_MESSAGE,
    CLEAN_LOADING
} from './actionTypes.global';

const loadingController = (actionType, obj) => ({type:actionType, output: obj});

const getCartProduct = (payload) => ({type:CART_PRODUCT_GET, payload});

const updateCart = (payload) => ({type:UPDATE_CART, payload});

const removeCartProduct = (payload, currentCartItems) => ({type:CART_PRODUCT_REMOVE, payload, currentCartItems});

const clearCart = (payload) => ({type:CLEAR_CART, payload});

const cleanResult = () => ({type:CLEAN_RESULT});

const cleanMessage = () => ({type:CLEAN_MESSAGE});

const cleanLoading = () => ({type:CLEAN_LOADING});

export {
    getCartProduct,
    updateCart,
    removeCartProduct,
    clearCart,
    loadingController,
    cleanLoading,
    cleanMessage,
    cleanResult
}