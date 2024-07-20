import React from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
const { Option } = Select;

const ProjectForm = () => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
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
            rules={[
              { required: true, message: "Please choose the start date" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please choose the end date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              getPopupContainer={(trigger) => trigger.parentElement!}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="owner"
            label="Owner"
            rules={[{ required: true, message: "Please select an owner" }]}
          >
            <Select placeholder="Please select an owner">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select an priority" }]}
          >
            <Select placeholder="Please select an owner">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
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
    </Form>
  );
};

export default ProjectForm;
