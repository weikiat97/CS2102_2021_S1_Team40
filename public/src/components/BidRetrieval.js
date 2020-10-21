import React, { useState, useEffect } from "react";
import { API_HOST } from "../consts";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import LeaveApplication from "./LeaveApplication";
import LeaveDeletion from "./LeaveDeletion";
import LeaveUpdating from "./LeaveUpdating";

import Table from "@material-uis/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function BidRetrieval(props) {
  const user = useSelector(selectUser);
  const useStyles = makeStyles({
    auth: {
      marginLeft: "auto",
    },
  });

  const [bids, setBids] = useState([]);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  // const [deleteOpen, setLeaveDeletionOpen] = useState(false);
  const [data, setData] = useState("");
  // const [deleteLeave, setDeleteLeave] = useState("");

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_HOST}/caretakers/bids/${user.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then(async (result) => {
          if (result.status === "success") {
            await setBids(result.data);
          } else {
            console.log("No bids found");
          }
        })
        .catch((err) => alert(err));
    }
    fetchData();
  }, [acceptOpen, declineOpen]);

  // const applyButton = (
  //   <div className={classes.auth}>
  //     <Button variant="contained" onClick={() => setLeaveApplicationOpen(true)}>
  //       Apply Leave
  //     </Button>
  //   </div>
  // );

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Pet Owner Username</TableCell>
              <TableCell align="right">Pet Owner Rating</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Pet Type</TableCell>
              <TableCell align="right">Transfer Method</TableCell>
              <TableCell align="right">Remarks</TableCell>
              <TableCell align="right">Accept</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map((bid, i) => (
              <TableRow key={i}>
                <TableCell align="right">
                  {leave.row.substring(1, 11)}
                </TableCell>
                <TableCell align="right">
                  {leave.row.substring(12, 22)}
                </TableCell>
                <TableCell align="right">
                  Start
                </TableCell>
                <TableCell align="right">
                  End
                </TableCell>
                <TableCell align="right">
                  $$
                </TableCell>
                <TableCell align="right">
                  Type
                </TableCell>
                <TableCell align="right">
                  Transfer
                </TableCell>
                <TableCell align="right">
                  Remarks
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setData(bid.row);
                      setAcceptOpen(true);
                    }}
                  >
                    Accept Bid
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setData(bid.row);
                      setDeclineOpen(true);
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
      <AcceptBid
        open={acceptOpen}
        onClose={() => setAcceptOpen(false)}
        data={updateDate}
      />
      {/* <LeaveApplication
        open={applyOpen}
        onClose={() => setLeaveApplicationOpen(false)}
      /> */}
      <LeaveDeletion
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        data={updateData}
      />
    </>
  );
}
