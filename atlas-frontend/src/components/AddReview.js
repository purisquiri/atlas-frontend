import React from "react";
import { Divider, Grid, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const AddReview = ({ key, review }) => {
  let theDate = new Date(review.created_at);
  let dateString = theDate.toDateString();

  return (
   
    <div style={{ padding: 14 }} className="App">
    {review.user && review.country !== null ?
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item></Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {review.user.username}
            </h4>
            <h3>{review.country.country_code}</h3>
            <Rating value={review.rating} max={5} name="read-only" readOnly />
            <p style={{ textAlign: "left" }}>{review.body}</p>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <p style={{ textAlign: "left", color: "gray" }}>
              posted on {dateString}
            </p>
          </Grid>
        </Grid>
      </Paper> : 
      null
      }
    </div>
  );
};

export default AddReview;
