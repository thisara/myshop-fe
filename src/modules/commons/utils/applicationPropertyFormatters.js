import * as appProperties from '../../../constants/global.const';

const getServiceHost = () => {
    return appProperties.SERVICE_HOST + ':' + appProperties.SERVICE_PORT;
}

export {
    getServiceHost
}