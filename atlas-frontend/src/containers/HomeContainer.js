import React, { Component } from 'react';
import MapboxGLMap from '../components/MapBoxGLMap'
import Search from '../components/Search'
import SimpleModal from '../components/Modal'



class HomeContainer extends Component {

    constructor() {
        super()
        this.state = {
            countries: [],
            modalOpen: false
        }
    }

    setModal = openOrClose => this.setState({modalOpen: openOrClose})

    handleSearch = (event) => {
        this.setState({
            countries: [...this.state.countries, event]
        })
        // console.log("ttttttt")

    }


    render() {
        return (
            <div>
          
                <Search handleSearch={this.handleSearch} setModal={this.setModal}/>
                <MapboxGLMap countries={this.state.countries}/>
                
            </div>
        );
    }
}

export default HomeContainer;



