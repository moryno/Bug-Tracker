import { INVITE_API, USER_API } from "_constants";
import { PaginationResult } from "_lib";
import { InviteUserType, IUser } from "interfaces";
import { request } from "utils";

const getAllUsers = () => {
  return request.get(`${USER_API}/GetAll`);
};
const getTeamMembers = (params?: object) => {
  return request.get<PaginationResult<IUser[]>>(USER_API, { params });
};
const getProfile = (userName: string) => {
  return request.get(`profile/${userName}`);
};
const inviteUser = (invite: InviteUserType) => {
  return request.post(INVITE_API, invite);
};

export const UserService = {
  getAllUsers,
  getTeamMembers,
  getProfile,
  inviteUser,
};
