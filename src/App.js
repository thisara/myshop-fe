import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import OrderCreate from './modules/order/components/create.order';
import OrderView from './modules/order/components/view.order';
import OrderEdit from './modules/order/components/edit.order';
import OrderList from './modules/order/components/list.order';
import OrderSearch from './modules/order/components/search.order';
import OrderDelete from './modules/order/components/delete.order';

import ProductCreate from './modules/product/components/create.product';
import ProductEdit from './modules/product/components/edit.product';
import ProductList from './modules/product/components/list.product';
import ProductSearch from './modules/product/components/search.product';
import ProductDelete from './modules/product/components/delete.product';

import HomePage from './modules/commons/components/home/home.index';
import Header from './modules/commons/components/headers/header';
import AppFooter from './modules/commons/components/footers/footer';
import ViewCart from './modules/cart/components/view.cart';

import Delivery from './modules/cart/components/delivery.cart';
import Payment from './modules/cart/components/payment.cart';
import CartPrint from './modules/commons/components/cart/print.cart';

//import Layout from './layout';

import './App.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
      <Container fluid>
        <Router>
            <Row>
             <Col className="header">
                <Header/>
            </Col>
            </Row>
            <Row className="justify-content-center align-items-start content">
                <Col xs={2} lg={2} sm={2}/>
                <Col xs={8} lg={8} sm={8}>
                  <Switch>
                      <Route path ='/order-search' component={OrderSearch}/>
                      <Route exact path='/order-create' component={OrderCreate}/>
                      <Route path='/order/view/:id' component={OrderView}/>
                      <Route path='/order/edit/:id' component={OrderEdit}/>
                      <Route path='/order/delete/:id' component={OrderDelete}/>
                      <Route path='/order-list' component={OrderList}/>

                      <Route path ='/product-search' component={ProductSearch}/>
                      <Route exact path='/product-create' component={ProductCreate}/>
                      <Route path='/product/edit/:id' component={ProductEdit}/>
                      <Route path='/product/delete/:id' component={ProductDelete}/>
                      <Route path='/product-list' component={ProductList}/>

                      <Route path='/view-cart' component={ViewCart}/>
                      <Route path='/delivery' component={Delivery}/>
                      <Route path='/payment' component={Payment}/>
                      <Route path='/print-cart' component={CartPrint}/>

                      <Route path='/' component={HomePage}/>
                  </Switch>
                </Col>
                <Col xs={2} lg={2} sm={2}/>
          </Row>
          <Row>
            <Col className="footer">
              <AppFooter/>
            </Col>
          </Row>
          </Router>
      </Container>
    );
}

export default App;