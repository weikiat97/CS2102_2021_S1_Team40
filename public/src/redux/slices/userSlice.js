import { createSlice } from '@reduxjs/toolkit';
import {API_HOST} from "../../consts";
import {loadState, removeState, saveState} from "../localStorage";

const USER_STATE_KEY = "user";
const persistedUser = loadState(USER_STATE_KEY);

export const userSlice = createSlice({
  name: 'user',
  initialState: persistedUser,
  reducers: {
    setUser: (state, action) => action.payload,
  },
})

export const {setUser} = userSlice.actions;

export const getUserFromDb = (username, password) => dispatch => {
  fetch(`${API_HOST}/users/${username}`, {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "POST",
    body: JSON.stringify({password: password})
  }).then(response => response.json())
    .then(result => {
      if (result.status === "success") {
        saveState(USER_STATE_KEY, result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch(err => alert(err));
}

export const signoutUser = () => dispatch => {
  removeState(USER_STATE_KEY);
  dispatch(setUser(null));
}

export const signupUser = (username, password) => dispatch => {
  fetch(`${API_HOST}/users`, {
    headers: {
      "Content-Type": 'application/json'
    },
    method: "POST",
    body: JSON.stringify({username: username, password: password})
  }).then(response => response.json())
    .then(result => {
      if (result.status === "success") {
        saveState(USER_STATE_KEY, result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch(err => alert(err));
}

export const selectUser = state => state.user;

export default userSlice.reducer;