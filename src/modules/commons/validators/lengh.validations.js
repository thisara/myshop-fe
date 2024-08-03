const isWithinRange = (value, min, max) => {
    if(value && !isNaN(min) && 
        !isNaN(max) && 
        value.length > min && 
        value.length < max){
        
        return true;    
    }else{
        return false;
    }
}

export {
    isWithinRange
}