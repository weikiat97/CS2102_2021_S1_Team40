import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import LeaveRetrieval from "../components/LeaveRetrieval";
import Container from "@material-ui/core/Container";

export default function Leave() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  console.log(user);
  if (user && user.type.includes("fulltime")) {
    return (
      <Container>
        <h1>Leaves applied</h1>
        <LeaveRetrieval />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>
          Please Login LEAVE PAGE. Create an account with us if you haven't!
        </h1>
      </Container>
    );
  }
}
