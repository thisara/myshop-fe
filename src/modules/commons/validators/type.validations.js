const isNumber = (value) => {
    if(!isNaN(value)){
        return true;
    }else{
        return false;
    }
} 

const isDate = (value) => {
    if(value instanceof Date){
        return true;
    }else{
        return false;
    }
}

export {
    isNumber,
    isDate
}