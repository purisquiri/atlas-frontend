import React, { Component } from 'react';
import MapboxGLMap from '../components/MapBoxGLMap'
import Search from '../components/Search'


class HomeContainer extends Component {

    constructor() {
        super()
        this.state = {
            countries: ["in", "iso_3166_1_alpha_3"]
        }
    }

    handleSearch = (event) => {
        event.preventDefault()
        this.setState({
            countries: [...this.state.countries, event.target.search.value.toString()]
        })
        // console.log("ttttttt")

    }


    render() {
        return (
            <div>
                <Search handleSearch={this.handleSearch}/>
                <MapboxGLMap countries={this.state.countries}/>
            </div>
        );
    }
}

export default HomeContainer;



