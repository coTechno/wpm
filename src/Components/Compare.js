import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { Button, Modal, TextField } from "@mui/material";
import { makeStyles } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Context/AlertContext";
import {auth, db} from '../firebaseConfig';

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(2px)",
  },
  compareBox: {
    width: "auto",
    padding: "1rem",
    border: "1px solid",
  },
}));

function Compare() {
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState("");
  const { setAlert } = useAlert();

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const handleModal = () => {
    if (user) setOpen(true);
    else {
      setAlert({
        open: true,
        type: "warning",
        message: "Login to Compare!",
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const checkUserExists = async () => {

    const ref = db.collection('usernames').doc(`${username}`);
    const response = await ref.get()
    console.log(response);
    if(response.exists){
        if(user.uid === response.data().uid) return false;
    }
    return response.exists;
  };

  const handleSubmit = async () => {
    if (await checkUserExists()) navigate(`/compare/${username}`);
    else {
      setAlert({
        open: true,
        message: "Invalid Username",
        type: "warning",
      });
    }
  };

  const classes = useStyles();
  const { theme } = useTheme();
  return (
    <div>
      <div
        className="compare-btn"
        style={{
          cursor: "pointer",
          color: theme.background,
          background: theme.title,
          padding: "0.3rem",
          borderRadius: "5px",
          marginTop: "-5px",
        }}
        onClick={handleModal}
      >
        COMPARE
      </div>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className={classes.compareBox}>
          <TextField
            type="text"
            label="Enter Username"
            varient="outlined"
            InputLabelProps={{
              style: {
                color: theme.title,
              },
            }}
            InputProps={{
              style: {
                color: theme.title,
              },
            }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            sx={{
              backgroundColor: theme.title,
              color: theme.background,
              marginLeft: "5px",
              marginTop: "10px",
            }}
            onClick={handleSubmit}
          >
            Compare
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Compare;
