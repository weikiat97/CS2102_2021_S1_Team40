import React, { useState, useEffect } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { getLeaves } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { selectLeaves } from "../redux/slices/leaveSlice";
import LeaveApplication from "./LeaveApplication";
import LeaveDeletion from "./LeaveDeletion";
import LeaveUpdating from "./LeaveUpdating";


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function LeaveRetrieval(props) {

  // const classes = useStyles();
  const useStyles = makeStyles({
    auth: {
      marginLeft: "auto",
    },
  });

  const user = useSelector(selectUser);

  // const dispatch = useDispatch();
  // dispatch(getLeaves(user.username))

  // const leaves = useSelector(selectLeaves);
  const [leaves, setLeaves] = useState([]);
  const [applyOpen, setLeaveApplicationOpen] = useState(false);
  const [updateOpen, setLeaveUpdatingOpen] = useState(false);
  const [deleteOpen, setLeaveDeletionOpen] = useState(false);
  const classes = useStyles();
  const authButton = (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLeaveApplicationOpen(true)}>
        Apply Leave
      </Button>
      <Button variant="contained" onClick={() => setLeaveUpdatingOpen(true)}>
        Update Leave
      </Button>
      <Button variant="contained" onClick={() => setLeaveDeletionOpen(true)}>
        Delete Leave
      </Button>
    </div>
  );

  useEffect(() => {
    let data = getLeaves(user.username);
    console.log('pls work: ' + data);
    setLeaves(data)
  })

  return (
    <>
      {authButton}
      <LeaveApplication open={applyOpen} onClose={() => setLeaveApplicationOpen(false)} />
      <LeaveUpdating open={updateOpen} onClose={() => setLeaveUpdatingOpen(false)} />
      <LeaveDeletion open={deleteOpen} onClose={() => setLeaveDeletionOpen(false)} />
    </>
  );
}
