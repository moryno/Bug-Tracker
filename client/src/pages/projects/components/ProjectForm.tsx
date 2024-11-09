import { DomianEnum } from "_constants";
import { isMomentObject } from "_helpers";
import { useCreateService, useGetAll } from "_hooks";
import { ContainerDrawer } from "_lib";
import { ProjectService, UserService } from "_services";
import { Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { IProject, IUser, projectFormType } from "interfaces";
import moment from "moment";
import { memo, useCallback, useState } from "react";
const { Option } = Select;

const initialData: IProject = {
  projectName: "",
  priority: "",
  description: ""
}

const ProjectForm:React.FC<projectFormType> = ({ onClose, open, editedRecord, statusMode }) => {
  const [formData, setFormData] = useState(statusMode === "CreateMode" ? initialData : 
    {...editedRecord,
      owner: editedRecord?.userName,
     startDate: moment(editedRecord?.startDate), 
     endDate: moment(editedRecord?.endDate)
    });
  const [loading, setLoading] = useState(false);
  const createProject = useCreateService(ProjectService.createProject, DomianEnum.PROJECTS);
  const editProject = useCreateService(ProjectService.editProject, DomianEnum.PROJECTS);
  const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-projects`);
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
    if(!formData?.projectName)
      return message.warning("Project name is required.");
    if(!formData?.description)
      return message.warning("Project description is required.");

   setLoading(true);
    try {
    
      const params = {
        ...formData,
        owner: formData?.owner ? formData?.owner : null,
        priority: formData?.priority ? formData?.priority : null,
        startDate: formData?.startDate ? isMomentObject(formData?.startDate)
         ? formData?.startDate?.toISOString()
         : moment(formData?.startDate)?.toISOString()
         : null,
         endDate: formData?.endDate ? isMomentObject(formData?.endDate)
         ? formData?.endDate?.toISOString()
         : moment(formData?.endDate)?.toISOString()
         : null
      }
      if(statusMode === "CreateMode"){
        await createProject.mutateAsync(params);
      }else{
        await editProject.mutateAsync(params);
      }
      
      onClear()
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [createProject, editProject, formData, onClear, statusMode]);

  return (
    <ContainerDrawer 
       onFinish={onFinish} 
       onClose={onClear} 
       open={open} 
       loading={loading}
       title={`${statusMode === "CreateMode" ? "New" : "Edit"} Project`} 
       width={720}
     >
      <Form 
        form={form}
        initialValues={formData}
        onValuesChange={handleValueChange}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="projectName"
              label="Project Name"
              rules={[{ required: true, message: "Please enter project name" }]}
            >
              <Input placeholder="Please enter project name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Start Date"
              style={{ width: '100%' }}
              rules={[
                { required: true, message: "Please choose the start date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: false, message: "Please choose the end date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="owner"
              label="Owner"
              rules={[{ required: false, message: "Please select an owner" }]}
            >
              <Select
               loading={isUserLoading}
               placeholder="Please select an owner" 
               allowClear>
              {userData?.data && 
                userData?.data?.map( (user: IUser) => (
                  <Option key={user?.userName} value={user?.userName}>{ user?.fullName}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: false, message: "Please select an priority" }]}
            >
              <Select placeholder="Please select priority" allowClear>
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
            name="currentStatus"
            label="Current Status"
            rules={[
              { required: false, message: "Please choose status" },
            ]}
          >
            <Select placeholder="Please select status">
              <Option value="Active">Active</Option>
              <Option value="InProgress">In Progress</Option>
              <Option value="OnTrack">On Track</Option>
              <Option value="Delayed">Delayed</Option>
              <Option value="InTesting">In Testing</Option>
              <Option value="OnHold">On Hold</Option>
            </Select>
          </Form.Item>
        </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter description",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ContainerDrawer>
  );
};

export default memo(ProjectForm);
