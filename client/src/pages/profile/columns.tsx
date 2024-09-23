
import { Tag } from "antd";
import moment from "moment";

import { IProject } from "interfaces";
import { StyledAssigneeImage } from "pages/projects/index.styled";
import { StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemInfoWrapper } from "pages/home/index.styled";
import { StyledAssigneeContainer } from "pages/bugs/index.styled";

export const profileProjectColumns = [
    {
      title: 'Project Name',
      key: 'projectName',
      ellipsis: true,
      render: (project : IProject) => (
        <StyledAssigneeContainer>
            <StyledAssigneeImage src={"/img/noavatar.jpg"} />
            <StyledWorkItemInfoWrapper>
              <StyledWorkItemInfoTitle>{ project.projectName }</StyledWorkItemInfoTitle>
              <StyledWorkItemInfoDesc>{ project.description }</StyledWorkItemInfoDesc>
            </StyledWorkItemInfoWrapper>
        </StyledAssigneeContainer>
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
    },
    {
        title: 'Created By',
        dataIndex: 'createdUser',
        key: 'createdUser',
        width: 150
      },
  ];
  
