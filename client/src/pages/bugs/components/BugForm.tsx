import React, { memo, useCallback, useState } from "react";
import { Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { ContainerDrawer } from "_lib";
import { bugFormType, IBug } from "interfaces";
import moment from "moment";
import { useCreateService } from "_hooks";
import { BugService } from "_services";
import { DomianEnum } from "_constants";
import { isMomentObject } from "_helpers";
const { Option } = Select;

const initialData: IBug = {
  project: "",
  bugName: "",
  description: ""
}

const BugForm:React.FC<bugFormType> = ({ onClose, open, editedRecord, statusMode }) => {
  const [formData, setFormData] = useState(statusMode === "CreateMode" ? initialData : 
    {...editedRecord,
     dueDate: moment(editedRecord?.dueDate)
    });
    const [loading, setLoading] = useState(false);
    const createBug = useCreateService(BugService.createBug, DomianEnum.BUGS);
    const editBug = useCreateService(BugService.editBug, DomianEnum.BUGS);
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
      if(!formData?.bugName)
        return message.warning("Bug name is required.");
      if(!formData?.project)
        return message.warning("Project is required.");
      if(!formData?.description)
        return message.warning("Project description is required.");
  
     setLoading(true);
      try {
      
        const params = {
          ...formData,
          severity: formData?.severity ?? null,
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
            name="projectName"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Select placeholder="Please select a project">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
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
                message: "please enter url description",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="please enter url description"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: "Please select assignee" }]}
          >
            <Select mode="multiple" placeholder="Please select assignee">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="bugStatus"
            label="Bug Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Please select status">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="severity"
            label="Severity"
            rules={[{ required: true, message: "Please select severity" }]}
          >
            <Select placeholder="Please select severity">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please choose the due date" }]}
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
              { required: true, message: "Please choose classisication" },
            ]}
          >
            <Select placeholder="Please select severity">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </ContainerDrawer>
  );
};

export default memo(BugForm);
