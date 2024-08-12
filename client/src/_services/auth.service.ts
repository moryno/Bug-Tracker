import { LOGIN_API, LOGOUT_API, REGISTER_API } from "_constants";
import { request } from "utils";

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
const register = (data: registerType) => {
  return request.post(REGISTER_API, data);
};
const login = (data: loginType) => {
  return request.post(LOGIN_API, data);
};
const logout = () => {
  return request.post(LOGOUT_API);
};

export const authService = { login, register, logout };
