
import { Tag, Tooltip } from "antd";
import { IFollowerDto } from "interfaces";
import moment from "moment";
import styled from 'styled-components';

export const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text: string) => <a>{ text }</a>,
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
      title: 'Assignee',
      dataIndex: 'Assignee',
      key: 'assignee',
      render: (assignees : IFollowerDto[]) => (
        <>
          {assignees.map((assignee) => (
            <AssigneeContainer key={assignee.userName}>
              <AssigneeImage src={assignee.image || "/img/noavatar.jpg"} alt={assignee.fullName} />
              <AssigneeName>{assignee.fullName}</AssigneeName>
            </AssigneeContainer>
          ))}
        </>
      ),
      width: 200
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
      ellipsis: true,
    },
    // {
    //   title: 'Private',
    //   dataIndex: 'private',
    //   key: 'private',
    //   render: (isPrivate : boolean) => (isPrivate ? 'Yes' : 'No'),
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
  


const AssigneeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AssigneeImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const AssigneeName = styled.span`
  font-size: 14px;
  color: #333;
`;
