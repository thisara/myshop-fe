const validateObject = (obj) => {

    let empty = true;

    if(obj.productNumber && obj.productNumber.length > 0 &&
         obj.productName && obj.productName.length > 0 &&
         obj.productCategory && obj.productCategory.length > 0){
        empty = false;
    }

    return empty;
}

export default validateObject;