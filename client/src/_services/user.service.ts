import { USER_API } from "_constants";
import { request } from "utils";

const getAllUsers = () => {
  return request.get(`${USER_API}/GetAll`);
};

export const UserService = {
  getAllUsers,
};
