import React, {Component} from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { createOrder } from '../actions/actions.order';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { orderNumberHandler, orderNameHander } from '../handlers/input.handlers';
import { HANDLER_FAIL, HANDLER_PASS} from '../handlers/type.handers';

export class Create extends Component{

    constructor(props){
        super(props);

        this.state ={
            orderNumber : '',
            orderName : '',
            orderDateCreated: new Date(),

            orderNumberError : '',
            orderNameError : '',
            orderDateCreatedError :'',

            loading : false,
            message : '',
            result : ''
        }
    }

    onChangeOrderNumber(e){

        const result = orderNumberHandler(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                orderNumber: result.value,
                orderNumberError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                orderNumberError: result.value
            });
        }else{
            this.setState({
                orderNumberError: 'Communication error !'
            });
        }
    }

    onChangeOrderName(e){

        const result = orderNameHander(e.target.value);

        if(result && result.type === HANDLER_PASS){
            this.setState({
                orderName: result.value,
                orderNameError: ''
            });
        }else if(result && result.type === HANDLER_FAIL){
            this.setState({
                orderNameError: result.value
            });
        }else{
            this.setState({
                orderNameError: 'Communication error !'
            });
        }
    }

    onChangeOrderDateCreated = (date) => {
        this.setState({
            orderDateCreated: new Date(date)
        });
    }

    onSubmit(e){

        e.preventDefault(); 
        const payload = {
            orderNumber: this.state.orderNumber,
            orderName: this.state.orderName,
            orderDateCreated: this.state.orderDateCreated
        };

        console.log(JSON.stringify(payload));
        this.props.submitForCreate(payload);

    }

    componentDidMount(){

        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        this.setState({
            loading : false
        })
    }

    render(){
        return(
            <div className="form-style">
                
                <FormHeader title='Create Order' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Order Number: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.orderNumber} 
                            onChange={this.onChangeOrderNumber.bind(this)}/>
                        <span className="form-field-error">{this.state.orderNumberError}</span>
                    </div>
                    <div className="form-group">
                        <label>Order Name: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.orderName} 
                            onChange={this.onChangeOrderName.bind(this)}/>
                        <span className="form-field-error">{this.state.orderNameError}</span>
                    </div>
                    <div className="form-group">
                        <label>Created Date : </label>
                        <DatePicker className="form-control form-field-date" selected={this.state.orderDateCreated} onChange={this.onChangeOrderDateCreated} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Order" className="btn btn-warning"/>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        submitForCreate: (payload) => dispatch(createOrder(payload)),
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