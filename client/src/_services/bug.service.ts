import { BUGS_API } from "_constants";
import { commentType, IBug } from "interfaces";
import { request } from "utils";

const createBug = (data: IBug) => {
  return request.post(BUGS_API, data);
};
const deleteBug = (id: string) => {
  return request.delete(`${BUGS_API}/${id}`);
};
const editBug = (payload: IBug) => {
  const { id, createdDate, createdUser, updatedDate, updatedUser, ...res } =
    payload;

  return request.put(`${BUGS_API}/${id}`, res);
};
const getBugs = () => {
  return request.get(BUGS_API);
};
const getBug = (id: string) => {
  return request.get(`${BUGS_API}/${id}`);
};
const getBugProjects = () => {
  return request.get(`${BUGS_API}/projects`);
};
const createBugComment = (data: IBug) => {
  return request.post(`${BUGS_API}/comment`, data);
};
const getBugComments = (id: string) => {
  return request.get(`${BUGS_API}/${id}/comment`);
};
const deleteBugComment = (id: string) => {
  return request.delete(`${BUGS_API}/${id}/comment`);
};
const editBugComment = (payload: commentType) => {
  const { id, ...res } = payload;

  return request.put(`${BUGS_API}/${id}/comment`, res);
};
export const BugService = {
  createBug,
  deleteBug,
  editBug,
  getBugs,
  getBug,
  getBugProjects,
  createBugComment,
  getBugComments,
  deleteBugComment,
  editBugComment,
};
