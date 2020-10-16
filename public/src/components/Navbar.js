import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, signoutUser } from "../redux/slices/userSlice";
import Login from "./Login";
import Signup from "./Signup";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const classes = useStyles();
  const authButton = user ? (
    <Button
      className={classes.auth}
      variant="contained"
      onClick={() => dispatch(signoutUser())}
    >
      Logout
    </Button>
    
  ) : (
    <div className={classes.auth}>
      <Button variant="contained" onClick={() => setLoginOpen(true)}>
        Login
      </Button>
      <Button variant="contained" onClick={() => setSignupOpen(true)}>
        Signup
      </Button>
    </div>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>PetLovers</Typography>
          <Link to="/profile">Profile</Link>
          {authButton}
        </Toolbar>
      </AppBar>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Signup open={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}
