
import { Tag } from "antd";
import moment from "moment";

import { IProject } from "interfaces";
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "pages/projects/index.styled";
import { StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemInfoWrapper } from "../index.styled";

export const topProjectColumns = [
    {
      title: 'Project Name',
      key: 'projectName',
      ellipsis: true,
      render: (project : IProject) => (
        <>
            <StyledWorkItemInfoWrapper>
              <StyledWorkItemInfoTitle>{ project.projectName }</StyledWorkItemInfoTitle>
              <StyledWorkItemInfoDesc>{ project.description }</StyledWorkItemInfoDesc>
            </StyledWorkItemInfoWrapper>
        </>
      ),
    },
    {
      title: 'Owner',
      key: 'owner',
      render: (assignee : any) => (
        <>
            <StyledAssigneeContainer>
              <StyledAssigneeImage src={assignee?.projectOwnerImage || "/img/noavatar.jpg"} alt={assignee?.projectOwnerFullName} />
              <StyledAssigneeName>{assignee?.projectOwnerFullName}</StyledAssigneeName>
            </StyledAssigneeContainer>
        </>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = priority === 'High' ? 'red' : priority === "Medium" ? "geekblue" : 'green';
        return <Tag color={color}>{priority.toUpperCase()}</Tag>;
      },
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      render: (projectStatus: number) => {
        let color = projectStatus <= 50 ? 'red' : projectStatus > 50 && projectStatus <= 70 ? "geekblue" : 'green';
        return <Tag color={color}>{Math.round(projectStatus).toFixed(1)}%</Tag>;
      },
      width: 100,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
      width: 100
    }
  ];
  