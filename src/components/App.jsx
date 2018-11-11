import React from 'react';
import Scene from './Scene.jsx';
import Header from './Header.jsx';

import '../styles/App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTextOverlay: true,
      showAboutModal: false,
      showProjectsModal: false,
      showContactModal: false,
    };
  }


  componentDidCatch(error, info) {
    alert(`Unexpected Error Occured: ${error.message} \n\n refreshing page`);
    window.location.reload();
  }


  //for when the home nav item is clicked
  onHomeClicked = () => {
    console.log('home clicked');
    this.setState({
      showTextOverlay: true,
      showAboutModal: false,
      showProjectsModal: false,
      showContactModal: false,
    });
  }

  //for when the About nav item is clicked
  onAboutClicked = () => {
    console.log('about clicked');
    this.setState({
      showTextOverlay: false,
      showAboutModal: true,
      showProjectsModal: false,
      showContactModal: false,
    });
  }

  //for when the Projects nav item is clicked
  onProjectsClicked = () => {
    console.log('projects clicked');
    this.setState({
      showTextOverlay: false,
      showAboutModal: false,
      showProjectsModal: true,
      showContactModal: false,
    });
  }

  //for when the Contact nav item is clicked
  onContactClicked = () => {
    console.log('contact clicked');
    this.setState({
      showTextOverlay: false,
      showAboutModal: false,
      showProjectsModal: false,
      showContactModal: true,
    });
  }

  render() {
    return (
        <div>
          <Header
            onHomeClicked={this.onHomeClicked}
            onAboutClicked={this.onAboutClicked}
            onProjectsClicked={this.onProjectsClicked}
            onContactClicked={this.onContactClicked}
            {...this.state}/>
          <Scene/>
        </div>
    );
  }

}
