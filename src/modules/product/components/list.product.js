import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableHead from '../../commons/components/grids/tableHead';
import { listProducts } from '../actions/actions.product';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';

import { formListProducts } from '../selectors/reselector.product';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class List extends Component{

    state = {
        loading : false,
        message : '',
        listProducts: [],
    }

    componentDidMount(){
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();
        this.props.listForProducts();
    }

    render(){
        return(
            <div className="form-style">
                <FormHeader title='List Products' loading={this.props.loading} loadingMessage={this.props.message} resultMessage=''/>
                <TableHead data={this.props.listProducts} isEditable={true} isDeletable={true} entity = 'PRODUCT' path='product'/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    listForProducts: () => dispatch(listProducts()),
    cleanResult: () => dispatch(cleanResult()),
    cleanMessage: () => dispatch(cleanMessage()),
    cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        listProducts:formListProducts(state.product)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (List);