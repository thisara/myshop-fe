import React from 'react';

const PaymentDetails = (props) => {
    return(
        <div className="form-style">
            <div>Order Payment Information</div>
            <div className="form-group">
                <label>Billing Address: </label>
                <span>{props.payment.billingAddress}</span>
            </div>
            <div className="form-group">
                <label>Payment Method: </label>
                <span>{props.payment.paymentMethod}</span>
            </div>
        </div>
    )
}

export {
    PaymentDetails
}