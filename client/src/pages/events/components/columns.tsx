import { Tag } from "antd";
import moment from "moment";

export const eventColumns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      ellipsis: true
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        render: (comment: string) => comment || <Tag color="#B99897">Not Specified</Tag>,
    },
    {
      title: 'Initial Comment',
      dataIndex: 'initialComment',
      key: 'initialComment',
      width: 200,
      ellipsis: true,
      render: (comment: string) => comment || <Tag color="#98A2B3">No Comment</Tag>,
    },
    {
      title: 'Organizer',
      dataIndex: 'createdUser',
      key: 'createdUser',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: Date) => moment(date).format('YYYY-MM-DD'),
    },
  ];
  