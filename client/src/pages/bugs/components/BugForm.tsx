import React, { memo, useCallback, useState } from "react";
import { Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { ContainerDrawer } from "_lib";
import { bugFormType, IBug, IProject, IUser } from "interfaces";
import moment from "moment";
import { useCreateService, useGetAll } from "_hooks";
import { BugService } from "_services";
import { DomianEnum } from "_constants";
import { isJSONString, isMomentObject } from "_helpers";
import { UserService } from "_services";
const { Option } = Select;

const initialData: IBug = {
  projectId: "",
  bugName: "",
  description: ""
}

const BugForm:React.FC<bugFormType> = ({ onClose, open, editedRecord, statusMode }) => {
  const [formData, setFormData] = useState(statusMode === "CreateMode" ? initialData : 
    {...editedRecord,
      // bugAssignees: editedRecord?.assignees?.map((assignee:IUser) => assignee.userName),
     dueDate: moment(editedRecord?.dueDate)
    });
    const [loading, setLoading] = useState(false);
    const createBug = useCreateService(BugService.createBug, DomianEnum.BUGS);
    const { isLoading, data } = useGetAll(BugService.getBugProjects, `${DomianEnum.BUGS}-projects`);
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-bugs`);
    const editBug = useCreateService(BugService.editBug, DomianEnum.BUGS);
    const [form] = Form.useForm();
  console.log(editedRecord)
  console.log(formData)
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
      if(!formData?.bugName)
        return message.warning("Bug name is required.");
      if(!formData?.projectId)
        return message.warning("Project is required.");
      if(!formData?.description)
        return message.warning("Project description is required.");
  
     setLoading(true);
      try {
      
        const params = {
          ...formData,
          severity: formData?.severity ?? null,
          bugAssignees: formData?.bugAssignees ? formData?.bugAssignees.map((assignee:  any) => {
           return isJSONString(assignee) ? JSON.parse(assignee) : assignee
          }) : null,
          bugStatus: formData?.bugStatus ?? null,
          classification: formData?.classification ?? null,
          dueDate: formData?.dueDate ? isMomentObject(formData?.dueDate)
           ? formData?.dueDate?.toISOString()
           : moment(formData?.dueDate)?.toISOString()
           : null,
        }

        if(statusMode === "CreateMode"){
          await createBug.mutateAsync(params);
        }else{
          await editBug.mutateAsync(params);
        }
        
        onClear()
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, [createBug, editBug, formData, onClear, statusMode]);

  return (
  <ContainerDrawer 
    onFinish={onFinish} 
    onClose={onClear} 
    open={open} 
    loading={loading}
    title={`${statusMode === "CreateMode" ? "New" : "Edit"} Bug`} 
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
            name="projectId"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Select 
              placeholder="Please select a project"
              loading={isLoading}
              >
                {data?.data && 
                data?.data?.map( (project: IProject) => (
                  <Option key={project.id} value={project.id}>{ project.projectName}</Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="bugName"
            label="Bug Name"
            rules={[{ required: true, message: "Please enter bug name" }]}
          >
            <Input placeholder="Please enter bug name" />
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
              placeholder="please enter description"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="bugAssignees"
            label="Assignee"
            rules={[{ required: true, message: "Please select assignee" }]}
          >
            <Select
             mode="multiple" 
             placeholder="Please select assignee"
             loading={isUserLoading}
             >
            {userData?.data && 
                userData?.data?.map( (user: IUser) => (
                  <Option key={user?.userName} value={JSON.stringify(user)}>{ user?.fullName}</Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bugStatus"
            label="Bug Status"
            rules={[{ required: false, message: "Please select status" }]}
          >
            <Select placeholder="Please select status">
              <Option value="Open">Open</Option>
              <Option value="InProgress">InProgress</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[{ required: false, message: "Please select severity" }]}
          >
            <Select placeholder="Please select severity">
              <Option value="Minor">Minor</Option>
              <Option value="Major">Major</Option>
              <Option value="Critical">Critical</Option>
              <Option value="ShowStopper">Show stopper</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: false, message: "Please choose the due date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="classification"
            label="Classification"
            rules={[
              { required: false, message: "Please choose classisication" },
            ]}
          >
            <Select placeholder="Please select severity">
              <Option value="None">None</Option>
              <Option value="Enhancement">Enhancement</Option>
              <Option value="Security">Security</Option>
              <Option value="Perfomance">Performance</Option>
              <Option value="Feature">Feature(new)</Option>
              <Option value="Other">Other Bug</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </ContainerDrawer>
  );
};

export default memo(BugForm);
