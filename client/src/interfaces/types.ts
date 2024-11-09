import { MenuProps } from "antd";
import { IBug, IEvent, IProject, IRole } from "./domain";

export type drawerType = {
  onClose: () => void;
  open: boolean;
  statusMode: string;
};

export type projectFormType = drawerType & {
  editedRecord: IProject | null;
};
export type eventFormType = drawerType & {
  editedRecord: IEvent | null;
  refetchEvent: () => void;
  showDetails: boolean;
};
export type bugFormType = drawerType & {
  editedRecord: IBug | null;
};
export type roleFormType = drawerType & {
  editedRecord: IRole | null;
};
export type profileType = {
  profile: ProfileType;
  onClose: () => void;
  open: boolean;
};

export type MenuPropsType = {
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
};
export type commentType = {
  id?: string;
  description: string;
};
export type assignType = {
  roleIds: string[];
  userName: string;
};
export type InviteUserType = {
  firstName: string;
  lastName: string;
  email: string;
  userName?: string;
  roleName: string;
  message: string;
};

export type ProfileType = {
  fullName: string;
  email: string;
  userName: string;
  image?: string;
  companyName?: string;
  companyId?: string;
  photos?: Photo;
};

type Photo = {
  Id?: string;
  url: string;
  isMain: boolean;
};

export type calendarType = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

export type emailType = {
  recipientId: string;
  subject: string;
  customMessage: Date;
};
