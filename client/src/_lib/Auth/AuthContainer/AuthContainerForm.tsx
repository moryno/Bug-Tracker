import {  Form, Input } from "antd";
import { StyledAuthContainerForm, StyledRedirectButton } from './index.style'
import ContainerButton from '_lib/ContainerButton';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '_constants';
import { useSelector } from 'react-redux';
import { RootState } from '_redux';
import { useModal } from '_hooks';
import AppDemoLogin from "_lib/AppDemoLogin";

interface IProps{
    isRegisterRoute: boolean;
    onRedirect: ( url: string) => void;
    onFinish: (value: any ) => void;
}

const AuthContainerForm:React.FC<IProps> = ({ isRegisterRoute, onRedirect, onFinish }) => {
  const isLoading = useSelector((store: RootState) => store.user?.isFetching);
  const { open, toggle } = useModal();

  return (
    <StyledAuthContainerForm 
      onFinish={onFinish}
      name="basic"
      layout="vertical"
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
            size="large"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            {
              required: true,
              message: "Please enter your company name",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Company name"
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
            size="large"
            placeholder="Enter Password"
          />
        </Form.Item>
      <Form.Item>
        <ContainerButton
          title={ isRegisterRoute ? "Sign Up" : "Sign In"}
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          fullWidth
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
      <>
          <Form.Item noStyle>
            Sign In as 
          </Form.Item>
            <StyledRedirectButton onClick={toggle}>
              Demo User
            </StyledRedirectButton>
      </>
      {open &&
      <AppDemoLogin open={open} onClose={toggle} />
      }
    </StyledAuthContainerForm>
  )
}

export default AuthContainerForm