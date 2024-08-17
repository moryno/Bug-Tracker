import { BUGS_API } from "_constants";
import { IBug } from "interfaces";
import { request } from "utils";

const createBug = (data: IBug) => {
  return request.post(BUGS_API, data);
};
const deleteBug = (id: string) => {
  return request.delete(`${BUGS_API}/${id}`);
};
const editBug = (payload: IBug) => {
  const {
    id,
    assignee,
    createdDate,
    createdUser,
    updatedDate,
    updatedUser,
    ...res
  } = payload;

  return request.put(`${BUGS_API}/${id}`, res);
};
const getBugs = () => {
  return request.get(BUGS_API);
};
const getBug = (id: string) => {
  return request.get(`${BUGS_API}/${id}`);
};

export const BugService = {
  createBug,
  deleteBug,
  editBug,
  getBugs,
  getBug,
};
