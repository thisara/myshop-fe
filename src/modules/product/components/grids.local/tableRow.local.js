import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { gridValueSelector } from '../../../commons/components/grids/grid.props/grid.body.functions';

class TableRow extends Component{

    state = {
        orderItems : [{
            productID : '',
            productName : '',
            quantity : 0
        }],
        isNotANumber:false
    }

    render(){
        const data = gridValueSelector(this.props.obj, this.props.entity);
        return(
            <tr>
                {data}
   
                <EditComponent 
                    elementPath={this.props.path} 
                    objId={this.props.obj._id} 
                    isEditable={this.props.isEditable}/>

                <DeleteComponent 
                    elementPath={this.props.path} 
                    objId={this.props.obj._id} 
                    isDeletable={this.props.isDeletable}/>

                <ProductQuantityComponent 
                    isNotANumber={this.state.isNotANumber} 
                    updateItemQty={this.updateItemQty} 
                    isForProductSearch={this.props.isForProductSearch} 
                    product = {this.props.obj} 
                    updateCart={this.props.updateCart} 
                    itemQty={this.props.itemQty}/>
            </tr>
        )
    }

    updateItemQty = (e, props) => {

        const quantity = e.target.value;
        let sendUpdate = false;
   
        if(quantity === 0){
            sendUpdate = false;
        }else if(quantity.length === 0){
            sendUpdate = false;
        }else if(isNaN(quantity)){
            sendUpdate = false;
        }else{
            sendUpdate = true;
        }

        if(!sendUpdate){
            this.setState({
                isNotANumber : true
            });
        }else{
            this.setState({
                isNotANumber : false
            });
            props.updateCart(props.product, props.product._id, e.target.value);
        }
    }
}

const EditComponent = (props) => {
    if(props.isEditable){
        return(
            <td>
                <Link to={"/" + props.elementPath + "/edit/"+props.objId} className="btn btn-warning">Edit</Link>
            </td>
        );
    }else{
        return(
            <></>
        )
    }
}

const DeleteComponent = (props) => {
    if(props.isDeletable){
        return(
            <td>
                <Link to={"/" + props.elementPath + "/delete/"+props.objId} className="btn btn-danger">Delete</Link>
            </td>
        )
    }else{
        return (
            <></>
        )
    }
}

const ProductQuantityComponent = (props) => {
    
    if(props.isForProductSearch){
        return (
            <td>
                <input className="input-product-qty" defaultValue='0' value={props.itemQty} type="number" onChange={(e) => props.updateItemQty(e, props)}/><span>{props.product.productUOM}</span>
                <NumberError isNotANumber={props.isNotANumber}/>
            </td>
            )
    }else{
        return (
            <td></td>
        )
    }
}

const NumberError = (props) => {
    if(props.isNotANumber){
        return(
            <div className="form-field-error">not a number !</div>
        )
    }else{
        return (
            <></>
        )
    }
}

export {
    TableRow
};