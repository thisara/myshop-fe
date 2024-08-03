import React from 'react';

const gridHeaderSelector = (type) => {

    if(type === 'ORDER'){
        return (
            <>
                <th>
                    Order Name
                </th>
                <th>
                   Order Status
                </th>
                <th>
                   Created Date
                </th>
            </>
        );
    }else if(type === 'PRODUCT'){
        return (
            <>
                <th>
                    ID
                </th>
                <th>
                    Product
                </th>
                <th>
                    UoM
                </th>
                <th>
                    Unit Price
                </th>
                <th>
                    Currency
                </th>
                <th>
                    Category
                </th>
            </>
        );
    }else{

    }
}

export {
    gridHeaderSelector
}