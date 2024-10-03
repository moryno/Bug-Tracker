import { Tag } from "antd";
import { IUser } from "interfaces";
import moment from "moment";
import { StyledWorkItemInfoDesc, StyledWorkItemInfoTitle, StyledWorkItemLeftDiv } from "pages/home/index.styled";
import styled from "styled-components";

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
            <StyledWorkItemInfoDesc>{ record?.email }</StyledWorkItemInfoDesc>
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
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: boolean) => <Tag color={status ? "#12CC1B" : "#EF476F"}>{ status ? "Active" : "In Active"}</Tag>,
      width: "6%",
    },
    {
      title: 'Last Active',
      key: 'lastActive',
      dataIndex: 'lastActive',
      render: (date: Date) => date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : 'No activity recorded',
      width: "15%",
    },
    {
      title: 'Date Added',
      key: 'dateAdded',
      dataIndex: 'dateAdded',
      render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
      width: "15%",
    },
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
