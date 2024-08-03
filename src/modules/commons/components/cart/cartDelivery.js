import React from 'react';

const DeliveryDetails = (props) => {
    return(
        <div className="form-style">
            <div>Order Delivery Information</div>
            <div className="form-group">
                <label>Delivery Address: </label>
                <span>{props.delivery.shipToAddress}</span>
            </div>
            <div className="form-group">
                <label>Contact Person: </label>
                <span>{props.delivery.contactName}</span>
            </div>
            <div className="form-group">
                <label>Contact Number: </label>
                <span>{props.delivery.contactNumber}</span>
            </div>
            <div className="form-group">
                <label>Email Address: </label>
                <span>{props.delivery.emailAddress}</span>
            </div>
        </div>
    )
}

export {
    DeliveryDetails
}