import React from "react";
import PetOwnerProfile from "../pages/PetOwnerProfile";
import { selectUser } from "../redux/slices/userSlice"
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";

export default function Profile() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  if (caretaker) {
    return (
      <Container>
        <h1>YOU ARE AT THE PROFILE PAGE</h1>
        <Link to="/profile/leaves">
          <button>Go to Leaves</button>
        </Link>
      </Container>
    );
  } else if (user) {
    return (
      <PetOwnerProfile username={user.username} />
    );
  } else {
    return (
      <Container>
        <h1>Please Login Create an account with us if you haven't!</h1>
      </Container>
    );
  }
}
