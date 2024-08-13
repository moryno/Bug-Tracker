import { Tag } from "antd";
import { IFollowerDto } from "interfaces";
import moment from "moment";
import styled from 'styled-components';

export const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = priority === 'High' ? 'red' : 'green';
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Project Group',
      dataIndex: 'projectGroup',
      key: 'projectGroup',
    },
    // {
    //   title: 'Private',
    //   dataIndex: 'private',
    //   key: 'private',
    //   render: (isPrivate : boolean) => (isPrivate ? 'Yes' : 'No'),
    // },
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
    },
    {
      title: 'Created By',
      dataIndex: 'createdUser',
      key: 'createdUser',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedUser',
      key: 'updatedUser',
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
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
