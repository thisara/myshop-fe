import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import Link from 'react-router-dom';
//import Popup from 'reactjs-popup';
import ViewCart from '../../../cart/components/view.cart';
import CartIcon from '../../../../images/cart/cart.svg';
import { Modal, Button, Image } from 'react-bootstrap';

import { clearCart } from '../../../commons/actions/actions.global';

class Cart extends Component {

    state = {
        orderItems : [],
        checkOutMode : '',
        show : false
    }

    checkOut = () => {
        this.handleClose();
        this.setState({
            checkOutMode : 'CHECKOUT'
        });
    }

    reviewAndCheckOut = () => {
        this.handleClose();
        this.setState({
            checkOutMode : 'REVIEW'
        })
    }

    handleShow = () => {
        this.setState({
            show : true
        })
    }

    handleClose = () => {
        this.setState({
            show : false
        })
    }

    clearCart = () => {
        this.props.clearCart({});
    }

    render(){
        
        const cartItems = (this.props.orderItems && this.props.orderItems.cartItems) ? this.props.orderItems.cartItems : [];
        const cartItemCount = cartItems.length;

        return(
            <div className="cart-style">

                <Button variant="primary" onClick={this.handleShow}>
                    <Image src={CartIcon} alt='cart' width='30px' height='30px'/>&nbsp;
                        {
                            (cartItemCount === 0 ) ? 'empty' : cartItemCount + ' items'
                        }
                </Button>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> Cart </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ViewCart isOnModal = {true}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleClose.bind(this)}>
                            Continue Shopping
                        </Button>
                        <Button variant="danger" onClick={this.clearCart.bind(this)} disabled={cartItemCount===0}>
                            Empty Cart
                        </Button>
                        <Button variant="primary" onClick={this.checkOut.bind(this)} disabled={cartItemCount===0}>
                            Checkout
                        </Button>
                        <Button variant="primary" onClick={this.reviewAndCheckOut.bind(this)} disabled={cartItemCount===0}>
                            Review and Checkout
                        </Button>
                    </Modal.Footer>
                    
                </Modal>
                
                    {this.state.checkOutMode === 'CHECKOUT' ? 
                        <Redirect to='/delivery'/> : ''}
                    {this.state.checkOutMode === 'REVIEW' ? 
                        <Redirect to='/view-cart'/> : ''}
            </div>
        );
    }
}
/*
const Modals = (props) => {
    return(
    <Popup
      trigger={
        <Link className="button"> 
            <img src={CartIcon} alt='cart' width='30px' height='30px'/>&nbsp;
            {
                (props.cartItemCount === 0 ) ? 'empty' : props.cartItemCount + ' items'
            }
        </Link>}
      modal
      closeOnDocumentClick>
          
    {close => (
      <div>
        <ViewCart close={close} checkOut={props.checkOut} reviewAndCheckOut={props.reviewAndCheckOut}/>
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
    </Popup>
    );
};
*/
const mapDispatchToProps = (dispatch) => ({
    clearCart : (payload) => dispatch(clearCart(payload)),
});

const mapStateToProps = (state) => {
    return{
        orderItems : state.global.orderItems
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (Cart);