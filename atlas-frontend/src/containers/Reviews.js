import React, { Component } from "react";

import AddReview from "../components/AddReview";
import instance from "../BaseUrl";

const token = localStorage.getItem("token");

export default class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    fetch(`${instance()}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => this.setState({ reviews: data }));
  }

  removeReview = (reviewId) => {
    let filterReviews = this.state.reviews.filter(
      (review) => review.id !== reviewId
    );
    this.setState({
      reviews: filterReviews,
    });
  };

  render() {
    let sorted = this.state.reviews.sort(
      (reviewA, reviewB) => reviewB.id - reviewA.id
    );
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Stories</h1>

        {sorted.map((review) => {
          return (
            <AddReview
              key={review.id}
              review={review}
              removeReview={this.removeReview}
            />
          );
        })}
      </div>
    );
  }
}
