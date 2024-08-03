import React from 'react';

import { CartTotal } from './cartTotalGenerator';
import { CartLine } from './cartLineGenerator';
import { PaymentDetails } from './cartPayment';
import { DeliveryDetails } from './cartDelivery';

const CartSummary = (props) => {
    return(
        <>
            <div>
                <table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Line #</th>
                            <th>Product Name</th>
                            <th>Product Unit Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartLine orderItems={props.orderItems} />
                        <CartTotal orderItems={props.orderItems} />
                    </tbody>
                </table>
            </div>
            <DeliveryDetails delivery={props.delivery}/>
            <PaymentDetails payment={props.payment}/>
       </>
    )
}

export {
    CartSummary
}