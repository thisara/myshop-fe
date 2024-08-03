import React from "react";
//import { Navbar, Footer } from 'react-bootstrap';
//import styled from 'styled-components';

const PageFooter = (props) => {
    return(
        <footer class="page-footer font-small pt-4">

        <div class="container-fluid text-center text-md-left page-footer">

            <div class="row">

            <div class="col-md-6 mt-md-0 mt-3">

                <h5 class="text-uppercase">MyShop</h5>
                <p>Here you can use rows and columns to organize your footer content.</p>

            </div>
        
            </div>

            <hr class="clearfix w-100 d-md-none pb-3"/>

        </div>

        <div class="footer-copyright text-center py-3">© {new Date().getFullYear()} Copyright: THISARA ALAWALA 
            <a href="https://mytechblogs.com/"> mytechblogs.com</a>
        </div>

        </footer>
    );
}

export default PageFooter;