import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";

export default function Profile() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  console.log(user);
  if (caretaker) {
    return (
      <div>
        <h1>YOU ARE AT THE PROFILE PAGE</h1>
          <Link to="/profile/leaves">
            <button>Go to Leaves</button>
          </Link>
          <Link to="/profile/currBids">
            <button>Go to Current Bids</button>
          </Link>
      </div>
    );
  } else if (user) {
    return (
      <div>
        <h1>YOU ARE AT THE PROFILE PAGE</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Login Create an account with us if you haven't!</h1>
      </div>
    );
  }
}
