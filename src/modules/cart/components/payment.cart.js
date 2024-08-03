import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';

import { checkoutCart, setCartPayment } from './../actions/actions.cart';
import FormHeader from '../../commons/components/form/formHeader';
import { clearCart } from '../../commons/actions/actions.global';

export class Payment extends Component{

    state = {
        payment : {
            billingAddress : '35A, Colombo',
            paymentMethod : 'VISA'
        },
        billToAddressError : '',
        readyToSubmit: false
    }

    onChangeBillToAddress = (e) => {
        let payment = this.state.payment;
        payment.billingAddress = e.target.value;

        this.setState({
            payment : payment
        });
    }

    onChangePaymentMethod = (e) => {
        let payment = this.state.payment;
        payment.paymentMethod = e.target.value;

        this.setState({
            payment : payment
        });
    }

    checkout () {
        this.props.setCartPayment(this.state.payment);

        this.props.checkoutCart(this.props.orderItems, this.props.delivery, this.state.payment);

        //TODO : check the response of checkout and redirect with cleaning the cart
        this.setState({
            readyToSubmit : true,
            orderItems:this.props.orderItems,
            delivery: this.props.delivery
        });
        this.props.clearCart({});
    }

    componentDidMount(){
        this.setState({
            payment : {},
            readyToSubmit : false
        });
    }

    render(){
        return(
            <div className="form-style">
                
                <FormHeader title='Payment Information' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/view-cart">Review & Checkout</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/delivery">Delivery Information</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Payment Information</Breadcrumb.Item>
                </Breadcrumb>
                    <div className="form-group">
                        <label>Billing Address: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.payment.billingAddress} 
                            onChange={this.onChangeBillToAddress.bind(this)}/>
                        <span className="form-field-error">{this.state.billToAddressError}</span>
                    </div>
                    <div className="form-group">
                        <label>Payment Method : </label>
                        
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.payment.paymentMethod} 
                            onChange={this.onChangePaymentMethod.bind(this)}/>
                    </div>
                    <div className="form-group">
                    {this.state.readyToSubmit ? <Redirect to={{pathname:'/print-cart',
                                                                state : {
                                                                    orderItems: this.state.orderItems,
                                                                    delivery : this.state.delivery,
                                                                    payment : this.state.payment
                                                                }}} /> : <input type="button" className="btn btn-success" value="Checkout" onClick={this.checkout.bind(this)}/> }
                    
                    </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    checkoutCart : (payload, delivery, payment) => dispatch(checkoutCart(payload, delivery, payment)),
    clearCart : (payload) => dispatch(clearCart(payload)),
    setCartPayment : (payload) => dispatch(setCartPayment(payload))
});

const mapStateToProps = (state) => {
    console.log(JSON.stringify('pay : '+state.global.orderItems));
    return{
        orderItems : state.global.orderItems,
        delivery : state.cart.delivery,
        loading : state.global.loading,
        message : state.global.message,
        result : state.global.result
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Payment);