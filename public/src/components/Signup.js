import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import { signupPetOwner } from "../redux/slices/petOwnerSlice";
import { signupCareTaker } from "../redux/slices/careTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import CareTakerSignUp from "./CareTakerSignUp";

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
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nextDialog, setNextDialog] = useState(false);
  const [roles, setRoles] = useState({
    selected: {
      caretaker: false,
      petowner: false,
    },
  });
  const user = useSelector(selectUser);
  const signup = () => {
    //console.log(roles.selected);

    if (
      username !== "" &&
      password !== "" &&
      (roles.selected.caretaker || roles.selected.petowner)
    ) {
      if (roles.selected.caretaker && roles.selected.petowner) {
        setNextDialog(true);
        dispatch(
          signupCareTaker(username, password, ["caretaker", "petowner"])
        );
        dispatch(signupPetOwner(username, password, ["caretaker", "petowner"]));
      } else if (roles.selected.caretaker) {
        setNextDialog(true);
        //console.log("Sign up for caretaker");

        dispatch(signupCareTaker(username, password, ["caretaker"]));
      } else if (roles.selected.petowner) {
        //console.log("Sign up for petowner");

        dispatch(signupPetOwner(username, password, ["petowner"]));
      }

      onClose();
    }
  };
  const classes = useStyles();

  const toggleOption = (e) => {
    const key = e.currentTarget.value; // e.g. 'A'
    const value = !roles.selected[key];
    const newSelected = Object.assign(roles.selected, { [key]: value });
    setRoles({ selected: newSelected });
  };

  const getBsStyle = (key) => {
    return roles.selected[key] ? "primary" : "default";
  };

  return (
    <div>
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
                Sign Up
              </Typography>

              <form className={classes.form} Validate>
                <ButtonGroup fullWidth variant="outlined" bsStyle="default">
                  <Button
                    fullWidth
                    onClick={(e) => toggleOption(e)}
                    value="caretaker"
                    color={getBsStyle("caretaker")}
                  >
                    Caretaker
                  </Button>
                  <Button
                    fullWidth
                    onClick={(e) => toggleOption(e)}
                    value="petowner"
                    color={getBsStyle("petowner")}
                  >
                    PetOwner
                  </Button>
                </ButtonGroup>
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
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={signup}
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <CareTakerSignUp open={nextDialog} onClose={() => setNextDialog(false)} />
    </div>
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
