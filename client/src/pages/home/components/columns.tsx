
import { Tag } from "antd";
import moment from "moment";

import { IFollowerDto, IProject } from "interfaces";
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
      render: (assignee : IFollowerDto) => (
        <>
            <StyledAssigneeContainer>
              <StyledAssigneeImage src={assignee.image || "/img/noavatar.jpg"} alt={assignee.fullName} />
              <StyledAssigneeName>{assignee.fullName}</StyledAssigneeName>
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
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
      width: 100
    }
  ];
  