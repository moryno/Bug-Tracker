import { USER_API } from "_constants";
import { request } from "utils";

const getAllUsers = () => {
  return request.get(`${USER_API}/GetAll`);
};
const getTeamMembers = () => {
  return request.get(USER_API);
};
const getProfile = (userName: string) => {
  return request.get(`profile/${userName}`);
};

export const UserService = {
  getAllUsers,
  getTeamMembers,
  getProfile,
};
