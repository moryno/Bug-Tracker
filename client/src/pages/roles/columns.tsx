import { Tooltip } from "antd";
import moment from "moment";

export const roleColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 200,
    }, 
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
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
  