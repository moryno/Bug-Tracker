import { MenuProps } from "antd";
import { IBug, IProject } from "./domain";

export type drawerType = {
  onClose: () => void;
  open: boolean;
  statusMode: string;
};

export type projectFormType = drawerType & {
  editedRecord: IProject | null;
};
export type bugFormType = drawerType & {
  editedRecord: IBug | null;
};

export type MenuPropsType = {
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
};
export type commentType = {
  id?: string;
  description: string;
};
