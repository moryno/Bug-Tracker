import { DeleteOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export const actionDropdownItems: MenuProps['items'] = [
    {
      label: 'Delete',
      key: '1',
      icon: <DeleteOutlined />,
      danger: true,
      
    },
 
  ];