
import '../styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Image, Button, Navbar, NavItem, Nav } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItemIndex: 0
      /*homeActive: true,
      aboutActive: false,
      projectsActive: false,
      contactActive: false,*/
    };
  }

  //Handler for when a navItem is clicked
  onNavItemClicked = (clickedItemIndex, clickedMenuItem) => {
    console.log('SELECTED '  + clickedMenuItem + '\n eventKey ' + clickedItemIndex);
    this.setState({ activeItemIndex : clickedItemIndex });

    /*//this has to be done a better way
    if (this.state.activeItemIndex == 0) {
      this.setState({
        homeActive: true,
        aboutActive: false,
        projectsActive: false,
        contactActive: false,
      });
    } else if (this.state.activeItemIndex == 1) {
      this.setState({
        homeActive: false,
        aboutActive: true,
        projectsActive: false,
        contactActive: false,
      });
    } else if (this.state.activeItemIndex == 2) {
      this.setState({
        homeActive: false,
        aboutActive: false,
        projectsActive: true,
        contactActive: false,
      });
    } else {
      this.setState({
        homeActive: false,
        aboutActive: false,
        projectsActive: false,
        contactActive: true,
      });
    }*/

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
             <Nav bsStyle='pills' pullRight onSelect={i => this.onNavItemClicked(i)}>
                <NavItem id='home' eventKey="0" className='nav-item' href='#home'>  Home     </NavItem>
                <NavItem id='about' eventKey="1" className='nav-item' href='#about'>  About    </NavItem>
                <NavItem id='projects' eventKey="2" className='nav-item' href='#projects'>  Projects </NavItem>
                <NavItem id='contact'eventKey="3" className='nav-item' href='#contact'>  Contact   </NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}
