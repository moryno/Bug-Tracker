import React, { memo, ReactNode } from 'react';
import { Drawer, Space } from 'antd';
import ContainerButton from './ContainerButton';
interface IProps{
    onClose?: () => void;
    open?: boolean;
    title?: string;
    children?: ReactNode;
    width?: number;
    onFinish: () => void;
    loading: boolean
}

const ContainerDrawer: React.FC<IProps> = ({ onFinish, onClose, open, title, children, width, loading}) => {
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
            <ContainerButton disabled={loading} onClick={onClose} title="Close" size="middle" />
            <ContainerButton loading={loading} onClick={onFinish} type="primary" title="Submit" size="middle" />
          </Space>
        }
      >
        { children }
      </Drawer>
    </>
  );
};

export default memo(ContainerDrawer);