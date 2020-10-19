import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { updateLeave } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function LeaveUpdating(props) {
  const { open, onClose, data } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // console.log('starting hereee: ' + data.substring(1, 11));
  const old_start_date = props.data.substring(1, 11);
  const old_end_date = props.data.substring(12, 22);
  var new_start_date = props.data.substring(1, 11);
  var new_end_date = props.data.substring(12, 22);
  // const [old_start_date, setOldStartDate] = useState(props.data.substring(1, 11));
  // const [old_end_date, setOldEndDate] = useState(props.data.substring(12, 22));
  // const [new_start_date, setNewStartDate] = useState(props.data.substring(1, 11));
  // const [new_end_date, setNewEndDate] = useState(props.data.substring(12, 22));
  const classes = useStyles();
  const update = () => {
    // console.log("correct old start: " + old_start_date);
    // console.log("correct new start: " + new_start_date);
    // console.log("STARTTTT: " + data.substring(1, 11));
    // if (new_start_date == "") {
    //   // console.log("new start date is empty");
    //   //setOldStartDate(data.substring(1,11));
    //   setNewStartDate(data.substring(1,11));
    //   dispatch(updateLeave(user.username, data.substring(1, 11), data.substring(12, 22), data.substring(1, 11), new_end_date));
    //   // console.log("new start date is now: " + new_start_date);
    // } else if (new_end_date == "") {
    //   // console.log("new end date is empty");
    //   //setOldEndDate(data.substring(12,22));
    //   // console.log("lets see: " + data.substring(12,22));
    //   setNewEndDate(data.substring(12,22));
    //   // console.log("new end date is now: " + new_end_date);
    //   dispatch(updateLeave(user.username, data.substring(1, 11), data.substring(12, 22), new_start_date, data.substring(12, 22)));
    // } else {
    // dispatch(updateLeave(user.username, data.substring(1, 11), data.substring(12, 22), new_start_date, new_end_date)); ***
    dispatch(
      updateLeave(
        user.username,
        old_start_date,
        old_end_date,
        new_start_date,
        new_end_date
      )
    );
    // }
    // console.log("old start: " + old_start_date);
    // console.log("old end: " + old_end_date);
    // console.log("new start: " + new_start_date);
    // console.log("new end: " + new_end_date);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Updating</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please indicate the old start and end date that you wish to update,
          and the new start and end date:
        </DialogContentText>
        {/*
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="Old Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setOldStartDate(e.target.value)}
        />
        </form>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="End Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setOldEndDate(e.target.value)}
        />
        </form>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="New Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setNewStartDate(e.target.value)}
        />
        </form>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="New End Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setNewEndDate(e.target.value)}
        />
        </form>*/}
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue={data.substring(1, 11)}
            //minDate={date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              //setNewStartDate(e.target.value)
              new_start_date = e.target.value;
            }}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="New End Date"
            type="date"
            defaultValue={data.substring(12, 22)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              //setNewEndDate(e.target.value)
              new_end_date = e.target.value;
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            console.log();
            // setOldStartDate(data.substring(1,11));
            // setOldEndDate(data.substring(12,22));
            // if(new_start_date == "" && new_end_date =="") {
            //   alert("No changes were made");
            // } else if (new_start_date == "") {
            //   // console.log("mi here");
            //   setNewStartDate(data.substring(1, 11));
            //   update();
            // } else if (new_end_date == "") {
            //   // console.log("mi here 2");
            //   setNewEndDate(data.substring(12, 22));
            //   update();
            // } else{
            update();
            // }
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
