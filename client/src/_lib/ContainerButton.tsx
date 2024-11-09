import { defaultTheme } from '_constants';
import { Button } from 'antd';
import React, { MouseEventHandler, ReactNode, RefObject } from 'react'
import styled from 'styled-components';

interface IProps{
  title?: string | ReactNode;
  type?: "primary" | "dashed" | "link" | "text" | "default";
  size?: "large" | "middle" | "small";
  shape?: "default" | "circle" | "round";
  htmlType?: "submit" | "button";
  loading?: boolean;
  width?: string | number;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  fullWidth?: boolean;
  icon?: ReactNode;
  innerRef?: RefObject<HTMLButtonElement> | ((instance: HTMLButtonElement | null) => void);  
  disabled?: boolean;
  isAccent?: boolean;
  color?: string;
  danger?: boolean; 
}
interface ButtonProps{
  width: string;
  primary_background_color?: string;
}

const ContainerButton: React.FC<IProps> = ({ 
    title, 
    type = "default", 
    size = "small", 
    loading = false, 
    width = "", 
    fullWidth = false, 
    htmlType = "button", 
    onClick = undefined, 
    icon = null, 
    innerRef = null, 
    disabled = false, 
    danger, 
    isAccent = false, 
    shape = "default",
    color = ""
}) => {
  return (
    <StyledButton
      type={type}
      size={size}
      loading={loading}
      width={fullWidth ? "100%" : `${width}px`}
      htmlType={htmlType}
      icon={icon}
      ref={innerRef}
      disabled={disabled}
      danger={danger}
      style={{ backgroundColor: color }}
      primary_background_color={
        isAccent ? defaultTheme.theme.palette.primary.accentColor 
        : color ? color
        : undefined
      }
      shape={shape}
      onClick={onClick}
    >
        { title }
    </StyledButton>
  )
};

const StyledButton = styled(Button)<ButtonProps>`
    width: ${({ width }) => width};
    font-weight: 500;
    border-radius: 8px;
    svg {
      vertical-align: middle;
    }
    &.ant-btn-primary {
      background-color: ${({ primary_background_color }) =>
        primary_background_color};
    }
    &.ant-btn-primary:not(:disabled):hover {
      background-color: ${({ primary_background_color }) =>
        primary_background_color};
    }
    &.ant-btn-primary:disabled {
      background: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
    }
  
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: ${({ width }) => (width === "100%" ? width : "auto")};
    }
  `;

export default ContainerButton