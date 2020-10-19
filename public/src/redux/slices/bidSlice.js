import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

const BID_STATE_KEY = "bid";
const persistedBid = loadState(BID_STATE_KEY);

export const bidSlice = createSlice({
  name: "bid",
  initialState: persistedBid,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setBid } = userSlice.actions;
