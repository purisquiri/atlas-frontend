import React, { Component } from "react";
import MapboxGLMap from "../components/MapBoxGLMap";
import Search from "../components/Search";
import SimpleModal from "../components/Modal";
const token = localStorage.getItem("token")
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
        <Search handleSearch={this.props.handleSearch} setModal={this.setModal} />
        <MapboxGLMap countries={this.props.countries} />
      </div>
    );
  }
}

export default HomeContainer;
