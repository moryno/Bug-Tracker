import { Moment } from "moment";

export interface IProject {
  id?: string;
  projectName: string;
  startDate?: Moment;
  endDate?: Moment;
  createdDate?: Date;
  createdUser?: string;
  updatedDate?: Date;
  updatedUser?: string;
  priority?: string;
  owner?: string;
  description: string;
  projectGroup?: string;
  private?: boolean;
  assignee?: IFollowerDto[];
}

export interface IFollowerDto {
  userName: string;
  fullName: string;
  image: string;
  isOwner: boolean;
}
export interface IBug {
  id: string;
  project: string;
  description: string;
  bugName: string;
  assignee: string;
  severity: string;
  classification: string;
  dueDate: Date;
  bugStatus: string;
  createdDate: Date;
  createdUser: string;
  updatedDate: Date;
  updatedUser: string;
  bugComments: IBugComment[];
}
export interface IBugComment {
  appUserId: string;
  appUser: IUser;
  bugId: string;
  bug: IBug;
  description: string;
  dateCommented: Date;
}
export interface IProjectComment {
  appUserId: string;
  appUser: IUser;
  projectId: string;
  project: IProject;
  description: string;
  dateCommented: Date;
}
export interface IUser {
  fullName: string;
  email: string;
  image: string;
  token: string;
  userName: string;
}
