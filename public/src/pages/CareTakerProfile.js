import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  infoGroup: {
    display: "flex",
    flexDirection: "row"
  },
  infoCard: {
    flex: 1,
    margin: 16
  },
  title: {
    fontSize: 14
  }
}));

export default function CareTakerProfile() {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (user && user.type.includes("caretaker")) {
    return (
      <Container>
        <h1>Your Caretaker Profile</h1>
        <Button>Advertise Availability</Button>
        <div className={classes.infoGroup}>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>Basic Info</Typography>
              <Typography>Job Type:</Typography>
              <Typography>Number of Pet Days:</Typography>
              <Typography>Expected Salary ({monthArray[new Date().getMonth()]}):</Typography>
            </CardContent>
          </Card>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>Ongoing Jobs</Typography>
              <List>

              </List>
            </CardContent>
          </Card>
        </div>
        <div className={classes.infoGroup}>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>Reviews</Typography>
            </CardContent>
          </Card>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>Past Jobs</Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not a Caretaker yet! Please register to be one!</h1>
    </Container>
  )
}
