import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import TextField from '@material-ui/core/TextField';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";

const userId = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ReviewModal = ({ open, renderReviewModal, countries, event }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [countryId, newId] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState("");

  useEffect(() => {
    countries.filter((country) =>
      country.country_code === event ? newId(country.id) : null
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer  ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          country_id: countryId,
          rating: value,
          body: text,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
      document.getElementsByTagName("form")[1].reset();
    } else {
      alert("Cannoy submit empty story");
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add a Story</h2>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Rating
          style={{ width: 200 }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder=""
          onChange={(event) => setText(event.target.value)}
        />
        <Button type="submit" color="primary" className={classes.submit}>
          Submit
        </Button>
      </form>
    </div>
  );

  const closeModal = () => {
    renderReviewModal(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ReviewModal;
