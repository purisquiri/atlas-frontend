import React, { Component } from "react";
import MapboxGLMap from "../components/MapBoxGLMap";
import Search from "../components/Search";
import SimpleModal from "../components/Modal";
import Navbar from "./Navbar";

const token = localStorage.getItem("token");
class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  setModal = (openOrClose) => this.setState({ modalOpen: openOrClose });

  render() {
    return (
      <div>
        <div>
       { token ? 
       [
          <Navbar key={1} />,
           <Search
             key={2}
             handleSearch={this.props.handleSearch}
             setModal={this.setModal}
             deleteCountry={this.props.deleteCountry}
            /> 
       ]
           : null
      
       }
      </div>
        <MapboxGLMap countries={this.props.countries} />
      </div>
    );
  }
}

export default HomeContainer;
