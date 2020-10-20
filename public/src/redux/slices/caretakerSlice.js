import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

const CARETAKER_STATE_KEY = "caretaker";
const persistedCaretaker = loadState(CARETAKER_STATE_KEY);

export const caretakerSlice = createSlice({
  name: "caretaker",
  initialState: persistedCaretaker,
  reducers: {
    setCaretaker: (state, action) => action.payload,
  },
});

export const { setCaretaker } = caretakerSlice.actions;

export const getCaretakers = (maximum_price, pet_type, start_date, end_date) => (dispatch) => {
    fetch(`${API_HOST}/caretakers`, {
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
          dispatch(setCaretaker(result.data));
        } else {
          throw new Error(result.message);
        }
      })
      .catch((err) => alert(err));
  };