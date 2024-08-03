import { isNumber } from '../../commons/validators/type.validations';
import { isWithinRange } from '../../commons/validators/lengh.validations';
import { HanderReturn } from './output.handlers';
import { HANDLER_FAIL, HANDLER_PASS } from './type.handers';

const productNumberHandler = (value) => {

    if(isNumber(value)){
        HanderReturn.value = value;
        HanderReturn.type = HANDLER_PASS;
    }else{
        HanderReturn.value = 'Expecting a number !';
        HanderReturn.type = HANDLER_FAIL;
    }   
    return HanderReturn;
}

const productNameHander = (value) => {

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

const productPriceHandler = (value) => {

    if(isNaN(value)){
            HanderReturn.value = 'Enter a number !';
            HanderReturn.type = HANDLER_FAIL;
    }else{
        if(Number(value) === 0){
            HanderReturn.value = 'Price cannot be 0 !';
            HanderReturn.type = HANDLER_FAIL;
        }else{
            const s = value.split('.');
            if(s.length === 2){
                const d = s[0]+'.'+s[1].substr(0,2);
                HanderReturn.value = d;
                HanderReturn.type = HANDLER_PASS;
            }else{
                HanderReturn.value = value;
                HanderReturn.type = HANDLER_PASS;
            }
        } 
    }
    
    return HanderReturn;
}

export {
    productNumberHandler,
    productNameHander,
    productPriceHandler
}