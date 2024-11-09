import { PROJECTS_API } from "_constants";
import { PaginationResult } from "_lib";
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
const getProjects = (params?: object) => {
  return request.get<PaginationResult<IProject[]>>(PROJECTS_API, { params });
};
const getProject = (id: string) => {
  return request.get(`${PROJECTS_API}/${id}`);
};
const getProjectBugs = (id: string) => {
  return request.get(`${PROJECTS_API}/${id}/bugs`);
};
const createProjectComment = (data: commentType) => {
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
  getProjectBugs,
};
