import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

export default function Home() {
  const user = useSelector(selectUser);
  if (user) {
    return (
      <div>
        <h1>Welcome {user.username}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Login. Create an account with us if you haven't!</h1>
      </div>
    );
  }
}
