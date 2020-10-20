import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";
import { setUser } from "./userSlice";

const CARETAKER_STATE_KEY = "caretaker";
const persistedCareTaker = loadState(CARETAKER_STATE_KEY);

export const careTakerSlice = createSlice({
  name: "caretaker",
  initialState: persistedCareTaker,
  reducers: {
    setCareTaker: (state, action) => action.payload,
  },
});

export const { setCareTaker } = careTakerSlice.actions;

export const getCareTakerFromDb = (username, password) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ password: password }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(CARETAKER_STATE_KEY, result.data);
        dispatch(setCareTaker(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signoutCareTaker = () => (dispatch) => {
  removeState("user");
  dispatch(setUser(null));
};

export const signupCareTaker = (username, password, role) => (dispatch) => {
  fetch(`${API_HOST}/caretakers`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      role: role,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState("user", result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const selectCareTaker = (state) => state.caretaker;

export default careTakerSlice.reducer;
