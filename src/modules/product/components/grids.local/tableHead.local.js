import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TableRow } from './tableRow.local';
import { gridHeaderSelector } from '../../../commons/components/grids/grid.props/grid.header.functions';
import { updatingOrderItems } from '../../selectors/reselector.product';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../../commons/selectors/reselector.global';
import { updateCart } from '../../../commons/actions/actions.global';

import { getPayloadToUpdateCart }  from '../../../commons/utils/cartPayloadGenerator';

export class TableHead extends Component{

    state = {
        orderItems : [],

        loading : false,
        message : '',
        result : '',
    }

    tabRow = (data, props, updateCart, orderItems) => {
        if(data && data.length > 0){
            return data.map(function (object, i){

                let quantity = 0;

                orderItems.map(function (item, k){
                    
                    if(object._id === item.productID){
                        quantity = item.quantity;
                    }
                    return quantity; //Need refactor! Add to resolve linters
                });
                
                return <TableRow obj={object} key={i} {...props} updateCart={updateCart} itemQty={quantity}/>;
            });
        }else{
            return (
                <td>No data found.</td>
            )
        }
    }

    render(){
        const gridHeaders = gridHeaderSelector(this.props.entity);
        const orderItems = this.props.orderItems.length !== 0 && this.props.orderItems.cartItems ? this.props.orderItems.cartItems : [];

        return(
            <div>
                
                <table className='table table-striped' style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            {gridHeaders}
                            <ActionsTitle {...this.props}/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow(this.props.data, this.props, this.updateCart, orderItems)}
                    </tbody>
                </table>
            </div>
        )
    }

    updateCart = (product, productID, quantity) => {

        let currentCompositeOrderItems = this.props.orderItems;

        //new immutable wrapper
        let orderItemsWrapper = {};

        orderItemsWrapper = getPayloadToUpdateCart(product,productID,quantity,currentCompositeOrderItems);

        this.props.updateCart(orderItemsWrapper);

    }
}

const ActionsTitle = (props) => {
    if(props.isEditable && props.isDeletable){
        return(
            <th colSpan='2'>Actions</th>
        )
    }else{
        return (
            <th></th>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCart: (payload) => dispatch(updateCart(payload)),
    //cleanResult: () => dispatch(cleanResult()),
    //cleanMessage: () => dispatch(cleanMessage()),
    //cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading:formWaiting(state.product),
        itemMessage : state.global.itemMessage,
        message:formWaitingMessage(state.product),
        result:formResultMessage(state.product),

        orderItems : updatingOrderItems(state.global)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (TableHead);