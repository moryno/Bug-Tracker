import { Dispatch } from "@reduxjs/toolkit";
import { REGISTER_SUCCESS_ROUTE } from "_constants";
import { setAccessToken } from "_helpers";
import { loginFailure, loginStart, loginStop, loginSuccess } from "_redux/slices/userSlice";
import { authService } from "_services";
import { useNavigate } from "react-router-dom";

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
    dispatch(loginFailure())
    console.log(error);
  }
};
export const register = async (dispatch: Dispatch, user: registerType, navigate: ReturnType<typeof useNavigate>) => {
  try {
     dispatch(loginStart())
     await authService.register(user);
     navigate(`${REGISTER_SUCCESS_ROUTE}?email=${user.email}`);
     dispatch(loginStop())
  } catch (error) {
    console.log(error);
    dispatch(loginFailure())
  }
};