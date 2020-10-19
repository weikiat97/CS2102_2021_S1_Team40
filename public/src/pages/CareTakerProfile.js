import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

export default function CareTakerProfile() {
  const user = useSelector(selectUser);
  return (
    <Container>
      <h1>Your Caretaker Profile</h1>
    </Container>
  );
}
