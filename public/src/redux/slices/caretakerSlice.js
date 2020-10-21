import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

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

export const getCaretakers = (maximum_price, pet_type, start_date, end_date) => (dispatch) => {
    fetch(`${API_HOST}/users/find-caretakers`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      body: JSON.stringify({
        advertised_price: maximum_price,
        pet_type: pet_type,
        start_date: start_date,
        end_date: end_date,
      }),
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
  removeState(CARETAKER_STATE_KEY);
  dispatch(setCareTaker(null));
};

export const signupCareTaker = (username, password) => (dispatch) => {
  fetch(`${API_HOST}/caretakers`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
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

export const selectCareTaker = (state) => state.caretaker;

export default careTakerSlice.reducer;
