import React, { useState, useEffect } from "react";
import { API_HOST } from "../consts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getLeaves } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { selectLeaves } from "../redux/slices/leaveSlice";
import LeaveApplication from "./LeaveApplication";
import LeaveDeletion from "./LeaveDeletion";
import LeaveUpdating from "./LeaveUpdating";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const user = useSelector(selectUser);
  // useEffect(() => {
  //   console.log("hmmm");
  //   await get();
  // }, [])

  // const classes = useStyles();
  const useStyles = makeStyles({
    auth: {
      marginLeft: "auto",
    },
  });

  // const dispatch = useDispatch();
  // dispatch(getLeaves(user.username))

  // const leaves = useSelector(selectLeaves);
  // const leave = useSelector(selectLeaves);
  const [leaves, setLeaves] = useState([]);
  const [applyOpen, setLeaveApplicationOpen] = useState(false);
  const [updateOpen, setLeaveUpdatingOpen] = useState(false);
  const [deleteOpen, setLeaveDeletionOpen] = useState(false);
  const [updateDate, setUpdateDate] = useState("");
  const [deleteLeave, setDeleteLeave] = useState("");
  const [numberOfLeaves, setNumberOfLeaves] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_HOST}/users/leaves/${user.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        // body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === "success") {
            // console.log("HMMMM????")
            // console.log('DATA: ' + result.data[0].row);
            // saveState(LEAVE_STATE_KEY, result.data);
            // console.log("done saving")
            await setLeaves(result.data);
          } else {
            console.log("ninai mei you leave");
            // throw new Error(result.message);
          }
        })
        .catch((err) => alert(err));
    }
    fetchData();
  }, [applyOpen, updateOpen, deleteOpen]);

  // console.log('leave here plsss: ' + JSON.stringify(leaves));
  // for (var i = 0; i < leaves.length; i++) {
  //     console.log(leaves[i].row);
  // }

  const applyButton = (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLeaveApplicationOpen(true)}>
        Apply Leave
      </Button>
      {/* <Button variant="contained" onClick={() => setLeaveUpdatingOpen(true)}>
        Update Leave
      </Button>
      <Button variant="contained" onClick={() => setLeaveDeletionOpen(true)}>
        Delete Leave
      </Button> */}
    </div>
  );

  const updateButton = (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLeaveUpdatingOpen(true)}>
        Update Leave
      </Button>
    </div>
  );

  const deleteButton = (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLeaveDeletionOpen(true)}>
        Delete Leave
      </Button>
    </div>
  );

  function calculateLeaves() {
    var count = 0;
    leaves.map((leave, index) => {
      count += parseInt(leave.row.substring(23, leave.row.length - 1));
    });
    return count;
  }

  return (
    <>
      <h2>Number of leaves used: {calculateLeaves()}</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">End</TableCell>
              <TableCell align="right">Number Of Days</TableCell>
              <TableCell align="right">Update Leave</TableCell>
              <TableCell align="right">Delete Leave</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave, i) => (
              <TableRow key={i}>
                <TableCell align="right">
                  {leave.row.substring(1, 11)}
                </TableCell>
                <TableCell align="right">
                  {leave.row.substring(12, 22)}
                </TableCell>
                <TableCell align="right">
                  {leave.row.substring(23, leave.row.length - 1)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setUpdateDate(leave.row);
                      setLeaveUpdatingOpen(true);
                    }}
                  >
                    Update Leave
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setDeleteLeave(leave.row);
                      setLeaveDeletionOpen(true);
                    }}
                  >
                    Delete Leave
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {applyButton}
      <LeaveUpdating
        open={updateOpen}
        onClose={() => setLeaveUpdatingOpen(false)}
        data={updateDate}
      />
      <LeaveApplication
        open={applyOpen}
        onClose={() => setLeaveApplicationOpen(false)}
      />
      <LeaveDeletion
        open={deleteOpen}
        onClose={() => setLeaveDeletionOpen(false)}
        data={deleteLeave}
      />
    </>
  );
}
