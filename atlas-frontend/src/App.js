import React, { Component } from 'react';
import LoginContainer from './containers/LoginContainer'
import HomeContainer from './containers/HomeContainer'
import Navbar from './containers/Navbar' 
import SignIn from './containers/LoginContainer';

class App extends Component {
  render() {
    return (
      <div>
        {/* <SignIn/> */}
        <HomeContainer />
        <Navbar/>
        

      </div>
    );
  }
}

export default App;
