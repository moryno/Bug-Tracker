import { FilterCollapseComponent, MediumDrawer, StyledDomainFilterContainer } from "_lib"
import {  DatePicker, Form, Input, message, Radio, Select, Space } from "antd"
import { StyledFormCheckboxWrapper, StyledStatusDot } from "../index.styled";
import { useGetAll } from "_hooks";
import { UserService } from "_services";
import { DomianEnum } from "_constants";
import { IUser } from "interfaces";
import { useCallback, useState } from "react";

const { Option } = Select;

export interface IFilterProps{
  open: boolean;
  onClose: () => void;
  onFilterChange: (filterValues: object) => void;
}
export interface ProjectFilterValues {
  startDate?: any;
  endDate?: any;
  projectName?: string;
  priority?: string;
  owner?: string;
  currentStatus?: string;
}

const ProjectFilter = ({ open, onClose, onFilterChange } : IFilterProps) => {
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-projects`);
    const [filterValues, setFilterValues] = useState<ProjectFilterValues>({})

    const handleFilterChange = (value: any) => {
      setFilterValues(prev => (
        { ...prev, ...value }
      ))
    };

    const onFinish = useCallback(() => {
      if(Object.entries(filterValues).length === 0 ) return message.warning("Choose the parameters to filter.");
      if((filterValues.endDate && filterValues.startDate) && filterValues.endDate < filterValues.startDate) 
        return message.warning("End date cannot be less than the start date.");

      onFilterChange(filterValues)
    }, [filterValues, onFilterChange])

  return (
    <MediumDrawer
        onClose={onClose} 
        open={open} 
        onFinish={onFinish}
        title={`Project Filters`} 
        width={450}
        submitText="Filter"
    >
      <StyledDomainFilterContainer className='scrollbar-hide'>
      <Form onValuesChange={handleFilterChange}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <FilterCollapseComponent 
            title="Project Name" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
           <Form.Item
              name="projectName"
              label={false}
            >
            <Input placeholder="Filter by project name" />
           </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Priority" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="priority"
              label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
                <StyledFormCheckboxWrapper>
                    <Radio value="High">High</Radio>
                    <StyledStatusDot color={"team"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="Medium">Medium</Radio>
                    <StyledStatusDot color={"inProgress"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="Low">Low</Radio>
                    <StyledStatusDot color={"active"} />
                </StyledFormCheckboxWrapper>
            </Radio.Group>
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Current Status" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="currentStatus"
              label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
                <StyledFormCheckboxWrapper>
                    <Radio value="Active">Active</Radio>
                    <StyledStatusDot color={"active"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="InProgress">In Progress</Radio>
                    <StyledStatusDot color={"inProgress"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                   <Radio value="OnTrack">On Track</Radio>
                    <StyledStatusDot color={"onTrack"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="Delayed">Delayed</Radio>
                    <StyledStatusDot color={"delayed"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="InTesting">In Testing</Radio>
                    <StyledStatusDot color={"inTesting"} />
                </StyledFormCheckboxWrapper>
                <StyledFormCheckboxWrapper>
                    <Radio value="OnHold">On Hold</Radio>
                    <StyledStatusDot color={"onHold"} />
                </StyledFormCheckboxWrapper>
            </Radio.Group>
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Owner" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="owner"
              label={false}
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
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Start Date" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="startDate"
              label={false}
              style={{ width: '100%' }}
            >
              <DatePicker
                style={{ width: "100%" }}
              />
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="End Date" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="endDate"
              label={false}
            >
              <DatePicker
                style={{ width: "100%" }}
              />
            </Form.Item>
        </FilterCollapseComponent>
        {/* <FilterCollapseComponent 
            title="Project Group" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Input />
        </FilterCollapseComponent> */}
        </Space>
      </Form>
      </StyledDomainFilterContainer>
    </MediumDrawer>
  )
}

export default ProjectFilter