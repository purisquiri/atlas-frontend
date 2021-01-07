import React from "react";
import AddReview from "./AddReview";

const ReviewsSearch = () => {
  {
    this.state.reviews.map((review) => {
      return <AddReview review={review} />;
    });
  }

  return <div></div>;
};

export default ReviewsSearch;
