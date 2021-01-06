import React, { Component } from "react";

import AddReview from "../components/AddReview";
import ReviewsSearch from "../components/ReviewsSearch"

const token = localStorage.getItem("token");

export default class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/reviews", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => this.setState({ reviews: data }));
  }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
        <ReviewsSearch reviews={this.state.reviews}/>
        
      </div>
    );
  }
}
