import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {MONTH_ARRAY} from "../consts";

const useStyles = makeStyles((theme) => ({
  infoGroup: {
    display: "flex",
    flexDirection: "row",
  },
  infoCard: {
    flex: 1,
    margin: 16,
  },
  title: {
    fontSize: 14,
  },
  emptyText: {
    margin: 'auto',
    paddingTop: 16
  },
  aggregateInfo: {
    padding: 16
  }
}));

export default function AdminProfile() {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const ftcaretakerInfo = [];
  const ptcaretakerInfo = [];
  const underperfCaretaker = [];
  if (user && user.type.includes("admin")) {
    return (
      <Container>
        <h1>Admin Profile</h1>
        <Button>Set Caretaker Base Price</Button>
        <div className={classes.aggregateInfo}>
          <h5>Total Salary to be Paid:</h5>
          <h5>Number of Jobs ({MONTH_ARRAY[new Date().getMonth()]}):</h5>
          <h5>Month with Highest Jobs: ({MONTH_ARRAY[new Date().getMonth()]})</h5>
        </div>
        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Full-time Caretakers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Number of Pets Cared For ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                  <TableCell>Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ftcaretakerInfo &&
                ftcaretakerInfo["past"] ? ftcaretakerInfo["past"].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row["username"]}
                    </TableCell>
                    <TableCell>{row["num_pets"]}</TableCell>
                    <TableCell>{row["salary"]}</TableCell>
                  </TableRow>
                )) : <Typography className={classes.emptyText} color="textSecondary">You have no full-time caretakers.</Typography>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Part-time Caretakers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Number of Pets Cared For ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                  <TableCell>Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ptcaretakerInfo &&
                ptcaretakerInfo["past"] ? ptcaretakerInfo["past"].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row["username"]}
                    </TableCell>
                    <TableCell>{row["num_pets"]}</TableCell>
                    <TableCell>{row["salary"]}</TableCell>
                  </TableRow>
                )) : <Typography className={classes.emptyText} color="textSecondary">You have no part-time caretakers.</Typography>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className={classes.infoCard}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Under-performing Caretakers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Number of Pets Cared For ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                  <TableCell>Salary to be Paid ({MONTH_ARRAY[new Date().getMonth()]})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {underperfCaretaker &&
                underperfCaretaker["past"] ? underperfCaretaker["past"].map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {row["username"]}
                    </TableCell>
                    <TableCell>{row["num_pets"]}</TableCell>
                    <TableCell>{row["salary"]}</TableCell>
                  </TableRow>
                )) : <Typography className={classes.emptyText} color="textSecondary">You have no under-performing caretakers.</Typography>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not an admin!</h1>
    </Container>
  );
}
