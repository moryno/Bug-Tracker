import React, { memo, ReactNode } from 'react';
import { Space } from 'antd';
import ContainerButton from './ContainerButton';
import { StyledContainerDrawer } from './StyledComponents';
interface IProps{
    onClose?: () => void;
    open?: boolean;
    title?: string;
    children?: ReactNode;
    width?: number;
    onFinish?: () => void;
    loading?: boolean;
    footer?: boolean
}

const ContainerDrawer: React.FC<IProps> = ({ onFinish, onClose, open, title, children, width, loading, footer = true }) => {
  return (
    <>
      <StyledContainerDrawer
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
        footer={ footer ?
          <Space>
            <ContainerButton disabled={loading} onClick={onClose} title="Close" size="middle" />
            <ContainerButton loading={loading} onClick={onFinish} type="primary" title="Submit" size="middle" />
          </Space>
          : false
        }
      >
        { children }
      </StyledContainerDrawer>
    </>
  );
};

export default memo(ContainerDrawer);