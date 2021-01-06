import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReviewModal from './ReviewModal'

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
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export default function SimpleModal({countries, deleteCountries, handleSearch, event, changeModal, open}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [reviewModal, renderReviewModal] = React.useState(false)
  
    // const handleOpen = () => {
    //   setOpen(true);
    // };
  
    const handleClose = () => {
      changeModal(false);
    };

   const handleAddReview = () => {
      renderReviewModal(true)
    }

  
    const body = (
      <div style={modalStyle} className={classes.paper}>
       
        <h2 id="simple-modal-title">{event}</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        <button onClick={() => handleSearch(event)} >Add to Places Visited</button>
        <button onClick={() => handleAddReview()} >Add a Review</button>
        <button onClick={() => deleteCountries(event)}>Delete</button>
       
       
      </div>
    );
  
    return (
      <div >
        {/* <button type="button" onClick={handleOpen}>
          Open Modal
        </button> */}
       
        <Modal
        
         open={open}
         onClose={handleClose}

          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
          
          
        </Modal>
        
        {reviewModal === true ? <ReviewModal 
          open={reviewModal} renderReviewModal={renderReviewModal} event={event} countries={countries}
        /> : null} 
      </div>
    );
  }