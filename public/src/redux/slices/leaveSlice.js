import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

const LEAVE_STATE_KEY = "leave";

const persistedLeave = loadState(LEAVE_STATE_KEY);

export const leaveSlice = createSlice({
  name: "leaves",
  initialState: persistedLeave,
  reducers: {
    setLeave: (state, action) => action.payload,
  },
});

export const { setLeave } = leaveSlice.actions;

export const getLeaves = (username) => (dispatch) => {
  console.log("username hereeee: "+ username);
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
        console.log("HMMMM????")
        console.log('DATA: ' + result.data[0].row);
        saveState(LEAVE_STATE_KEY, result.data);
        console.log("done saving")
        dispatch(setLeave(result.data));
      } else {
        console.log("ninai");
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const applyLeave = (username, start_date, end_date) => (dispatch) => {
  console.log("USERNAMEEEE: " + username);
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ftct_username: username, start_date: start_date, end_date: end_date }),
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
    .catch((err) => alert(err));
};

export const updateLeave = (username, old_start_date, old_end_date, new_start_date, new_end_date) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ ftct_username: username, old_start_date: old_start_date, old_end_date: old_end_date, new_start_date: new_start_date, new_end_date: new_end_date }),
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
    .catch((err) => alert(err));
};

export const deleteLeave = (username, start_date, end_date) => (dispatch) => {
  console.log("lets check start: " + start_date)
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ ftct_username: username, start_date: start_date, end_date: end_date }),
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
    .catch((err) => alert(err));
};

export const selectLeaves = (state) => state.leaves;

export default leaveSlice.reducer;
