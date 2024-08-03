import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableHead from '../../commons/components/grids/tableHead';

import { listOrders } from '../actions/actions.order';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';

import FormHeader from '../../commons/components/form/formHeader';

import { formListOrders } from '../selectors/reselector.order';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class List extends Component{

    state = {
        loading : false,
        message : '',
        listOrders: [],
    }

    componentDidMount(){
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();
        this.props.listForOrders();
    }

    render(){
        return(
            <div>
                <FormHeader title='List Orders' loading={this.props.loading} loadingMessage={this.props.message} resultMessage=''/>
                <TableHead data={this.props.listOrders} isEditable={true} isDeletable={true} isViewable={true} entity = 'ORDER' path='order' />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    listForOrders: () => dispatch(listOrders()),
    cleanResult: () => dispatch(cleanResult()),
    cleanMessage: () => dispatch(cleanMessage()),
    cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        
        listOrders:formListOrders(state.order)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (List);