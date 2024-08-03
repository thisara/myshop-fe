import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableHead from '../../commons/components/grids/tableHead';
import { searchOrder } from '../actions/actions.order';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';

import { formSearchOrders } from '../selectors/reselector.order';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class Search extends Component{

    state = {
        loading : false,
        message : '',
        searchOrders : []
    }

    componentDidMount(){
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();
    }

    search = (event) => {
        this.props.searchForOrder(event.target.value);
    }

    render(){

        return(
            <div className="form-style">

                <FormHeader title='Search Orders' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
          
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.searchText} onChange={this.search.bind(this)}/>
                </div>
                <span>{this.state.searchText}</span>
                
                <TableHead data={this.props.searchOrders} isEditable={false} isDeletable={false} entity = 'ORDER' path='order'/>                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchForOrder: (payload) => dispatch(searchOrder(payload)),
    cleanResult: () => dispatch(cleanResult()),
    cleanMessage: () => dispatch(cleanMessage()),
    cleanLoading: () => dispatch(cleanLoading())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),

        searchOrders:formSearchOrders(state.order)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Search);