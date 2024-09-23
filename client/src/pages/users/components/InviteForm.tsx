import { useCallback, useState } from "react";
import { drawerType, InviteUserType } from "interfaces"
import { DomianEnum } from "_constants";
import { useCreateService } from "_hooks";
import { ContainerDrawer } from "_lib";
import { ProjectService } from "_services";
import { Col, Form, Input, Row, Select } from "antd";

const { Option } = Select
const initialData: InviteUserType = {
  firstName: "",
  lastName: "",
  message: "",
  email: "",
  role: "",
  userName: ""
}

const InviteForm:React.FC<drawerType> = ({ onClose, open, statusMode }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const createProject = useCreateService(ProjectService.createProject, DomianEnum.PROJECTS);
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
    // if(!formData?.projectName)
    //   return message.warning("Project name is required.");
    // if(!formData?.description)
    //   return message.warning("Project description is required.");

   setLoading(true);
    try {
    
      const params = {
        ...formData
      }
        await createProject.mutateAsync(params);

      onClear()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [createProject, formData, onClear]);
  
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
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
             placeholder="Please select a role"
             >
              <Option value={"Project Manager"}>Project Manager</Option>
              <Option value={"Developer"}>Developer</Option>
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
                placeholder="please enter message"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ContainerDrawer>
  )
}

export default InviteForm