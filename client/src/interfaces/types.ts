import { MenuProps } from "antd";
import { IProject } from "./domain";

export type drawerType = {
  onClose: () => void;
  open: boolean;
  statusMode: string;
};

export type projectFormType = drawerType & {
  editedRecord: IProject | null;
};

export type MenuPropsType = {
  items: MenuProps["items"];
  onClick: MenuProps["onClick"];
};
