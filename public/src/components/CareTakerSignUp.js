import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { signupFTCareTaker } from "../redux/slices/fullTimeCareTakerSlice";
import { signupPTCareTaker } from "../redux/slices/partTimeCareTakerSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

export default function CareTakerSignUp(props) {
  const user = useSelector(selectUser);
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [roles, setRoles] = useState({
    selected: {
      fulltime: false,
      parttime: false,
    },
  });
  const toggleOption = (e) => {
    const key = e.currentTarget.value; // e.g. 'A'
    const value = true;
    const newSelected = Object.assign(roles.selected, { [key]: value });
    setRoles({ selected: newSelected });

    if (key === "parttime") {
      console.log("signing up for parttime caretaker");
      dispatch(signupPTCareTaker(user.username));
    } else if (key === "fulltime") {
      console.log("signing up for fulltime caretaker");
      dispatch(signupFTCareTaker(user.username));
    } else {
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Become a CareTaker
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              value="fulltime"
              className={classes.submit}
              onClick={(e) => toggleOption(e)}
            >
              Full-Time
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              value="parttime"
              className={classes.submit}
              onClick={(e) => toggleOption(e)}
            >
              Part-Time
            </Button>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
