import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import BidsRetrieval from "../components/BidRetrieval";
import Container from "@material-ui/core/Container";


export default function CurrentBids() {
  const user = useSelector(selectUser);
//   console.log(caretaker);
  if (user && user.type.includes("caretaker")) {
    return (
      <div>
      <Container>
        <h1>Current Bids:</h1><br></br>
        <BidsRetrieval />
      </Container>
        
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          You do not have permission to view the bids page! Please login and try again
        </h1>
      </div>
    );
  }
}
