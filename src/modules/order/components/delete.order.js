import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteUpdateOrder, deleteOrder } from '../actions/actions.order';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';

import { formDeleteOrder } from '../selectors/reselector.order';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class Delete extends Component{

    constructor(props) {
        super(props);
        this.state = {
            _id : '',
            orderNumber : '',
            orderName : '',
            orderDateCreated :'', 
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
        if (prevProps.deleteOrder !== this.props.deleteOrder) {

          const odr = this.props.deleteOrder;

          if(odr){
            this.setState ({
                deleteOrder:odr,
                _id : odr._id,
                orderNumber: odr.orderNumber,
                orderName: odr.orderName,
                orderDateCreated: odr.orderDateCreated
            })
          }
          
        }
    }

    onChangeOrderNumber(e){
        this.setState({
            orderNumber: e.target.value
        });
    }

    onChangeOrderName(e){
        this.setState({
            orderName: e.target.value
        });
    }

    onChangeOrderDateCreated(e){
        this.setState({
            orderDateCreated: e.target.value
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

        this.props.submitForDelete(payload);

    }

    render (){
        return(
            <div className="form-style">
            <FormHeader title='Delete Order' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>Order Number :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      defaultValue={this.state.orderNumber || ''}
                      onChange={this.onChangeOrderNumber.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Order Name : </label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.orderName || ''}
                      onChange={this.onChangeOrderName.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <label>Order Date : </label>
                    <input type="text" 
                      className="form-control"
                      defaultValue={this.state.orderDateCreated || ''}
                      onChange={this.onChangeOrderDateCreated.bind(this)}
                      readOnly
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Delete Order" 
                      className="btn btn-danger"/>
                      <p>{this.state.message}</p>
                </div>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
        loadForDelete: (payload) => dispatch(deleteOrder(payload)),
        submitForDelete: (payload) => dispatch(deleteUpdateOrder(payload)),
        cleanResult: () => dispatch(cleanResult()),
        cleanMessage: () => dispatch(cleanMessage()),
        cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        deleteOrder:formDeleteOrder(state.order)
        
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Delete);