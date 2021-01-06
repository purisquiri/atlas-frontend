import React from 'react';
import AddReview from './AddReview'

const ReviewsSearch = () => {
    {this.state.reviews.map((review) => {
        return <AddReview key={review.id} review={review} />;
      })}
    
    
    
    return (
        <div>
            
        </div>
    );
}

export default ReviewsSearch;


