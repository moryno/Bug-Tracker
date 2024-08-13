export type drawerType = {
  onClose: () => void;
  open: boolean;
};

export type formType = drawerType & {
  title: string;
};
