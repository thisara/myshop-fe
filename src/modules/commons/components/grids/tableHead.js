import React, { Component } from 'react';
import { TableRow } from './tableRow';
import { gridHeaderSelector } from './grid.props/grid.header.functions';
import { Table } from 'react-bootstrap';

export default class TableHead extends Component{

    state = {
        loading : false,
        orderItems : [{
            productID : '',
            quantity : 0
        }]
    }

    tabRow = (data, props, updateCart) => {
        if(data && data.length > 0){
            return data.map(function (object, i){
                return <TableRow obj={object} key={i} {...props} updateCart={updateCart}/>;
            });
        }
    }

    render(){
        const gridHeaders = gridHeaderSelector(this.props.entity);
        return(
            <div>
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            {gridHeaders}
                            <ActionsTitle {...this.props}/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow(this.props.data, this.props)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const ActionsTitle = (props) => {
    if(props.isEditable && props.isDeletable){
        return(
            <th colSpan='2'>Actions</th>
        )
    }else{
        return (
            <th></th>
        )
    }
}

