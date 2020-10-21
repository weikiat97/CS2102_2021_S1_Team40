import React from "react";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Button from "@material-ui/core/Button";

export default function AdminProfile() {
  const user = useSelector(selectUser);
  if (user.type.includes("admin")) {
    return (
      <Container>
        <h1>Admin Profile</h1>
      </Container>
    );
  }
  return (
    <Container>
      <h1>You are not an admin!</h1>
      <Button>Set Caretaker Base Price</Button>
    </Container>
  )
}
