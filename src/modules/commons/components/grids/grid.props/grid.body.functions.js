import React from 'react';

import { toDecimalNumber } from '../../../utils/dataFormatters';

const gridValueSelector = (obj, type) => {

    if(type === 'ORDER'){
        return (
            <>
                <td>
                    {obj.orderName}
                </td>
                <td>
                    {obj.orderStatus}
                </td>
                <td>
                    {obj.orderDateCreated}
                </td>
            </>
        );
    }else if(type === 'PRODUCT'){
        return (
            <>
                <td>
                    {obj.productNumber}
                </td>
                <td>
                    {obj.productName}
                </td>
                <td>
                    {obj.productUOM}
                </td>
                <td className='global-price-style'>
                    {toDecimalNumber(obj.productUnitPrice, 2)}
                </td>
                <td>
                    {obj.productCurrency}
                </td>
                <td>
                    {obj.productCategory}
                </td>
            </>
        );
    }else{

    }
}

export {
    gridValueSelector
}