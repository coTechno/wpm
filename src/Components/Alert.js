import React from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import { useAlert } from "../Context/AlertContext";

const AlertBar = () => {
  const { alert, setAlert } = useAlert();

  const close = (e, reason) => {
    if (reason === "clickaway") return;
    setAlert({
      open: false,
      message: "",
      type: "",
    });
  };
  // to prevent the warning
  console.log = console.warn = console.error = () => {};
  console.error("Something bad happened.");
  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={2500}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Slide in={alert.open}>
          <Alert severity={alert.type} onClose={close}>
            {alert.message}
          </Alert>
        </Slide>
      </Snackbar>
    </div>
  );
};

export default AlertBar;
