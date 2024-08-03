import axios from 'axios';
import { getServiceHost } from '../../commons/utils/applicationPropertyFormatters';

async function createOrders (obj) {
        const response = await axios.post(getServiceHost() + '/orders/add', obj);
        return response;
}

async function getOrderProductItems(orderID){
    const response = await axios.get(getServiceHost() + '/order-items/order/'+orderID);
    return response;
}

async function getOrder (id) {
    const response = await axios.get(getServiceHost() + '/orders/edit/'+id);
    return response;
}

async function updateOrders (obj){
    const response = await axios.post(getServiceHost() + '/orders/update/'+obj._id, obj);
    return response;
}

async function listOrders (){
    const response = axios.get(getServiceHost() + '/orders/');
    return response;
}

async function searchOrders(text){
    const response = axios.get(getServiceHost() + '/orders/search/'+text);
    return response;
}

async function deleteOrders(id){
   const response = axios.get(getServiceHost() + '/orders/delete/'+id)
   return response; 
}

async function getDelivery (obj) {
    const response = await axios.get(getServiceHost() + '/delivery/'+ obj);
    return response;
}

export default createOrders;

export {
    getOrder,
    getOrderProductItems,
    getDelivery,
    updateOrders,
    listOrders,
    searchOrders,
    deleteOrders
};



