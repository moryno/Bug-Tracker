
import { Tag, Tooltip } from "antd";
import { IBug } from "interfaces";
import moment from "moment";
import styled from 'styled-components';
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "./index.styled";
import { Link } from "react-router-dom";
import { BUG_ROUTE } from "_constants";


  export const bugColumns = [
    {
      title: 'Bug Name',
      dataIndex: 'bugName',
      key: 'bugName',
      render: (text: string, row: IBug) => <StyledLink to={`${BUG_ROUTE}/${row.id}`}>{ text }</StyledLink>,
      width: 300,
      ellipsis: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 300,
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
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      width: 100,
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
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
      width: 150,
    },
    {
      title: 'Bug Status',
      dataIndex: 'bugStatus',
      key: 'bugStatus',
      render: (status: any) => {
        let color = status === 'Open' ? '#2CC8BA' : status === "InProgress" ? "#08AEEA" : '#F56B62';
        return <Tag color={color}>{status}</Tag>;
      },
      width: 100,
    },
    // {
    //   title: 'Assignee',
    //   dataIndex: 'assignee',
    //   key: 'assignee',
    //   render: (assignees : IFollowerDto[]) => (
    //     <>
    //       {assignees.map((assignee) => (
    //         <StyledAssigneeContainer key={assignee.userName}>
    //           <StyledAssigneeImage src={assignee.image || "/img/noavatar.jpg"} alt={assignee.fullName} />
    //           <StyledAssigneeName>{assignee.fullName}</StyledAssigneeName>
    //         </StyledAssigneeContainer>
    //       ))}
    //     </>
    //   ),
    // },
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