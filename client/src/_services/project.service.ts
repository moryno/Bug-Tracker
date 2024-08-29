import { PROJECTS_API } from "_constants";
import { commentType, IProject } from "interfaces";
import { request } from "utils";

const createProject = (data: IProject) => {
  return request.post(PROJECTS_API, data);
};
const deleteProject = (id: string) => {
  return request.delete(`${PROJECTS_API}/${id}`);
};
const editProject = (payload: IProject) => {
  const { id, createdDate, createdUser, updatedDate, updatedUser, ...res } =
    payload;

  return request.put(`${PROJECTS_API}/${id}`, res);
};
const getProjects = () => {
  return request.get(PROJECTS_API);
};
const getProject = (id: string) => {
  return request.get(`${PROJECTS_API}/${id}`);
};
const createProjectComment = (data: IProject) => {
  return request.post(`${PROJECTS_API}/comment`, data);
};
const getProjectComments = (id: string) => {
  return request.get(`${PROJECTS_API}/${id}/comment`);
};
const deleteProjectComment = (id: string) => {
  return request.delete(`${PROJECTS_API}/${id}/comment`);
};
const editProjectComment = (payload: commentType) => {
  const { id, ...res } = payload;

  return request.put(`${PROJECTS_API}/${id}/comment`, res);
};
export const ProjectService = {
  createProject,
  deleteProject,
  editProject,
  getProjects,
  getProject,
  createProjectComment,
  getProjectComments,
  deleteProjectComment,
  editProjectComment,
};
