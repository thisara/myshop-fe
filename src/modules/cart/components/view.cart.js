import React, {Component} from 'react';
import {connect} from 'react-redux';

import FormHeader from '../../commons/components/form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { checkoutCart } from '../actions/actions.cart';
import { getCartProduct, updateCart, cleanLoading, cleanMessage, cleanResult } from '../../commons/actions/actions.global';
import { removeCartProduct, clearCart } from '../../commons/actions/actions.global';
import { CartTotal } from '../../commons/components/cart/cartTotalGenerator';
import { CartLine } from '../../commons/components/cart/cartLineGenerator';
import { getPayloadToUpdateCart } from '../../commons/utils/cartPayloadGenerator';
import { Table } from 'react-bootstrap';

export class ViewCart extends Component {

    state = {
        orderItems : [],
        loading : false,
        message : '',
        result : '',
        itemTotal : []
    }

    componentDidMount(){

        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        this.props.getCartProductInfo(this.props.orderItems.cartItems);        
    }

    updateCart = (e, product, productID) => {
        let quantity = e.target.value;
        let currentCompositeOrderItems = this.props.orderItems;
        let orderItemsWrapper = {};
        
        orderItemsWrapper = getPayloadToUpdateCart(product,productID,quantity,currentCompositeOrderItems);

        this.props.updateCart(orderItemsWrapper);
    }

    clearCart = () => {
        this.props.clearCart({});
    }

    removeFromCart = (productID) => {
        const currentCartItems = this.props.orderItems.cartItems;
        this.props.deleteCartProduct(productID, currentCartItems);
    }

    render(){
        
        return(
            <div className="form-style">
                {!this.props.isOnModal ? 
                <FormHeader title='View Cart' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
                : ''}
                <div>
                    <Table className='table table-striped'>
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
                            <CartLine orderItems={this.props.orderItems} removeFromCart={this.removeFromCart} updateCart={this.updateCart}/>
                            <CartTotal isOnCart={true} isOnModal = {this.props.isOnModal} orderItems={this.props.orderItems} clearCart={this.clearCart} checkOut={this.props.checkOut} />
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCartProductInfo : (payload) => dispatch(getCartProduct(payload)),
    deleteCartProduct : (payload, currentCartItems) => dispatch(removeCartProduct(payload, currentCartItems)),
    clearCart : (payload) => dispatch(clearCart(payload)),
    checkoutCart : (payload, itemTotal) => dispatch(checkoutCart(payload, itemTotal)),
    updateCart : (payload) => dispatch(updateCart(payload)),
    cleanResult: () => dispatch(cleanResult()),
    cleanMessage: () => dispatch(cleanMessage()),
    cleanLoading: () => dispatch(cleanLoading())
});

const mapStateToProps = (state) => {
    return{
        loading:formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        orderItems : state.global.orderItems,
        cartItemTotal : state.global.cartItemTotal
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (ViewCart);