import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { declineBid } from "../redux/slices/bidSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function BidDecline(props) {
  const { open, onClose, data } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(
      declineBid("testing petowner name", "testing petname", user.username, "2020-10-10", "2020-10-11")
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Decline Bid</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to decline the bid from testing petowner name?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={cancel}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
