import React, { memo, ReactNode } from 'react';
import { Space } from 'antd';
import ContainerButton from './ContainerButton';
import { StyledMediumDrawer } from './StyledComponents';
interface IProps{
    onClose?: () => void;
    open?: boolean;
    title?: string | ReactNode;
    children?: ReactNode;
    width?: number;
    onFinish?: () => void;
    loading?: boolean;
    footer?: boolean;
    submitText?: string;
}

const MediumDrawer: React.FC<IProps> = ({ onFinish, onClose, open, title, children, width, loading, footer = true, submitText = "Submit" }) => {
  return (
    <>
      <StyledMediumDrawer
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
            <ContainerButton loading={loading} onClick={onFinish} type="primary" title={submitText} size="middle" />
            <ContainerButton disabled={loading} onClick={onClose} title="Close" size="middle" />
          </Space>
          : false
        }
      >
        { children }
      </StyledMediumDrawer>
    </>
  );
};

export default memo(MediumDrawer);