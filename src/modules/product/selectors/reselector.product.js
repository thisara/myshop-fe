import { createSelector } from 'reselect';

const orderItemSelector = state => state.orderItems;

const productListSelector = state => state.listProducts;
const productSearchSelector = state => state.searchProducts;
const productEditSelector = state => state.editProduct;
const productDeleteSelector = state => state.deleteProduct;

const formListProducts = createSelector ([productListSelector], products => {    
    return products;
});

const formSearchProducts = createSelector ([productSearchSelector], products => {
    return products;
});

const formEditProduct = createSelector ([productEditSelector], product => {
    return product;
});

const formDeleteProduct = createSelector ([productDeleteSelector], product => {
    return product;
});

const updatingOrderItems = createSelector ([orderItemSelector], orderItems => {
    return orderItems;
});

export {
    formListProducts,
    formSearchProducts,
    formEditProduct,
    formDeleteProduct,
    updatingOrderItems
}