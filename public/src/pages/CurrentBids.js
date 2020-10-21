import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import BidsRetrieval from "../components/BidRetrieval";

export default function CurrentBids() {
  const user = useSelector(selectUser);
//   console.log(caretaker);
  if (user && user.type.includes("caretaker")) {
    return (
      <div>
        <h1>THESE ARE THE CURRENT BIDS FOR YOU</h1>
        <BidsRetrieval />
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          Please Login LEAVE PAGE. Create an account with us if you haven't!
        </h1>
      </div>
    );
  }
}
