import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import "react-datepicker/dist/react-datepicker.css";

import { editUpdateProduct, editProduct } from '../actions/actions.product';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';
import { formEditProduct } from '../selectors/reselector.product';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { productNumberHandler, productNameHander } from '../handlers/input.handlers';
import { HANDLER_FAIL, HANDLER_PASS} from '../handlers/type.handers';

export class Edit extends Component{

    constructor(props) {
        super(props);

        this.state = {
            _id : '',
            productNumber : '',
            productName : '',
            productCategory : '', 
            productUOM:'',
            productUnitPrice:'',
            productCurrency: '',

            productNumberError : '',
            productNameError : '',
            productCategoryError :'',

            loading : false,
            message : '',
            result : '',
            editProduct : null
        }
    }
        
    componentDidMount () {
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        this.props.loadForUpdate(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editProduct !== this.props.editProduct) {

          const odr = this.props.editProduct;

          if(odr){
            this.setState ({
                editProduct:odr,
                _id : odr._id,
                productNumber: odr.productNumber,
                productName: odr.productName,
                productUOM: odr.productUOM,
                productUnitPrice: odr.productUnitPrice,
                productCurrency: odr.productCurrency,
                productCategory: odr.productCategory
            })
          }
        }
    }

    onChangeProductNumber(e){
        const result = productNumberHandler(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productNumber: result.value,
                productNumberError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productNumberError: result.value
            });
        }else{
            this.setState({
                productNumberError: 'Communication error !'
            });
        }
    }

    onChangeProductName(e){
        const result = productNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productName: result.value,
                productNameError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productNameError: result.value
            });
        }else{
            this.setState({
                productNameError: 'Communication error !'
            });
        }
    }

    onChangeProductUOM(e){

        const result = productNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productUOM: result.value,
                productUOMError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productUOMError: result.value
            });
        }else{
            this.setState({
                productUOMError: 'Communication error !'
            });
        }
    }

    onChangeProductUnitPrice(e){

        const result = productNumberHandler(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productUnitPrice: result.value,
                productUnitPriceError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productUnitPriceError: result.value
            });
        }else{
            this.setState({
                productUnitPriceError: 'Communication error !'
            });
        }
    }

    onChangeProductCurrency(e){

        const result = productNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productCurrency: result.value,
                productCurrencyError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productCurrencyError: result.value
            });
        }else{
            this.setState({
                productCurrencyError: 'Communication error !'
            });
        }
    }

    onChangeProductCategory(e){

        const result = productNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productCategory: result.value,
                productCategoryError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productCategoryError: result.value
            });
        }else{
            this.setState({
                productCategoryError: 'Communication error !'
            });
        }
    }

    onSubmit(e) {
        
        e.preventDefault();
        const payload = {
            _id : this.state._id,
            productNumber: this.state.productNumber,
            productName: this.state.productName,
            productCategory: this.state.productCategory,
            productUOM: this.state.productUOM,
            productUnitPrice: this.state.productUnitPrice,
            productCurrency: this.state.productCurrency
        };

        this.props.submitForUpdate(payload);

    }

    render (){
        return(
            <div className="form-style">
            <FormHeader title='Update Product' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>Product Number :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={this.state.productNumber || ''}
                      onChange={this.onChangeProductNumber.bind(this)}
                      />
                      <span className="form-field-error">{this.state.productNumberError}</span>
                </div>
                <div className="form-group">
                    <label>Product Name :</label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.productName || ''}
                      onChange={this.onChangeProductName.bind(this)}
                      />
                      <span className="form-field-error">{this.state.productNameError}</span>
                </div>
                <div className="form-group">
                        <label>Unit of Measure: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.productUOM} 
                            onChange={this.onChangeProductUOM.bind(this)}/>
                        <span className="form-field-error">{this.state.productUOMError}</span>
                    </div>
                    <div className="form-group">
                        <label>Unit Price: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.productUnitPrice} 
                            onChange={this.onChangeProductUnitPrice.bind(this)}/>
                        <span className="form-field-error">{this.state.productUnitPriceError}</span>
                    </div>
                    <div className="form-group">
                        <label>Currency : </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.productCurrency} 
                            onChange={this.onChangeProductCurrency.bind(this)}/>
                        <span className="form-field-error">{this.state.productCurrencyError}</span>
                    </div>
                <div className="form-group">
                     <label>Product Category: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.productCategory} 
                                onChange={this.onChangeProductCategory.bind(this)}/>
                        <span className="form-field-error">{this.state.productCategoryError}</span>
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Product" 
                      className="btn btn-warning"/>
                      <p>{this.state.message}</p>
                </div>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        loadForUpdate: (payload) => dispatch(editProduct(payload)),
        submitForUpdate: (payload) => dispatch(editUpdateProduct(payload)),
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        editProduct:formEditProduct(state.product),
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Edit);