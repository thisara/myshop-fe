import {
    PRODUCT_CREATE,
    PRODUCT_EDIT,
    PRODUCT_EDIT_UPDATE,
    PRODUCT_LIST,
    PRODUCT_SEARCH,
    PRODUCT_DELETE,
    PRODUCT_DELETE_COMMIT,
    PRODUCT_CART_UPDATE,
 /*   CLEAN_RESULT,
    CLEAN_MESSAGE,
    CLEAN_LOADING,*/
    CLEAN_SEARCH_PRODUCTS
} from './actionTypes.product';

const createProduct = (payload) => ({type:PRODUCT_CREATE, payload});

const editProduct = (payload) => ({type:PRODUCT_EDIT, payload});

const editUpdateProduct = (payload) => ({type:PRODUCT_EDIT_UPDATE,payload});

const listProducts = () => ({type:PRODUCT_LIST})

const searchProduct = (payload) => ({type:PRODUCT_SEARCH, payload});

const deleteProduct = (payload) => ({type:PRODUCT_DELETE, payload});

const deleteUpdateProduct = (payload) => ({type:PRODUCT_DELETE_COMMIT,payload});

const updateCart = (payload => ({type:PRODUCT_CART_UPDATE, payload}));
/*
const loadingController = (actionType, obj) => ({type:actionType, output: obj});

const cleanResult = () => ({type:CLEAN_RESULT});

const cleanMessage = () => ({type:CLEAN_MESSAGE});

const cleanLoading = () => ({type:CLEAN_LOADING});
*/
const cleanSearchProducts = () => ({type:CLEAN_SEARCH_PRODUCTS});

export {
    createProduct,
    editProduct,
    editUpdateProduct,
    listProducts,
    searchProduct,
    deleteProduct,
    deleteUpdateProduct,
    updateCart,
 /*   loadingController,
    cleanResult,
    cleanMessage,
    cleanLoading,*/
    cleanSearchProducts
};
