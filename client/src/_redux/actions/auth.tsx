import { Dispatch } from "@reduxjs/toolkit";
import { setAccessToken } from "_helpers";
import { loginStart, loginSuccess } from "_redux/slices/userSlice";
import { authService } from "_services";

type registerType = {
    email: string;
    fullName: string;
    password: string;
    userName: string;
  };
  type loginType = {
    email: string;
    password: string;
  };

export const login = async (dispatch: Dispatch, user: loginType) => {

  try {
    dispatch(loginStart())
    const { data } = await authService.login(user);
    
    setAccessToken(data?.token);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginStart())
    console.log(error);
  }
};
export const register = async (dispatch: Dispatch, user: registerType) => {

  try {
    dispatch(loginStart())
    const { data } = await authService.register(user);
    setAccessToken(data?.token);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginStart())
    console.log(error);
  }
};