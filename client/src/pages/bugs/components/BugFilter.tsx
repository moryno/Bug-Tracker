import { FilterCollapseComponent, MediumDrawer, StyledDomainFilterContainer } from "_lib"
import {  DatePicker, Form, Input, message, Radio, Select, Space } from "antd"
import { useGetAll } from "_hooks";
import { BugService, UserService } from "_services";
import { DomianEnum } from "_constants";
import { IProject, IUser } from "interfaces";
import { StyledFormCheckboxWrapper, StyledStatusDot } from "pages/projects/index.styled";
import { IFilterProps } from "pages/projects/components/ProjectFilter";
import { useCallback, useState } from "react";

const { Option } = Select;
export interface BugFilterValues {
  dueDate?: any;
  projectId?: string;
  bugName?: string;
  severity?: string;
  classification?: string;
  bugStatus?: string;
  assinee?: string;
}

const BugFilter = ({ open, onClose, onFilterChange } : IFilterProps) => {
    const { isLoading: isUserLoading, data: userData } = useGetAll(UserService.getAllUsers, `${DomianEnum.USERS}-projects`);
    const { isLoading, data } = useGetAll(BugService.getBugProjects, `${DomianEnum.BUGS}-projects`);
    const [filterValues, setFilterValues] = useState<BugFilterValues>({})

    const handleFilterChange = (value: any) => {
      setFilterValues(prev => (
        { ...prev, ...value }
      ))
    };

    const onFinish = useCallback(() => {
      if(Object.entries(filterValues).length === 0 ) return message.warning("Choose the parameters to filter.");

      onFilterChange(filterValues)
    }, [filterValues, onFilterChange])

  return (
    <MediumDrawer
        onClose={onClose} 
        open={open} 
        onFinish={onFinish}
        title={`Bug Filters`} 
        width={500}
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
            name="projectId"
            label={false}
          >
            <Select 
              allowClear
              placeholder="Please select a project"
              loading={isLoading}
              >
                {data?.data && 
                data?.data?.map( (project: IProject) => (
                  <Option key={project.id} value={project.id}>{ project.projectName}</Option>
                ))}
            </Select>
          </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Bug Name" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="bugName"
              label={false}
            >
             <Input placeholder="Filter by bug name" />
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Severity" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="severity"
              label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
              <StyledFormCheckboxWrapper>
                  <Radio value="Minor">Minor</Radio>
                  <StyledStatusDot color={"active"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                  <Radio value="Major">Major</Radio>
                  <StyledStatusDot color={"inProgress"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Critical">Critical</Radio>
                <StyledStatusDot color={"onHold"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="ShowStopper">Show Stopper</Radio>
                <StyledStatusDot color={"team"} />
              </StyledFormCheckboxWrapper>
            </Radio.Group>
          </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Bug Status" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="bugStatus"
              label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
              <StyledFormCheckboxWrapper>
                  <Radio value="Open">Open</Radio>
                  <StyledStatusDot color={"active"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                  <Radio value="InProgress">In Progress</Radio>
                  <StyledStatusDot color={"inProgress"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Completed">Completed</Radio>
                <StyledStatusDot color={"completed"} />
              </StyledFormCheckboxWrapper>
            </Radio.Group>
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Assignees" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="assignee"
              label={false}
            >
              <Select
               loading={isUserLoading}
               placeholder="Please select an assignee" 
               allowClear>
              {userData?.data && 
                userData?.data?.map( (user: IUser) => (
                  <Option key={user?.userName} value={user?.userName}>{ user?.fullName}</Option>
                ))}
              </Select>
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Classification" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="classification"
              label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
              <StyledFormCheckboxWrapper>
                  <Radio value="None">None</Radio>
                  <StyledStatusDot color={"delayed"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                  <Radio value="Enhancement">Enhancement</Radio>
                  <StyledStatusDot color={"inProgress"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Security">Security</Radio>
                <StyledStatusDot color={"onTrack"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Perfomance">Perfomance</Radio>
                <StyledStatusDot color={"planning"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Feature">Feature(New)</Radio>
                <StyledStatusDot color={"approved"} />
              </StyledFormCheckboxWrapper>
              <StyledFormCheckboxWrapper>
                <Radio value="Other">Other Bug</Radio>
                <StyledStatusDot color={"invoiced"} />
              </StyledFormCheckboxWrapper>
            </Radio.Group>
          </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Due Date" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="dueDate"
              label={false}
            >
              <DatePicker
                style={{ width: "100%" }}
              />
            </Form.Item>
        </FilterCollapseComponent>
        </Space>
      </Form>
      </StyledDomainFilterContainer>
    </MediumDrawer>
  )
}

export default BugFilter