import { createSlice } from "@reduxjs/toolkit";
import { removeAccessToken } from "_helpers";
import { IUser } from "interfaces";
// import { logoutFunc } from "../helpers/auth.js";

interface IUserState {
  currentUser: IUser | null;
  isFetching: boolean;
  error: boolean;
}
const initialState: IUserState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginStop: (state) => {
      state.isFetching = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      removeAccessToken();
    },
    // updateUserProfile: (state, action) => {
    //   state.currentUser = {
    //     ...state.currentUser,
    //     user: action.payload.user,
    //   };
    // },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loginStop,
  //   updateUserProfile,
} = userSlice.actions;
export default userSlice.reducer;
