import React from 'react'
import {  Form, Input } from "antd";
import { StyledAuthContainerForm, StyledRedirectButton } from './index.style'
import ContainerButton from '_lib/ContainerButton';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '_constants';

interface IProps{
    isRegisterRoute: boolean;
    onRedirect: ( url: string) => void;
}

const AuthContainerForm:React.FC<IProps> = ({ isRegisterRoute, onRedirect }) => {
  return (
    <StyledAuthContainerForm 
      name="basic"
      layout="vertical"
    //   initialValues={initialValues}
    //   onFinish={onFinish}
      autoComplete="off"
    >
        {isRegisterRoute &&
        <>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            // disabled={loading || disablePhoneNumber}
            size="large"
            placeholder="Full name"
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <Input
            // disabled={loading || disablePhoneNumber}
            size="large"
            placeholder="Username"
          />
        </Form.Item>
        </>
        }
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email address",
            },
          ]}
        >
          <Input
            // disabled={loading || disablePhoneNumber}
            size="large"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            // disabled={loading}
            size="large"
            placeholder="Enter Password"
          />
        </Form.Item>
      <Form.Item>
        <ContainerButton
          title={"Sign In"}
          type="primary"
          htmlType="submit"
          size="large"
          fullWidth
        //   loading={loading}
        />
      </Form.Item>
      <Form.Item>
          <Form.Item noStyle>
            { isRegisterRoute ? "Have an account?" : "Create an account" }
          </Form.Item>
          
          <StyledRedirectButton onClick={() => onRedirect(isRegisterRoute ? LOGIN_ROUTE : REGISTER_ROUTE)}>
            { isRegisterRoute ? "Sign In" : "Sign Up" }
          </StyledRedirectButton>
        </Form.Item>
    </StyledAuthContainerForm>
  )
}

export default AuthContainerForm