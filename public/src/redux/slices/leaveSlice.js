import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";

const LEAVE_STATE_KEY = "leaves";

const persistedLeave = loadState(LEAVE_STATE_KEY);

export const leaveSlice = createSlice({
  name: "leaves",
  initialState: persistedLeave,
  reducers: {
    setLeave: (state, action) => action.payload,
  },
});

export const { setLeave } = leaveSlice.actions;

export const getLeaves = (username) =>
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    // body: JSON.stringify({ username: username }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        setLeave(result.data);
      } else {
        console.log("No leaves found!");
      }
    })
    .catch((err) => alert(err));

export const applyLeave = (username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ftct_username: username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Unable to add leave! Please check that the end date is after or equals to the start date, and that there are no overlaps in leaves!"
      )
    );
};

export const updateLeave = (
  username,
  old_start_date,
  old_end_date,
  new_start_date,
  new_end_date
) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      ftct_username: username,
      old_start_date: old_start_date,
      old_end_date: old_end_date,
      new_start_date: new_start_date,
      new_end_date: new_end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Something went wrong with the updating of leave! Please make sure that there are no overlaps in leave and that the start date is before or on the end date!"
      )
    );
};

export const deleteLeave = (username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      ftct_username: username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Something went wrong with deleting the leave! Please choose a valid leave and try again!"
      )
    );
};

export const selectLeaves = (state) => state.leaves;

export default leaveSlice.reducer;
