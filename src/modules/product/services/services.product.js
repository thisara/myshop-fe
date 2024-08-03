import axios from 'axios';
import { getServiceHost } from '../../commons/utils/applicationPropertyFormatters';

const createProducts = (obj) => {
        axios.post(getServiceHost() + '/products/add', obj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
}

async function editProducts (id) {
    const response = await axios.get(getServiceHost() + '/products/edit/'+id);
    return response;
}

async function updateProducts (obj){
    const response = axios.post(getServiceHost() + '/products/update/'+obj._id, obj);
    return response;
}

async function listProducts (){
    const response = axios.get(getServiceHost() + '/products/');
    return response;
}

async function searchProducts(text){
    const response = axios.get(getServiceHost() + '/products/search/'+text);
    return response;
}

async function deleteProducts(id){
   const response = axios.get(getServiceHost() + '/products/delete/'+id)
   return response; 
}

export default createProducts;

export {
    editProducts,
    updateProducts,
    listProducts,
    searchProducts,
    deleteProducts
};



