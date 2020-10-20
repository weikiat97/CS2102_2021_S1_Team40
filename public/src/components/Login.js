import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { getUserFromDb } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

export default function Login(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const classes = useStyles();
  const login = () => {
    dispatch(getUserFromDb(username, password));
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
              Sign in
            </Typography>
            <div className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                type="text"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={login}
              >
                Login
              </Button>
         
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
    // <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    // <DialogActions>
    //   <Button onClick={onClose}>Cancel</Button>
    //   <Button onClick={login}>Login</Button>
    // </DialogActions>
  );
}
