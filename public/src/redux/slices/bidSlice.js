import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";

const BID_STATE_KEY = "bids";

// const persistedBid = loadState(BID_STATE_KEY);

export const bidSlice = createSlice({
  name: "bids",
  initialState: persistedBid,
  reducers: {
    setBid: (state, action) => action.payload,
  },
});

export const { setBid } = leaveSlice.actions;

export const getBids = (username) =>
  fetch(`${API_HOST}/caretakers/bids/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    // body: JSON.stringify({ username: username }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BIDSTATE_KEY, result.data);
        setBid(result.data);
      } else {
        console.log("No bids found!");
      }
    })
    .catch((err) => alert(err));

export const acceptBid = (petowner_username, pet_name, caretaker_username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/bids/${caretaker_username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Unable to accept bid! Something went wrong!"
      )
    );
};

export const declineBid = (petowner_username, pet_name, caretaker_username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/bids/${caretaker_username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Unable to accept bid! Something went wrong!"
      )
    );
};

export const selectBids = (state) => state.bids;

export default bidSlice.reducer;
