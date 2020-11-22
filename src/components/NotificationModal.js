import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, Input, Fade, Backdrop, Modal } from "@material-ui/core";
import SnackBar from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NotificationModal({ senderName, receiverid }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [snack, setSnack] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("messages")
      .add({
        message: message,
        senderName: senderName || "System",
        receiverId: receiverid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        setOpen(false);
        setMessage("");
        setSnack(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <SnackBar severity="success" open={snack} setOpen={setSnack} />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={handleOpen}
      >
        Message
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.paper} onSubmit={handleSubmit}>
            <h2 id="transition-modal-title">Enter you message here</h2>
            <Input
              placeholder="Message..."
              inputProps={{ "aria-label": "description" }}
              value={message}
              type="text"
              onChange={(event) => setMessage(event.target.value)}
            />
          </form>
        </Fade>
      </Modal>
    </div>
  );
}
