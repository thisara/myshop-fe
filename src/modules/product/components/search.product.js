import React, {Component} from 'react';
import { connect } from 'react-redux';

import TableHead from './grids.local/tableHead.local';
import { searchProduct, cleanSearchProducts } from '../actions/actions.product';
import { cleanResult, cleanMessage, cleanLoading } from '../../commons/actions/actions.global';
import FormHeader from '../../commons/components/form/formHeader';

import { formSearchProducts } from '../selectors/reselector.product';
import { formWaiting, formWaitingMessage, formResultMessage } from '../../commons/selectors/reselector.global';

export class Search extends Component{

    state = {
        loading : false,
        message : '',
        searchProducts : []
    }

    componentDidMount(){
        this.props.cleanResult();
        this.props.cleanMessage();
        this.props.cleanLoading();
        this.props.cleanSearchProducts();
    }

    search = (event) => {
        this.props.searchForProduct(event.target.value);
    }

    render(){

        return(
            <div className="form-style">

                <FormHeader title='Search Products' loading={this.props.loading} loadingMessage={this.props.message} resultMessage={this.props.result}/>
          
                <div className="form-group">
                    <input type="text" className="form-control" value={this.state.searchText} placeholder="Search" onChange={this.search.bind(this)}/>
                </div>
                
                <TableHead data={this.props.searchProducts} isEditable={false} isDeletable={false} entity = 'PRODUCT' path='product' isForProductSearch={true}/>                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchForProduct: (payload) => dispatch(searchProduct(payload)),
    cleanResult: () => dispatch(cleanResult()),
    cleanMessage: () => dispatch(cleanMessage()),
    cleanLoading: () => dispatch(cleanLoading()),
    cleanSearchProducts: () => dispatch(cleanSearchProducts())
})

const mapStateToProps = (state) => {
    return{
        loading: formWaiting(state.global),
        message:formWaitingMessage(state.global),
        result:formResultMessage(state.global),
        searchProducts:formSearchProducts(state.product)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Search);