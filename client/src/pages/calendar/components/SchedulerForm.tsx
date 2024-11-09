import { DomianEnum } from "_constants";
import { useCreateService, useGetAll, useNotificationHub } from "_hooks";
import { ContainerDrawer } from "_lib";
import { BugService, UserService, EventService } from "_services";
import { Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { eventFormType, IEvent, IProject, IUser } from "interfaces";
import {  } from "_services";
import React, { useCallback, useState } from "react";
import EventDetail from "pages/events/components/EventDetail";
import moment from "moment";
const { Option } = Select;

const initialData: IEvent = {
  title: "",
  location: "",
  attendeeIds: [],
  projectId: ""
}

const SchedulerForm:React.FC<eventFormType> = ({ onClose, open, editedRecord, statusMode, refetchEvent, showDetails }) => {
  const { hubConnection } = useNotificationHub();

  const [formData, setFormData] = useState(statusMode === "CreateMode" ? initialData : 
    {...editedRecord,
     startDate: moment(editedRecord?.startDate), 
     endDate: moment(editedRecord?.endDate)
    });
    const [loading, setLoading] = useState(false);
    const [openDetail, setOpenDetail] = useState(showDetails);
    const { isLoading, data } = useGetAll(BugService.getBugProjects, `${DomianEnum.BUGS}-projects`);
    const editEvent = useCreateService(EventService.editEvent, DomianEnum.EVENT);
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-projects`);
    const [form] = Form.useForm();
  
  
    const handleValueChange = useCallback((e: any) => {
      setFormData(prev => (
        { ...prev, ...e }
      ));
    },[]);

    const onUpdate = useCallback(( event: IEvent) => {
      setOpenDetail(false)
      setFormData(prev  => ({
        ...prev,
        attendeeIds: event.attendees!.map(a => a.userName),
        startDate: moment(editedRecord?.startDate), 
        endDate: moment(editedRecord?.endDate)
      }));
    }, [editedRecord?.endDate, editedRecord?.startDate])
  
    const onClear = useCallback(() => {
      setLoading(false);
      onClose();
      form.resetFields();
    }, [form, onClose]);
  
    const onFinish = useCallback(async () => {
      if(!formData?.title)
        return message.warning("Event title is required.");
      if(!formData?.projectId)
        return message.warning("Project is required.");
  
     setLoading(true);
      try {
      
        const params = {
          ...formData,
          initialComment: formData.initialComment || null,
          startDate: formData?.startDate?.toISOString(),
          endDate: formData?.endDate?.toISOString()  
        }
        if(statusMode === "CreateMode"){
          await EventService.createEvent(params, hubConnection);
        }else{
          await editEvent.mutateAsync(params);
        }
        
        onClear();
        refetchEvent()
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, [editEvent, formData, hubConnection, onClear, refetchEvent, statusMode]);

  return (
    <ContainerDrawer 
       onFinish={onFinish} 
       onClose={onClear} 
       open={open} 
       loading={loading}
       title={openDetail ? "" : `Schedule Event`} 
       width={720}
       
     >
      {statusMode === "EditMode" && openDetail ?
      <EventDetail event={editedRecord!} onClear={onClear} onUpdate={onUpdate} refetchEvent={refetchEvent} />
      :
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
            name="title"
            label="Event Title"
            rules={[{ required: true, message: "Please enter event title" }]}
          >
            <Input placeholder="Please enter event title" />
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
               showTime
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
                showTime
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="attendeeIds"
            label="Attendees"
            rules={[{ required: true, message: "Please select assignee" }]}
          >
            <Select
             mode="multiple" 
             placeholder="Please select assignee"
             loading={isUserLoading}
             >
            {userData?.data && 
                userData?.data?.map( (user: IUser) => (
                  <Option key={user?.userName} value={user?.userName}>{ user?.fullName}</Option>
            ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: false, message: "Please enter location" }]}
            >
              <Input placeholder="Please enter location" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="initialComment"
              label="Additional Comment"
              rules={[
                {
                  required: false,
                  message: "please enter comment",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please enter comment"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      }
    </ContainerDrawer>
  )
}

export default SchedulerForm