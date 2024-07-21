import React, { memo, ReactNode } from 'react';
import { Button, Drawer, Space } from 'antd';
interface IProps{
    onClose?: () => void;
    open?: boolean;
    title?: string;
    children?: ReactNode;
    width?: number;
}

const ContainerDrawer: React.FC<IProps> = ({ onClose, open, title, children, width}) => {
  return (
    <>
      <Drawer
        title={title}
        width={width}
        onClose={onClose}
        closable={false}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        { children }
      </Drawer>
    </>
  );
};

export default memo(ContainerDrawer);