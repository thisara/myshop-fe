import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { gridValueSelector } from './grid.props/grid.body.functions';
//import { EditComponent, DeleteComponent } from './grid.props/grid.body.components';

class TableRow extends Component{

    state = {
        orderItems : [{
            productID : '',
            quantity : 0
        }]
    }

    render(){
        const data = gridValueSelector(this.props.obj, this.props.entity);
        return(
            <tr>
                {data}
   
                <EditComponent elementPath={this.props.path} objId={this.props.obj._id} isEditable={this.props.isEditable}/>

                <DeleteComponent elementPath={this.props.path} objId={this.props.obj._id} isDeletable={this.props.isDeletable}/>

                <ViewComponent elementPath={this.props.path} objId={this.props.obj._id} isViewable={this.props.isViewable}/>
                
            </tr>
        )
    } 
}

const EditComponent = (props) => {
    if(props.isEditable){
        return(
            <td>
                <Link to={"/" + props.elementPath + "/edit/"+props.objId} className="btn btn-warning">Edit</Link>
            </td>
        );
    }else{
        return(
            <td></td>
        )
    }
}

const DeleteComponent = (props) => {
    if(props.isDeletable){
        return(
            <td>
                <Link to={"/" + props.elementPath + "/delete/"+props.objId} className="btn btn-danger">Delete</Link>
            </td>
        )
    }else{
        return (
            <td></td>
        )
    }
}

const ViewComponent = (props) => {
    if(props.isViewable){
        return(
            <td>
                <Link to={"/" + props.elementPath + "/view/"+props.objId} className="btn btn-warning">View</Link>
            </td>
        )
    }else{
        return(
            <td></td>
        )
    }
}

export {
    TableRow
};