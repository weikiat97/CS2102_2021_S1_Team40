import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

export default function CareTakerProfile() {
  const user = useSelector(selectUser);
  if (user.type.includes("caretaker")) {
    return (
      <Container>
        <h1>Your Caretaker Profile</h1>
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not a Caretaker yet! Please register to be one!</h1>
    </Container>
  )
}
