import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { deleteLeave } from "../redux/slices/leaveSlice";
import { selectUser, signoutUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

// const useStyles = makeStyles({
//   auth: {
//     marginLeft: "auto",
//   },
// });

export default function LeaveDeletion(props) {
  const { open, onClose, data } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // const [start_date, setStartDate] = useState("");
  // const [end_date, setEndDate] = useState("");
  // const classes = useStyles();
  // console.log('start here leh: ' + start_date);
  const cancel = () => {
    dispatch(
      deleteLeave(user.username, data.substring(1, 11), data.substring(12, 22))
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the leave from {data.substring(1, 11)}{" "}
          to {data.substring(12, 22)}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={cancel}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
