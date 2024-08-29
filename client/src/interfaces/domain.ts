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
  userName?: string;
  priority?: string;
  owner?: string;
  description: string;
  projectGroup?: string;
  private?: boolean;
  assignee?: IFollowerDto[];
  bugs?: IBug[];
}

export interface IFollowerDto {
  userName: string;
  fullName: string;
  image: string;
  isOwner: boolean;
}
export interface IBug {
  id?: string;
  projectId: string;
  projectName?: string;
  description: string;
  bugName: string;
  bugAssignees?: IUser[];
  assignees?: IUser[];
  severity?: string;
  classification?: string;
  dueDate?: Date;
  bugStatus?: string;
  createdDate?: Date;
  createdUser?: string;
  updatedDate?: Date;
  updatedUser?: string;
  bugComments?: IComment[];
}
export interface IComment {
  id: string;
  description: string;
  createdAt?: Date;
  fullName?: string;
  image?: string;
  userName: string;
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
  email?: string;
  image?: string;
  token?: string;
  userName: string;
}
