import { useCallback, useState } from "react";
import { drawerType, InviteUserType } from "interfaces"
import { DomianEnum } from "_constants";
import { useCreateService, useGetAll } from "_hooks";
import { ContainerDrawer } from "_lib";
import { RoleService, UserService } from "_services";
import { Col, Form, Input, message, Row, Select } from "antd";

const { Option } = Select
const initialData: InviteUserType = {
  firstName: "",
  lastName: "",
  message: "",
  email: "",
  roleName: "",
}

const InviteForm:React.FC<drawerType> = ({ onClose, open }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const sendInivte = useCreateService(UserService.inviteUser, DomianEnum.USERS);
  const { isLoading: isRolesLoading, data: rolesData } = useGetAll(RoleService.getRoles, `${DomianEnum.ROLES}-roles`);
  const [form] = Form.useForm();

  const handleValueChange = useCallback((e: any) => {
    setFormData(prev => (
      { ...prev, ...e }
    ));
  },[]);

  const onClear = useCallback(() => {
    setLoading(false);
    onClose();
    form.resetFields();
  }, [form, onClose]);

  const onFinish = useCallback(async () => {
    if(!formData?.firstName)
      return message.warning("First name is required.");
    if(!formData?.lastName)
      return message.warning("Last name is required.");
    if(!formData?.email)
      return message.warning("Email is required.");
    if(!formData?.roleName)
      return message.warning("Role description is required.");


   setLoading(true);
    try {
    
      const params = {
        ...formData
      }
        await sendInivte.mutateAsync(params);
        onClear()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [formData, onClear, sendInivte]);
  
  return (
    <ContainerDrawer 
       onFinish={onFinish} 
       onClose={onClear} 
       open={open} 
       loading={loading}
       title="Invite member"
       width={560}
     >
      <Form 
        form={form}
        initialValues={formData}
        onValuesChange={handleValueChange}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Please enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Please enter last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              style={{ width: '100%' }}
              rules={[
                { required: true, message: "Please enter email address" },
              ]}
            >
              <Input placeholder="Please enter email address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="roleName"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
           <Select
             placeholder="Please select role"
             loading={isRolesLoading}
             >
              {rolesData?.data?.data && 
                  rolesData?.data?.data?.map( (role: any) => (
                    <Option key={role?.id} value={role?.name}>{ role?.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        </Row>
   
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="message"
              label="Custom Message"
              rules={[
                {
                  required: true,
                  message: "please enter message",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter message"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ContainerDrawer>
  )
}

export default InviteForm