
import { Progress, Tag, Tooltip } from "antd";
import { IFollowerDto, IProject } from "interfaces";
import moment from "moment";
import styled from 'styled-components';
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "./index.styled";
import { Link } from "react-router-dom";
import { PROJECT_ROUTE } from "_constants";

export const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text: string, row: IProject) => <StyledLink to={`${PROJECT_ROUTE}/${row.id}`}>{ text }</StyledLink>,
      width: 200,
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (description : string) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
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
      title: 'Owner',
      key: 'owner',
      align: "center",
      render: (assignee : IFollowerDto) => (
        <>
            <StyledAssigneeContainer>
              <StyledAssigneeImage src={assignee.image || "/img/noavatar.jpg"} alt={assignee.fullName} />
              <StyledAssigneeName>{assignee.fullName}</StyledAssigneeName>
            </StyledAssigneeContainer>
        </>
      ),
      width: 200
    },
    {
      title: 'Status',
      dataIndex: 'currentStatus',
      key: 'currentStatus',
      width: 120,
      render: (currentStatus : string) => 
        currentStatus ?
      <Tag color={`${currentStatus === "Active" ? "#2CC8BA" : 
        currentStatus === "InProgress" ? "#08AEEA" :
        currentStatus === "OnTrack" ? "#74CB80" :
        currentStatus === "Delayed" ? "#C5A070" :
        currentStatus === "InTesting" ? "#F6A96D" :
        "#FBC11E"
      }`}>
        {currentStatus}</Tag> : null,
    },
    {
      title: 'Bugs',
      key: 'projectStatus',
      dataIndex: "projectStatus",
      // align: "center",
      render: (status : number) => (
        <>
        <Progress
          percent={+Math.round(status).toFixed(0)}
          percentPosition={{ align: 'center', type: 'inner' }}
          size={[150, 15]}
          strokeColor={
            `${status === 0 ? "#F56B62" :
              status <= 20 ? "#F6A96D" :
              status > 20 && status < 50 ? "#08AEEA" :
              status >=50 && status <=75 ? "#2CC8BA" :
              "#4ED3E5"
            }`
          }
        />
        </>
      ),
      width: 180
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
      width: 150
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
      width: 150
    },
  
    {
      title: 'Project Group',
      dataIndex: 'projectGroup',
      key: 'projectGroup',
      width: 150,
      render: (group: string) => group || 'Not Specified',
    },
    {
      title: 'Created By',
      dataIndex: 'createdUser',
      key: 'createdUser',
      width: 150
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
      width: 150
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedUser',
      key: 'updatedUser',
      width: 150
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
      width: 150
    },
  ];
  

const StyledLink = styled(Link)`
  // color: #1890ff !important; 

  &:hover {
    text-decoration: underline;
  }
`;