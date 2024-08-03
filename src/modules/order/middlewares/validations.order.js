const validateObject = (obj) => {

    let empty = true;

    if(obj.orderNumber && obj.orderNumber.length > 0 &&
         obj.orderName && obj.orderName > 0 &&
         obj.orderDateCreated){
        empty = false;
    }

    return empty;
}

export default validateObject;