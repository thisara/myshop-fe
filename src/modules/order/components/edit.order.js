import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import { editUpdateOrder, getOrder} from '../actions/actions.order';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';
import { formEditOrder } from '../selectors/reselector.order';
import { orderNumberHandler, orderNameHander } from '../handlers/input.handlers';
import { HANDLER_FAIL, HANDLER_PASS} from '../handlers/type.handers';

export class Edit extends Component{

    constructor(props) {
        super(props);

        this.state = {
            _id : '',
            orderNumber : '',
            orderName : '',
            orderDateCreated : new Date(), 

            orderNumberError : '',
            orderNameError : '',
            orderDateCreatedError :'',

            order : null,

            loading : false,
            message : '',
            result : ''
            
        }
    }
        
    componentDidMount () {
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();

        this.props.loadForUpdate(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.order !== this.props.order) {

          const odr = this.props.order;

          if(odr){
            this.setState ({
                order:odr,
                _id : odr._id,
                orderNumber: odr.orderNumber,
                orderName: odr.orderName,
                orderDateCreated: odr.orderDateCreated
            })
          }
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

    onSubmit(e) {
        
        e.preventDefault();
        const payload = {
            _id : this.state._id,
            orderNumber: this.state.orderNumber,
            orderName: this.state.orderName,
            orderDateCreated: this.state.orderDateCreated
        };

        this.props.submitForUpdate(payload);

    }

    render (){
        return(
            <div className="form-style">
            <FormHeader title='Update Order' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>Order Number :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={this.state.orderNumber || ''}
                      onChange={this.onChangeOrderNumber.bind(this)}
                      />
                      <span className="form-field-error">{this.state.orderNumberError}</span>
                </div>
                <div className="form-group">
                    <label>Order Name : </label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.orderName || ''}
                      onChange={this.onChangeOrderName.bind(this)}
                      />
                      <span className="form-field-error">{this.state.orderNameError}</span>
                </div>
                <div className="form-group">
                    <label>Order Date : </label>
                    <DatePicker className="form-control form-field-date" selected={new Date(this.state.orderDateCreated)} onChange={this.onChangeOrderDateCreated} />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Order" 
                      className="btn btn-warning"/>
                      <p>{this.state.message}</p>
                </div>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        loadForUpdate: (payload) => dispatch(getOrder(payload)),
        submitForUpdate: (payload) => dispatch(editUpdateOrder(payload)),
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        
        order:formEditOrder(state.order)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Edit);