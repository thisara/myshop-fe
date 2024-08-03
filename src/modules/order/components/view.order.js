import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import "react-datepicker/dist/react-datepicker.css";

import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { getOrderProductItems } from '../actions/actions.order';
import { CartSummary } from '../../commons/components/cart/cartSummary';

class View extends Component{

    constructor(props) {
        super(props);

        this.state = {
            order : {
                _id : '',
                orderNumber: '',
                orderName: '',
                orderDateCreated: '',
                orderStatus: '',
            },
            orderItems : {

            },
            delivery : {},
            payment : {
                paymentMethod : '',
                billingAddress : ''
            },

            loading : false,
            message : '',
            result : ''
            
        }
    }
        
    componentDidMount () {
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        this.props.getOrderProductItems(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {

        if(prevProps.orderProductItems !== this.props.orderProductItems){
            const orderProductItems = this.props.orderProductItems;
            if(orderProductItems){
                this.setState({
                    order : orderProductItems.order,
                    orderItems : orderProductItems.orderItems,
                    payment : orderProductItems.payment,
                    delivery : orderProductItems.delivery
                })
            }
        }
    }

    render (){

        console.log('OPI ' + JSON.stringify(this.state.orderProductItems));

        return(
            <div className="form-style">
            <FormHeader title='View Order' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
                <div className="form-group">
                    <label>Order Number :  </label>
                    <span>{this.state.order.orderNumber}</span>
                </div>
                <div className="form-group">
                    <label>Order Name : </label>
                    <span>{this.state.order.orderName}</span>
                </div>
                <div className="form-group">
                    <label>Billing Address : </label>
                    <span>{this.state.payment.billingAddress}</span>
                </div>
                <div className="form-group">
                    <label>Order Date : </label>
                    <span>{JSON.stringify(this.state.order.orderDateCreated)}</span>
                </div>
                <div className="form-group">
                    <label>Order Status : </label>
                    <span>{this.state.order.orderStatus}</span>
                </div>
                {
                <CartSummary orderItems={this.state.orderItems} delivery={this.state.delivery} payment={this.state.payment}/>
                }
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        getOrderProductItems: (payload) => dispatch(getOrderProductItems(payload)),
        
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        
        orderProductItems: state.order.orderProductItems,
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (View);