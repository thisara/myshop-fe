import React, { Component } from 'react';
import { connect} from 'react-redux';

import FormHeader from '../form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../selectors/reselector.global';

import { CartSummary } from './cartSummary';

class CartPrint extends Component {

    state = {
        delivery : {},
        payment : {},
        orderItems : {}
    }

    componentDidMount(){

        this.setState({
            orderItems : this.props.location.state.orderItems,
            delivery : this.props.location.state.delivery,
            payment : this.props.location.state.payment
        });
    }

    render(){
        return(
            <div className="form-style">
                <FormHeader title='Order Summary' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
                <CartSummary orderItems={this.state.orderItems} delivery={this.state.delivery} payment={this.state.payment}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    
});

const mapStateToProps = (state) => {
    return{
        loading:formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (CartPrint);