import React from 'react';
import Scene from './Scene.jsx';
import Header from './Header.jsx';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Header/>
          <Scene/>
        </div>
    );
  }
}
