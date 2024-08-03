import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import FormHeader from '../../commons/components/form/formHeader';
import { setCartDelivery } from '../actions/actions.cart';

export class Delivery extends Component{

    state = {
        delivery : {
            shipToAddress : '38, Main road, Panadura',
            contactName : 'Udaya',
            contactNumber : '0776547893',
            emailAddress : 'udaya@mail.com'
        },
        
        readyToSubmit : false,

        shipToAddressError : '',
        contactNameError : '',
        contactNumberError : '',
        emailAddressError : ''
    }

    componentDidMount(){
        this.setState({
            delivery : {},
            readyToSubmit : false
        });
    }

    onChangeShipToAddress = (e) => {
        let delivery = this.state.delivery;
        delivery.shipToAddress = e.target.value;
        this.setState ({
            delivery : delivery
        })
    }

    onChangeContactName = (e) => {
        let delivery = this.state.delivery;
        delivery.contactName = e.target.value;
        this.setState ({
            delivery : delivery
        })
    }

    onChangeContactNumber = (e) => {
        let delivery = this.state.delivery;
        delivery.contactNumber = e.target.value;
        this.setState ({
            delivery : delivery
        })
    }

    onChangeEmailAddress = (e) => {
        let delivery = this.state.delivery;
        delivery.emailAddress = e.target.value;
        this.setState ({
            delivery : delivery
        })
    }

    onSubmit = () => {
        //set cart on the redux
        this.props.setCartDelivery(this.state.delivery);
        //update state to redirect
        this.setState({
            readyToSubmit : true
        });
    }

    render(){
        return(
            <div className="form-style">
                
                <FormHeader title='Delivery Information' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/view-cart">Review & Checkout</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Delivery Information
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Payment Information</Breadcrumb.Item>
                </Breadcrumb>
                    <span>CheckOut => </span><span>Delivery => </span><span>Payment => </span>
                    <div className="form-group">
                        <label>Delivery Address: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.delivery.shipToAddress} 
                            onChange={this.onChangeShipToAddress.bind(this)}/>
                        <span className="form-field-error">{this.state.shipToAddressError}</span>
                    </div>
                    <div className="form-group">
                        <label>Contact Name: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.delivery.contactName} 
                            onChange={this.onChangeContactName.bind(this)}/>
                        <span className="form-field-error">{this.state.contactNameError}</span>
                    </div>
                    <div className="form-group">
                        <label>Contact Number : </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.delivery.contactNumber} 
                            onChange={this.onChangeContactNumber.bind(this)}/>
                        <span className="form-field-error">{this.state.contactNumberError}</span>
                    </div>
                    <div className="form-group">
                        <label>Email Address: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.delivery.emailAddress} 
                            onChange={this.onChangeEmailAddress.bind(this)}/>
                        <span className="form-field-error">{this.state.emailAddressError}</span>
                    </div>
                    <div className="form-group">
                        {this.state.readyToSubmit ? <Redirect to='/payment'/> : <input type="button" className="btn btn-warning" value="Payment" onClick={this.onSubmit.bind(this)}/> }
                    </div>
            </div>
        )   
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCartDelivery : (payload) => dispatch(setCartDelivery(payload))
});

const mapStateToProps = (state) => {
    return{
        loading: state.cart.loading,
        message: state.cart.message,
        result: state.cart.result
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Delivery);