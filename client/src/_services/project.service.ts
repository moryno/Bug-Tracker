import { PROJECTS_API } from "_constants";
import { IProject } from "interfaces";
import { request } from "utils";

const createProject = (data: IProject) => {
  return request.post(PROJECTS_API, data);
};
const deleteProject = (id: string) => {
  return request.delete(`${PROJECTS_API}/${id}`);
};
const editProject = (id: string, data: IProject) => {
  return request.put(`${PROJECTS_API}/${id}`, data);
};
const getProjects = () => {
  return request.get(PROJECTS_API);
};
const getProject = (id: string) => {
  return request.get(`${PROJECTS_API}/${id}`);
};

export const ProjectService = {
  createProject,
  deleteProject,
  editProject,
  getProjects,
  getProject,
};
