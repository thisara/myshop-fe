import { isNumber } from '../../commons/validators/type.validations';
import { isWithinRange } from '../../commons/validators/lengh.validations';
import { HanderReturn } from './output.handlers';
import { HANDLER_FAIL, HANDLER_PASS } from './type.handers';

const orderNumberHandler = (value) => {

    if(isNumber(value)){
        HanderReturn.value = value;
        HanderReturn.type = HANDLER_PASS;
    }else{
        HanderReturn.value = 'Expecting a number !';
        HanderReturn.type = HANDLER_FAIL;
    }   
    return HanderReturn;
}

const orderNameHander = (value) => {

    let min = 0;
    let max = 8

    if(isWithinRange(value, min, max)){
        HanderReturn.value = value;
        HanderReturn.type = HANDLER_PASS;
    }else{
        HanderReturn.value = 'Should be of ' + min + ' to ' + max + ' charactors !';
        HanderReturn.type = HANDLER_FAIL;
    }   
    return HanderReturn;
}

export {
    orderNumberHandler,
    orderNameHander
}