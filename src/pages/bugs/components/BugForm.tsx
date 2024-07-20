import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
const { Option } = Select;


const BugForm = () => {
  return (
    <Form layout="vertical">
    <Row gutter={16}>
     <Col span={24}>
       <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: 'Please enter project name' }]}
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
          rules={[{ required: true, message: 'Please enter bug name' }]}
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
              message: 'please enter url description',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="please enter url description" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
     <Col span={24}>
       <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: 'Please select assignee' }]}
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
          rules={[{ required: true, message: 'Please select status' }]}
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
          rules={[{ required: true, message: 'Please select severity' }]}
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
          rules={[{ required: true, message: 'Please choose the due date' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement!}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="classification"
          label="Classification"
          rules={[{ required: true, message: 'Please choose classisication' }]}
        >
          <Select placeholder="Please select severity">
            <Option value="xiao">Xiaoxiao Fu</Option>
            <Option value="mao">Maomao Zhou</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Form>
  )
}

export default BugForm