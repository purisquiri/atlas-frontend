import React from "react";
import { Divider, Grid, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const userID = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

const AddReview = ({ review, removeReview }) => {
  let theDate = new Date(review.created_at);
  let dateString = theDate.toDateString();

  const deleteReview = () => {
    fetch(`http://localhost:3000/api/v1/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    removeReview(review.id);
  };

  return (
    <div style={{ padding: 14 }} className="App">
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
        {review.user.id === +userID ? (
          <Button color="secondary" onClick={() => deleteReview()}>
            delete
          </Button>
        ) : null}
      </Paper>
    </div>
  );
};

export default AddReview;
