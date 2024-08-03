import { takeLatest, put, delay } from 'redux-saga/effects';

import validateObject from './validations.product';

import createProducts, { editProducts, updateProducts, listProducts, searchProducts, deleteProducts } from '../services/services.product';
import {
    PRODUCT_CREATE,
    PRODUCT_EDIT,
    PRODUCT_EDIT_ASYNC,
    PRODUCT_EDIT_UPDATE,
    PRODUCT_LIST,
    PRODUCT_LIST_ASYNC,
    PRODUCT_SEARCH,
    PRODUCT_SEARCH_ASYNC,
    PRODUCT_DELETE,
    PRODUCT_DELETE_ASYNC,
    PRODUCT_DELETE_COMMIT
} from '../actions/actionTypes.product';

import {
    START_LOADING
}from '../../commons/actions/actionTypes.global';

import { loadingController } from '../../commons/actions/actions.global';

function* createAsync(action){

    yield put(loadingController(START_LOADING, { loading:true, message:'Saving product ... ' }));

    const product = action.payload;

    let productMessage = 'Product successfully saved.';

    let empty = validateObject(product);
    console.log(JSON.stringify(product));

    if(!empty){
        createProducts(product);
    }else{
        productMessage = 'Error : Empty form submitted !';
    }
    
    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, { loading:false,result:productMessage }));
}

function* editAsync(action){

    let product = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Loading product ... '}));

    const response = yield editProducts(action.payload);

    yield delay(1000); // to check the loading

    if(response){ 
        product = response.data;
    }

    yield put(loadingController(PRODUCT_EDIT_ASYNC, {editProduct:product}));
    yield put(loadingController(START_LOADING, {loading:false, message:'',result:''}));
}

function* editUpdateAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Updating product ... '}));

    //flat the existing row to keep whenAddToCart consistent
    updateProducts(action.payload);

    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, {loading:false, result:'Updated successfully.'}));
}

function* listAsync(action){

    let products = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Listing products ... '}));

    yield delay(500);

    const response = yield listProducts();

    if(response){
        products = response.data;
    }
    
    yield put(loadingController(PRODUCT_LIST_ASYNC, {products : products}));
    yield put(loadingController(START_LOADING, {loading:false, message:'', result:''}));
}

function* searchAsync(action){

    let products = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Searching product ... '}));

    yield delay(500); // to check the loading

    const response = yield searchProducts(action.payload);

    if(response){
        products = response.data;
    }

    yield put(loadingController(PRODUCT_SEARCH_ASYNC, {products : products}));
    yield put(loadingController(START_LOADING, {loading:false, result:''}));
}

function* deleteAsync(action){

    let product = null;

    yield put(loadingController(START_LOADING, {loading:true, message:'Listing product ... '}));

    const response = yield editProducts(action.payload);

    yield delay(1000); // to check the loading

    if(response){ 
        product = response.data;
    }

    yield put(loadingController(PRODUCT_DELETE_ASYNC, {deleteProduct:product}));
    yield put(loadingController(START_LOADING, {loading:false, message:'', result:''}));
}

function* deleteCommitAsync(action){

    yield put(loadingController(START_LOADING, {loading:true, message:'Deleting product ... '}));

    yield deleteProducts(action.payload._id);

    yield delay(500); // to check the loading

    yield put(loadingController(START_LOADING, {loading:false, message:'', result:''}));
}

export function* watchProductCreate(){
    yield takeLatest(PRODUCT_CREATE, createAsync);
}

export function* watchProductEdit(){
    yield takeLatest(PRODUCT_EDIT, editAsync);
}

export function* watchProductEditUpdate(){
    yield takeLatest(PRODUCT_EDIT_UPDATE, editUpdateAsync);
}

export function* watchProductList(){
    yield takeLatest(PRODUCT_LIST, listAsync);
}

export function* watchSearchProduct(){
    yield takeLatest(PRODUCT_SEARCH, searchAsync);
}

export function* watchDeleteProduct(){
    yield takeLatest(PRODUCT_DELETE, deleteAsync);
}

export function* watchProductDeleteCommit(){
    yield takeLatest(PRODUCT_DELETE_COMMIT, deleteCommitAsync);
}