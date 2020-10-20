import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";

export default function Home() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  if (user && caretaker) {
    return (
      <div>
        <h1>Welcome {user.username}. You are registered as both a petowner and a caretaker.</h1>
      </div>
    );
  }else if (user) {
    return (
      <div>
        <h1>Welcome {user.username}. You are registered as a petowner.</h1>
      </div>
    );
  } else if (caretaker){
    return (
      <div>
        <h1>Welcome {caretaker.username}. You are registered as a caretaker.</h1>
      </div>
    );
  } else {  
    return (
      <div>
        <br></br>
        <h1>Please Login. Create an account with us if you haven't!</h1>
      </div>
    );
  }
}
