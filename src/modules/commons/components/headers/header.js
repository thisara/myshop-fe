import React from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import Cart from './cart';
import {Link} from 'react-router-dom';

const Styles = styled.div`
    .navbar{
        background-color : #2f435e;
        height : 70px
    }

    .navbar-brand, .navbar-text, .navbar-nav .nav-link{
        color: #bbb;

        &:hover {
            color:white;
        }
    }
`;

const Header = () => {
    return(
    <Styles>
        <Navbar expand="lg" >  
            <Navbar.Brand><Link to="/">MyShop</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                        Go To
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item><Link to="/order-create">Order Create</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/order-list">Order List</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/order-search">Order Search</Link></Dropdown.Item>
                        <Dropdown.Item devider />
                        <Dropdown.Item><Link to="/product-create">Product Create</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/product-list">Product List</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/product-search">Product Search</Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Nav>
            </Navbar.Collapse>
            <Navbar className="ml-auto"> 
              <Cart/> 
            </Navbar>
        </Navbar>
    </Styles>
    )
}

export default Header;