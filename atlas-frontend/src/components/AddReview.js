import React from "react";
import { Divider, Grid, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const AddReview = ({ review }) => {
  let theDate = new Date(review.created_at);
  let dateString = theDate.toDateString();

  return (
    <div style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item></Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              {review.user.username}
            </h4>
            <Rating
              value={review.rating}
              max={5}
              onChange={(value) => console.log(`Rated with value ${value}`)}
            />
            <p style={{ textAlign: "left" }}>{review.body}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted on {dateString}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};

export default AddReview;
