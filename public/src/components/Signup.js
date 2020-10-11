import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

export default function Signup(props) {
  const {open, onClose} = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a username and password to signup an account for PetLovers!
        </DialogContentText>
        <TextField
          autoFocus
          label="Username"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
    </Dialog>
  );
}