import { ROLES_API } from "_constants";
import { IRole } from "interfaces";
import { request } from "utils";

const createRole = (data: IRole) => {
  return request.post(ROLES_API, data);
};

const editRole = (payload: IRole) => {
  const { id, createdDate, createdUser, updatedDate, updatedUser, ...res } =
    payload;

  return request.put(`${ROLES_API}/${id}`, res);
};
const getRoles = () => {
  return request.get(ROLES_API);
};
const assignRole = (data: { userName: string; roleIds: string[] }) => {
  return request.post(`${ROLES_API}/assign`, data);
};
const getUserRole = (userName: string) => {
  return request.get(`${ROLES_API}/${userName}`);
};
export const RoleService = {
  createRole,
  assignRole,
  editRole,
  getRoles,
  getUserRole,
};
