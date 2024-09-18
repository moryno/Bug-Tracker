import { IFollowerDto } from "interfaces";
import moment from "moment";
import { StyledAssigneeContainer, StyledAssigneeImage, StyledAssigneeName } from "pages/projects/index.styled";

const userColumns = [
    {
      title: 'Owner',
      key: 'owner',
      render: (record: IFollowerDto) => (
        <StyledAssigneeContainer>
          <StyledAssigneeImage
            src={record.image || "/img/noavatar.jpg"}
            alt={record.fullName || "No name provided"}
          />
          <StyledAssigneeName>{record.fullName || "Unknown Owner"}</StyledAssigneeName>
        </StyledAssigneeContainer>
      ),
      width: 200,
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: (roles: any[]) => roles ? roles.join(', ') : 'No roles assigned',
    },
    {
      title: 'Last Active',
      key: 'lastActive',
      dataIndex: 'lastActive',
      render: (date: Date) => date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : 'No activity recorded',
    },
    {
      title: 'Date Added',
      key: 'dateAdded',
      dataIndex: 'dateAdded',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
  