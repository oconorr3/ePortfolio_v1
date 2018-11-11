
import '../styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Image, Button, Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Navbar id='header' fixedTop defaultExpanded>
        <Navbar.Header>
           <Navbar.Brand>
             <a href='#home'>Conor O'Neill</a>
           </Navbar.Brand>
           <Navbar.Toggle/>
         </Navbar.Header>
           <Navbar.Collapse>
             <Nav bsStyle='pills' pullRight>
                <NavItem className='nav-item' href='#home' onClick={this.props.onHomeClicked}>  Home     </NavItem>
                <NavItem className='nav-item' href='#about' onClick={this.props.onAboutClicked}>  About    </NavItem>
                <NavItem className='nav-item' href='#projects' onClick={this.props.onProjectsClicked}>  Projects </NavItem>
                <NavItem className='nav-item' href='#contact' onClick={this.props.onContactClicked}>  Contact   </NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}
