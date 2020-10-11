import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {getUserFromDb} from "../redux/slices/userSlice";
import {useDispatch} from "react-redux";

export default function Login(props) {
  const {open, onClose} = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    dispatch(getUserFromDb(username, password));
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your username and password to login to PetLovers!
        </DialogContentText>
        <TextField
          autoFocus
          label="Username"
          type="text"
          fullWidth
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          autoFocus
          label="Password"
          type="password"
          fullWidth
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={login}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}