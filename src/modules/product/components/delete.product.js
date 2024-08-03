import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteUpdateProduct, deleteProduct } from '../actions/actions.product';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';

import { formDeleteProduct } from '../selectors/reselector.product';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class Delete extends Component{

    constructor(props) {
        super(props);
        this.state = {
            _id : '',
            productNumber : '',
            productName : '',
            productCategory :'', 
            loading : true,
            message : '',
            result : ''
        }
    }
        
    componentDidMount () {
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();
        this.props.loadForDelete(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.deleteProduct !== this.props.deleteProduct) {

          const odr = this.props.deleteProduct;

          if(odr){
            this.setState ({
                deleteProduct:odr,
                _id : odr._id,
                productNumber: odr.productNumber,
                productName: odr.productName,
                productCategory: odr.productCategory
            })
          }
          
        }
    }

    onChangeProductNumber(e){
        this.setState({
            productNumber: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            productName: e.target.value
        });
    }

    onChangeProductDateCreated(e){
        this.setState({
            productCategory: e.target.value
        });
    }

    onSubmit(e) {
        
        e.preventDefault();
        const payload = {
            _id : this.state._id,
            productNumber: this.state.productNumber,
            productName: this.state.productName,
            productCategory: this.state.productCategory
        };

        this.props.submitForDelete(payload);

    }

    render (){
        return(
            <div className="form-style">
            <FormHeader title='Delete Product' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>Product Number :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={this.state.productNumber || ''}
                      onChange={this.onChangeProductNumber.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Product Name : </label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.productName || ''}
                      onChange={this.onChangeProductName.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Product Date : </label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.productCategory || ''}
                      onChange={this.onChangeProductDateCreated.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Delete Product" 
                      className="btn btn-danger"/>
                      <p>{this.state.message}</p>
                </div>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        loadForDelete: (payload) => dispatch(deleteProduct(payload)),
        submitForDelete: (payload) => dispatch(deleteUpdateProduct(payload)),
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        deleteProduct:formDeleteProduct(state.product)
        
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Delete);