import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { signupUser } from "../redux/slices/userSlice";
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
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signup = () => {
    dispatch(signupUser(username, password));
    onClose();
  };
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
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
              className={classes.submit}
              onClick={onClose}
            >
              Full-Time
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={onClose}
            >
              Part-Time
            </Button>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

// <DialogContentText>
//         Please enter a username and password to signup an account for
//         PetLovers!
//       </DialogContentText>
//       <TextField
//         autoFocus
//         label="Username"
//         type="text"
//         fullWidth
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <TextField
//         autoFocus
//         label="Password"
//         type="password"
//         fullWidth
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose}>Cancel</Button>
//       <Button onClick={signup}>Login</Button>
//     </DialogActions>
