
import { Tag, Tooltip } from "antd";
import { IBug, IUser } from "interfaces";
import moment from "moment";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { BUG_ROUTE, PROFILE_ROUTE } from "_constants";
import { PopoverComponent } from "_lib";
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "./index.styled";
import { StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemLeftDiv } from "pages/home/index.styled";

 export const assigneeColumns = [
  {
    title: 'Username',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
 ];

  export const bugColumns = [
    {
      title: 'Bug Name',
      dataIndex: 'bugName',
      key: 'bugName',
      render: (text: string, record: unknown) => {
        const row = record as IBug;
        return <StyledLink to={`${BUG_ROUTE}/${row.id}`}>{text}</StyledLink>;
      },
      width: 200,
      ellipsis: true
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
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
      title: 'Bug Status',
      dataIndex: 'bugStatus',
      key: 'bugStatus',
      render: (status: any) => {
        let color = status === 'Open' ? '#2CC8BA' : status === "InProgress" ? "#08AEEA" : '#4ED3E5';
        return <Tag color={color}>{status}</Tag>;
      },
      width: 100,
      align: "center" as "center",
    },
    {
      title: 'Assignee',
      dataIndex: 'assignees',
      key: 'assignees',
      width: 200,
      render: (assignees : IUser[]) => {
        const followers = assignees?.map(assinee => ({ userName: assinee?.userName, fullName: assinee?.fullName}));
          return assignees.length > 0 ?
           <PopoverComponent dataSource={followers} columns={assigneeColumns} /> :
            <StyledAssigneeContainer>
              <StyledAssigneeImage src={"/img/noavatar.jpg"} alt="not assigned" />
              <StyledAssigneeName>Not Assigned</StyledAssigneeName>
            </StyledAssigneeContainer>
    },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
      width: 100,
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
      align: "center" as "center",
      render: (severity: string) => {
        let color;
        switch (severity) {
          case 'Minor':
            color = '#4ED3E5';
            break;
          case 'Major':
            color = '#F6A96D';
            break;
          case 'Critical':
            color = '#F56B62';
            break;
          case 'ShowStopper':
            color = '#EF476F';
            break;
          default:
            color = '#08AEEA';
        }
        return <Tag color={color}>{severity}</Tag>;
      },
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
      width: 150,
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
      width: 100
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
      width: 100
    },
  ];
  
const StyledLink = styled(Link)`
  // color: #1890ff !important; 

  &:hover {
    text-decoration: underline;
  }
`;
 
export const userColumns = [
  {
    title: 'Name',
    key: 'name',
    render: (record: IUser) => (
      <StyledWorkItemLeftDiv>
        <StyledImage
          src={record?.image || "/img/noavatar.jpg"}
          alt={record?.fullName || "No name provided"}
        />
        <StyledInfoWrapper>
          <StyledWorkItemInfoTitle>{record?.fullName || "Unknown Owner"}</StyledWorkItemInfoTitle>
          <Link to={`${PROFILE_ROUTE}/${record?.userName}`}>{ record?.email }</Link>
          </StyledInfoWrapper>
      </StyledWorkItemLeftDiv>
    ),
    width: "30%",
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'roles',
    render: (roles: any[]) => roles ? roles.join(', ') : 'No roles assigned',
    width: "30%",
  },
  {
    title: 'Last Active',
    key: 'lastActive',
    dataIndex: 'lastActive',
    render: (date: Date) => date ? moment(date).fromNow() : 'No activity recorded',
    width: "15%",
  }
];
export const StyledImage = styled.img`
width: 38px;
height: 38px;
border-radius: 50%;
object-fit: cover;
`;
export const StyledInfoWrapper = styled.div`
display: flex;
flex-direction: column;

`;
