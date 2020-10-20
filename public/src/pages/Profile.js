import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Container from "@material-ui/core/Container";

export default function Profile() {
  const user = useSelector(selectUser);
  if (user) {
    return (
      <Container>
        <h1>YOU ARE AT THE PROFILE PAGE</h1>
        <Link to="/profile/leaves">
          <button>Go to Leaves</button>
        </Link>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Please Login Create an account with us if you haven't!</h1>
      </Container>
    );
  }
}
