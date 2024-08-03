import React from 'react';

import { Link } from 'react-router-dom';
import { toDecimalNumber, toCurrency } from '../../../commons/utils/dataFormatters';

const CartTotal = (props) => {

    const cartItemTotal = props.orderItems.cartItemTotal;
    
    let elements = [];

    for(let i in cartItemTotal){
        elements.push(<CartTotalComponent itemTotal={cartItemTotal[i].itemTotal} 
            clearCart={(props.clearCart) ? props.clearCart : null} isOnCart = {props.isOnCart} isOnModal = {props.isOnModal}/>);
    }

    return (
        <>{elements}</>
    );
}

const CartTotalComponent = (props) => {

    return(
        <>
            <tr key={props.rowKey}>
                <td className='global-price-style' colSpan='4'>Total : </td>
                <td className='global-price-style'>{toDecimalNumber(props.itemTotal,2)}</td>
                <td></td>
            </tr>
            <tr key={props.rowKey + 1}>
                <td className='global-price-style' colSpan='4'>Delivery : </td>
                <td className='global-price-style'>{toDecimalNumber(0,2)}</td>
                <td></td>
            </tr>
            <tr key={props.rowKey + 2}>
                <td  className='global-price-style'colSpan='4'>Amount to pay : </td>
                <td className='global-price-style'>{toCurrency(props.itemTotal,'LKR')}</td>
                <td></td>
            </tr>
            <tr>
                <td colSpan='2' className='cart-checkout-buttons'>
                    
                </td>
                <td className='cart-checkout-buttons'>
                    {props.isOnCart && !props.isOnModal ?
                    <input type="button" className="btn btn-danger" value="Empty Cart" onClick={props.clearCart}/>
                    : ''}
                </td>
                <td className='cart-checkout-buttons'>
                    {props.isOnCart && !props.isOnModal ? 
                        <Link to={'/delivery'} className="btn btn-success">Checkout</Link>
                        : ''}
                </td>
                <td className='cart-checkout-buttons'>
                    
                </td>
                <td></td>
            </tr>
        </>
    );
}

export {
    CartTotal
}