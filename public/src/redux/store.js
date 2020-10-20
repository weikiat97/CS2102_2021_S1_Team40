import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/example/counterSlice";
import userReducer from "./slices/userSlice";
import careTakerReducer from "./slices/careTakerSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    caretaker: careTakerReducer,
  },
});

export default store;
