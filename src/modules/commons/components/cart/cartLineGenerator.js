import React from 'react';

import { toDecimalNumber } from '../../../commons/utils/dataFormatters';

const CartLine = (props) => {

    let elements = [];
    const orderItems = props.orderItems.cartItems;
    if(orderItems && !(orderItems.length === 0)){
        for(let index in orderItems){
            let rowNumber = Number(index) + 1;
            elements.push(<CartLineComponent object={orderItems[index]} i={rowNumber} 
                removeFromCart={(props.removeFromCart) ? props.removeFromCart : null} 
                updateCart={(props.updateCart) ? props.updateCart : null}/>);
        }
    }else{
        elements.push(<span>Cart is empty.</span>)
    }

    return(
        <>
        {elements}
        </>
    )
}

const CartLineComponent = (props) => {
    //TODO - 'removeFromCart' should be 'checkoutInputs'
    //TODO - get the quantity by binding the function
    if(props.object.productWhenViewCart){
        return (
            <>
                <tr key={props.object.productID}>
                    <td>{props.i}</td>
                    <td>{props.object.productWhenViewCart.productName}</td>
                    <td className='global-price-style'>{toDecimalNumber(props.object.productWhenViewCart.productUnitPrice,2)} {props.object.productWhenViewCart.productCurrency}</td>
                    <td>
                        {!props.updateCart ? 
                        props.object.quantity 
                        : <input className="input-cart-qty" type='number' defaultValue={props.object.quantity} 
                        onClick={(props.updateCart) ? e => props.updateCart(e, props.object, props.object.productID) : ''}/> }   
                        <span className="label-cart-uom">{props.object.productWhenViewCart.productUOM}</span>
                    </td>
                    <td className='global-price-style'>{toDecimalNumber(props.object.lineTotal,2)}</td>
                    <td>
                        <input type="button" className="btn btn-danger" value="remove" hidden={!props.removeFromCart} 
                            onClick={(props.removeFromCart) ? props.removeFromCart.bind(props,props.object.productID) : ''}/>
                    </td>
                </tr>
            </>
            );
    }else{
        return (
        <tr key={props.object.productID}>
            <td colSpan='6'> Loading ... </td>
        </tr>
        );
    }
}

export {
    CartLine
}