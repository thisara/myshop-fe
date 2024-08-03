import React, {Component} from 'react';
import { connect } from 'react-redux';
 
import "react-datepicker/dist/react-datepicker.css";

import { createProduct } from '../actions/actions.product';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { productPriceHandler, productNumberHandler, productNameHander } from '../handlers/input.handlers';
import { HANDLER_FAIL, HANDLER_PASS} from '../handlers/type.handers';

import { getUnitOfMeasure, getCurrencies, getProductCategories } from '../constants/product.enums';

import { Form, Col } from 'react-bootstrap';

export class Create extends Component{

    constructor(props){
        super(props);

        this.state ={
            productNumber : '',
            productNumberError : null,
            productNumberErrorMessage : '',

            productName : '',
            productNameError : null,
            productNameErrorMessage : '',

            //productUOM:'',
            productUOMError : null,
            productUOMErrorMessage : '',

            productUnitPrice: '',
            productUnitPriceError : null,
            productUnitPriceErrorMessage : '',

            //productCurrency: '',
            productCurrencyError : null,
            productCurrencyErrorMessage : '',

            productCategoryError :null,
            productCategoryErrorMessage : '',
            
            loading : false,
            message : '',
            result : '',

            unitOfMeasure : [],
            selectedUnitOfMeasure : '',

            currency : [],
            selectedCurrency : '',

            productCategory : [],
            selectedProductCategory :'',

            formValidated : false,
            activateFormValidation : false
        }
    }

    componentDidMount(){

        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        const unitOfMeasures = getUnitOfMeasure();
        const currencies = getCurrencies();
        const productCategories = getProductCategories();

        this.setState({
            loading : false,

            unitOfMeasure : unitOfMeasures,
            currency:currencies,
            productCategory : productCategories
        })
    }

    onChangeProductNumber(e){

        const result = productNumberHandler(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productNumber: result.value,
                productNumberErrorMessage: '',
                productNumberError : false,
                //validate : true
            });
            return true;
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productNumberErrorMessage: result.value,
                productNumberError : true,
                //validate : false
            });
            return false;
        }else{
            this.setState({
                productNumberErrorMessage: 'Communication error !',
                productNumberError : true,
                //validate : false
            });
            return false;
        }
    }

    onChangeProductName(e){

        const result = productNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productName: result.value,
                productNameError: false,
                //validate : true
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productNameError : true,
                productNameErrorMessage: result.value,
                //validate : false,
            });
        }else{
            this.setState({
                productNameError : true,
                productNameErrorMessage: 'Communication error !',
                //validate : false,
            });
        }
    }

    onChangeProductUOM(e){

        const uom = e.target.value;
        console.log('ss ' + uom);

        if(uom !== 0){
            this.setState({
                selectedUnitOfMeasure : e.target.value,
                productUOMError : false,
                //validate : true
            });
        }else{
            this.setState({
                productUOMError : true,
                productUOMErrorMessage : 'Must select a unit',
                //validate : false
            })
        }
    }

    onChangeProductUnitPrice(e){

        const result = productPriceHandler(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                productUnitPrice: result.value,
                productUnitPriceError: false,
                productUnitPriceErrorMessage : '',
                //validate : true
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                productUnitPrice : '',
                productUnitPriceError : true,
                productUnitPriceErrorMessage: result.value,
                //validate : false
            });
        }else{
            this.setState({
                productUnitPrice : '',
                productUnitPriceError : true,
                productUnitPriceErrorMessage: 'Communication error !',
                //validate : false
            });
        }
    }

    onChangeProductCurrency(e){
        const currency = e.target.value;

        if(currency !== 0){
            this.setState({
                selectedCurrency : e.target.value,
                productCurrencyError : false,
                //validate : true
            });
        }else{
            this.setState({
                productCurrencyError : true,
                productCurrencyErrorMessage : 'Must select a currency',
                //validate : false
            })
        }
        this.setState({
            selectedCurrency : e.target.value
        });
    }

    onChangeProductCategory(e){
        this.setState({
            selectedProductCategory : e.target.value
        });
    }

    onSubmit(e){

        e.preventDefault(); 

        const form = e.currentTarget;

        if (form.checkValidity() === false) {

            e.preventDefault();
            e.stopPropagation();

        }else{
            const payload = {
                productNumber: this.state.productNumber,
                productName: this.state.productName,
                productUOM: this.state.selectedUnitOfMeasure,
                productUnitPrice: this.state.productUnitPrice,
                productCurrency: this.state.selectedCurrency,
                productCategory: this.state.selectedProductCategory
            };
    
            console.log(JSON.stringify(payload));
            this.props.submitForCreate(payload);
        }
    }

    getOptions = (data) => {
        if(data){
            return data.map(function(object){
                let key = Object.keys(object);
                return <option value={key} key={key}>{object[key]}</option>
            });
        }else{
            return(
                <></>
            )
        }
    }

    render(){
        
        return(
            <div className="form-style">
                
                <FormHeader title = 'Create Product' loadingMessage={this.props.message} resultMessage={this.props.result}/>

                <Form onSubmit={this.onSubmit.bind(this)}>
                
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationProductCode">
                            <Form.Label>Product Code</Form.Label>
                            <Form.Control
                                required
                                type = "text"
                                value = {this.state.productNumber}
                                placeholder = "--"
                                isInvalid = {this.state.productNumberError === true}
                                isValid = {this.state.productNumberError === false}
                                onChange={this.onChangeProductNumber.bind(this)}
                                />
                            <Form.Control.Feedback type="invalid">{this.state.productNumberErrorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type = "text"
                                placeholder = "--"
                                isInvalid = {this.state.productNameError === true}
                                isValid = {this.state.productNameError === false}
                                onChange={this.onChangeProductName.bind(this)}
                                />
                            <Form.Control.Feedback type="invalid">{this.state.productNameErrorMessage}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationUnit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control 
                                as="select"
                                required
                                isInvalid = {this.state.productUOMError === true}
                                isValid = {this.state.productUOMError === false}
                                onChange={this.onChangeProductUOM.bind(this)}
                                >
                                <option value={''}>--</option>
                                {this.getOptions(this.state.unitOfMeasure)}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{this.state.productUOMErrorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationUnitPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                    required
                                    type = "text"
                                    className="form-control"
                                    value={this.state.productUnitPrice} 
                                    placeholder="0.00"
                                    isInvalid = {this.state.productUnitPriceError === true}
                                    isValid = {this.state.productUnitPriceError === false}
                                    onChange={this.onChangeProductUnitPrice.bind(this)}/>
                            <Form.Control.Feedback type="invalid">{this.state.productUnitPriceErrorMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationUnitCurrency">
                            <Form.Label>Currency</Form.Label>
                            <Form.Control
                                as = "select"
                                required
                                isInvalid = {this.state.productCurrencyError === true}
                                isValid = {this.state.productCurrencyError === false}
                                onChange={this.onChangeProductCurrency.bind(this)}
                                >
                                <option value={''}>--</option>
                                {this.getOptions(this.state.currency)}
                                </Form.Control>
                            <Form.Control.Feedback type="invalid">{this.state.productCurrencyErrorMessage}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
{/*
                    <div className="form-group">
                        <label>Unit of Measure: </label>
                        
                        <select value={this.state.selectedUnitOfMeasure} className="form-control" onChange={this.onChangeProductUOM.bind(this)}>
                            <option value='0'>Please select</option>
                            {this.getOptions(this.state.unitOfMeasure)}   
                        </select>
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
                        <select value={this.state.selectedCurrency} className="form-control" onChange={this.onChangeProductCurrency.bind(this)}>
                            <option value='0'>Please select</option>
                            {this.getOptions(this.state.currency)}   
                        </select>
                        <span className="form-field-error">{this.state.productCurrencyError}</span>
                    </div>
*/}
                    <div className="form-group">
                        <label>Product Category: </label>
                        <select value={this.state.selectedProductCategory} className="form-control" onChange={this.onChangeProductCategory.bind(this)}>
                            <option value='0'>Please select</option>
                            {this.getOptions(this.state.productCategory)}   
                        </select>        
                        <span className="form-field-error">{this.state.productCategoryError}</span>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-warning"/>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        submitForCreate: (payload) => dispatch(createProduct(payload)),
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading:formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Create);