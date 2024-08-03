const toDecimalNumber = (inputNumber, decimalPlaces) => {
    if(!isNaN(inputNumber)){
        return Number(inputNumber).toFixed(decimalPlaces);
    }else{
        return inputNumber;
    }
}

const toCurrency = (inputNumber, currency) => {
    if(!isNaN(inputNumber)){
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        });

        return formatter.format(inputNumber);
    }else{
        return inputNumber;
    }
}

export {
    toDecimalNumber,
    toCurrency
}