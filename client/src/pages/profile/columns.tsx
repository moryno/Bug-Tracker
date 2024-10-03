
import { Tag } from "antd";
import moment from "moment";

import { IBug } from "interfaces";
import { 
  StyledWorkItemInfoDesc,
   StyledWorkItemInfoTitle, 
   StyledWorkItemInfoWrapper 
  } from "pages/home/index.styled";


export const profileBugColumns = [
    {
      title: 'Name',
      key: 'bugName',
      render: (bug : IBug) => (

        <StyledWorkItemInfoWrapper>
          <StyledWorkItemInfoTitle>{ bug.bugName }</StyledWorkItemInfoTitle>
          <StyledWorkItemInfoDesc>{ bug.description }</StyledWorkItemInfoDesc>
         </StyledWorkItemInfoWrapper>
      ),
      width: "40%",
    },
    {
      title: 'Bug Status',
      dataIndex: 'bugStatus',
      key: 'bugStatus',
      render: (status: string) => {
        let color = status === 'Open' ? '#2CC8BA' : status === "InProgress" ? "#08AEEA" : '#F56B62';
        return <Tag color={color}>{status}</Tag>;
      },
      width: "15%",
      align: "center" as const,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
      width: "15%",
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      width: "15%",
      align: "center" as const,
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
        title: 'Created By',
        dataIndex: 'createdUser',
        key: 'createdUser',
        width: "15%",
      },
  ];
  
