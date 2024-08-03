import {
    ORDER_CREATE,
    ORDER_GET,
    ORDER_EDIT_UPDATE,
    ORDER_LIST,
    ORDER_SEARCH,
    ORDER_DELETE,
    ORDER_DELETE_COMMIT,
    ORDER_PRODUCT_ITEMS
} from './actionTypes.order';

const createOrder = (payload) => ({type:ORDER_CREATE, payload});

const getOrder = (payload) => ({type:ORDER_GET, payload});

const editUpdateOrder = (payload) => ({type:ORDER_EDIT_UPDATE,payload});

const listOrders = () => ({type:ORDER_LIST})

const searchOrder = (payload) => ({type:ORDER_SEARCH, payload});

const deleteOrder = (payload) => ({type:ORDER_DELETE, payload});

const deleteUpdateOrder = (payload) => ({type:ORDER_DELETE_COMMIT,payload});

const getOrderProductItems = (payload) => ({type:ORDER_PRODUCT_ITEMS, payload});

export {
    createOrder,
    getOrder,
    editUpdateOrder,
    listOrders,
    searchOrder,
    deleteOrder,
    deleteUpdateOrder,
    getOrderProductItems
};
