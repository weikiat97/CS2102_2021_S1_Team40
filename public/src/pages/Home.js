import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import Container from "@material-ui/core/Container";

export default function Home() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  if (user && caretaker) {
    return (
      <Container>
        <h1>
          Welcome {user.username}. You are registered as both a petowner and a
          caretaker. Would you like to be a parttime caretaker or fulltime
          caretaker?
        </h1>
      </Container>
    );
  } else if (user) {
    return (
      <Container>
        <h1>Welcome {user.username}. You are registered as a petowner.</h1>
      </Container>
    );
  } else if (caretaker) {
    return (
      <Container>
        <h1>
          Welcome {caretaker.username}. You are registered as a caretaker. Would
          you like to be a parttime caretaker or fulltime caretaker?
        </h1>
      </Container>
    );
  } else {
    return (
      <Container>
        <br></br>
        <h1>Please Login.</h1>
        <h2>Create an account with us if you haven't!</h2>
      </Container>
    );
  }
  // if (petowner && caretaker) {
  //   return (
  //     <div>
  //       <h1>
  //         Welcome {petowner.username}. You are registered as both a petowner and a
  //         caretaker. Would you like to be a parttime caretaker or fulltime
  //         caretaker?
  //       </h1>
  //     </div>
  //   );
  // } else if (petowner) {
  //   return (
  //     <div>
  //       <h1>Welcome {user.username}. You are registered as a petowner.</h1>
  //     </div>
  //   );
  // } else if (caretaker) {
  //   return (
  //     <div>
  //       <h1>
  //         Welcome {caretaker.username}. You are registered as a caretaker. Would
  //         you like to be a parttime caretaker or fulltime caretaker?
  //       </h1>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <br></br>
  //       <h1>Please Login. Create an account with us if you haven't!</h1>
  //     </div>
  //   );
  // }
}
