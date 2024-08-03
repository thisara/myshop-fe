import axios from 'axios';
import { getServiceHost } from '../../commons/utils/applicationPropertyFormatters';

async function getCartProducts(id){
    const response = axios.get(getServiceHost() + '/products/' + id);
    return response;
}

export {
    getCartProducts
}