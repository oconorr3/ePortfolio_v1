
import '../styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Clearfix, Grid, Row, Col, Image, Button, Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar id="header" fixedTop defaultExpanded>
        <Navbar.Header>
           <Navbar.Brand>
             <a href="#home">Conor O'Neill</a>
           </Navbar.Brand>
           <Navbar.Toggle/>
         </Navbar.Header>
           <Navbar.Collapse>
             <Nav bsStyle="pills" pullRight>
                <NavItem className="nav-item" href="#home">  Home     </NavItem>
                <NavItem className="nav-item" href="#home">  About    </NavItem>
                <NavItem className="nav-item" href="#home">  Projects </NavItem>
                <NavItem className="nav-item" href="#home">   Contact   </NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}
