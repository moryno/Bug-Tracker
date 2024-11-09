import { BUGS_API } from "_constants";
import { PaginationResult } from "_lib";
import { commentType, IBug } from "interfaces";
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
    createdDate,
    createdUser,
    updatedDate,
    updatedUser,
    assignees,
    comments,
    ...res
  } = payload;

  return request.put(`${BUGS_API}/${id}`, res);
};
const getBugs = (params?: object) => {
  return request.get<PaginationResult<IBug[]>>(`${BUGS_API}/GetAll`, {
    params,
  });
};
const getBugsStatus = () => {
  return request.get(`${BUGS_API}/status`);
};
const getBug = (id: string) => {
  return request.get(`${BUGS_API}/${id}`);
};
const getBugAssinees = (id: string) => {
  return request.get(`${BUGS_API}/${id}/assignees`);
};
const getBugProjects = () => {
  return request.get(`${BUGS_API}/projects`);
};
const createBugComment = (data: commentType) => {
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
  getBugAssinees,
  getBugsStatus,
};
