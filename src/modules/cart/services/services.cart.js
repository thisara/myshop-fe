import axios from 'axios';
import { getServiceHost } from '../../commons/utils/applicationPropertyFormatters';

async function checkoutOrder (obj) {
    const response = await axios.post(getServiceHost() + '/order-items/add', obj);
    return response;
}

async function createDelivery (obj) {
    const response = await axios.post(getServiceHost() + '/delivery/add', obj);
    return response;
}

export {
    checkoutOrder,
    createDelivery
}