import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import careTakerReducer from "./slices/careTakerSlice";
import petOwnerReducer from "./slices/petOwnerSlice";
import signUpErrorReducer from "./slices/signUpErrorSlice";
import loginErrorReducer from "./slices/loginErrorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    caretaker: careTakerReducer,
    petowner: petOwnerReducer,
    signuperror: signUpErrorReducer,
    loginerror: loginErrorReducer,
  },
});

export default store;
