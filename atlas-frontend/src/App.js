import React, { Component } from 'react';
import HomeContainer from './containers/HomeContainer'
import Navbar from './containers/Navbar' 

class App extends Component {
  render() {
    return (
      <div>
        <HomeContainer />
        <Navbar/>
      </div>
    );
  }
}

export default App;
