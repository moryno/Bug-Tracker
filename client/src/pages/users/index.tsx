import { useCallback, useMemo, useState } from "react";
import { Dropdown, MenuProps, Space } from 'antd';
import { useGetAll } from "_hooks";
import { IBug, IProject, IUser } from "interfaces";
import { FaPlus } from "react-icons/fa6";
import { ContainerButton, StyledPageCard, StyledTable, StyledTableCardWrapper } from "_lib";
import {  
   StyledBottomContainer,
  StyledGroupFilterLeftWrapper,
  StyledGroupFilterRightWrapper,
  StyledGroupFilterWrapper,
  StyledGroupSubTitle,
  StyledGroupTableTitle,
  StyledGroupTitle,
  StyledGroupTitleWrapper, } from "_lib/index.styled";
import { StyledAppHeaderSearch } from "_lib/Layout/AppHeader/index.styled";
import InviteForm from "./components/InviteForm";
import { UserService } from "_services";
import { userColumns } from "./columns";
import {
   StyledActionImg, 
  StyledActionTitle, 
  StyledMenuItemActions, 
  StyledUserDeactivateIcon, 
  StyledUserEditIcon, 
  StyledUserProfileIcon,
  StyledUserRoleIcon 
  } from "./index.styled";

import { useNavigate } from "react-router-dom";
import AssignRole from "pages/roles/components/AssignRole";
import { DomianEnum } from "_constants";


const Users = () => {
  const [open, setOpen] = useState(false);
  const [openAssigne, setOpenAssigne] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | IBug | null>(null);
  const [selectedUsername, setUsername] = useState<string | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetAll(UserService.getTeamMembers, DomianEnum.TEAM);
  const navigate = useNavigate()
  // const deleteRecord = useDeleteRecord(deleteService, title)

  
  // const handleDelete = useCallback(async () => {
  //   if(!selectedRecords) return message.warning("Please select a record to delete");
  //   const recordId  = selectedRecords[0]?.id
    
  //   try {
  //     await deleteRecord.mutateAsync(recordId)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [deleteRecord, selectedRecords]);


  const showDrawer = useCallback(() => {
      setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
    setStatusMode("CreateMode");
    setUsername(null);
    setOpenAssigne(false)
  }, []);
  const onCloseAssigneForm = useCallback(() => {
    onClose()
  }, [onClose]);
  const onChangePermission = useCallback((userName: string) => {
    onClose()
    setUsername(userName)
    setOpenAssigne(true);
  }, [onClose]);
  const handleMenuClick = useCallback(async (user : IUser, e: any) => {
    const { key } =  e;
    switch (key) {
      case "view":
        navigate(`/users/profile/${user?.userName}`)
        break;
      case "permission":
        onChangePermission(user?.userName)
        break;
    
      default:
        break;
    }
  }, [navigate, onChangePermission]);

  const menuItems = useCallback((row: IUser): MenuProps['items'] => {

    return [
      {
        key: 'view',
        label: (
          <StyledMenuItemActions>
            <StyledUserProfileIcon />
            <StyledActionTitle>View profile</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => handleMenuClick(row, e),
      },
      {
        key: 'edit',
        label: (
          <StyledMenuItemActions>
            <StyledUserEditIcon />
            <StyledActionTitle>Edit details</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => handleMenuClick(row, e),
      },
      {
        key: 'permission',
        label: (
          <StyledMenuItemActions>
            <StyledUserRoleIcon />
            <StyledActionTitle>Change permission</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => handleMenuClick(row, e),
      },
      {
        key: 'deactivate',
        label: (
          <StyledMenuItemActions>
            <StyledUserDeactivateIcon />
            <StyledActionTitle>Deactivate user</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e) => handleMenuClick(row, e),
      },
    ];
  }, [handleMenuClick]);

  const columns = useMemo(() => (
    [
      ...userColumns,
      {
        title: "",
        key: "actions",
        width: "4%",
        render: (user: IUser) => (
          <>
            <Dropdown menu={{ items: menuItems(user) }}>
            <StyledActionImg src="/img/moreDark.png" alt="this is an elipses" />
            </Dropdown>
          </>
        )
      }
    ]
  ), [menuItems]) 

  return (
    <StyledPageCard>
    <StyledGroupTitleWrapper>
      <StyledGroupTitle>Team management</StyledGroupTitle>
      <StyledGroupSubTitle>Manage your team members and their account permissions and roles here.</StyledGroupSubTitle>
    </StyledGroupTitleWrapper>
    <StyledGroupFilterWrapper>
    <StyledGroupFilterLeftWrapper>
      <StyledGroupTableTitle>All users 44</StyledGroupTableTitle>
    </StyledGroupFilterLeftWrapper>
    <StyledGroupFilterRightWrapper>
    <Space wrap>
       <StyledAppHeaderSearch />
       <ContainerButton
        title={`Invite User`}
        size="middle"
        icon={<FaPlus size={16} /> }
        onClick={showDrawer}
        type="primary"
       />
    </Space>
    </StyledGroupFilterRightWrapper>
  </StyledGroupFilterWrapper>
  <StyledBottomContainer>
    <StyledTableCardWrapper>
      <StyledTable 
       loading={isLoading} 
       dataSource={data?.data || []} 
       columns={columns} 
       rowKey={(record: any) => record?.id}
      />
    </StyledTableCardWrapper>
    {open &&
      <InviteForm 
        key={statusMode && selectedRecord?.id}
        open={open} 
        onClose={onClose} 
        // editedRecord={selectedRecord} 
        statusMode={statusMode}
       />
     }
    {openAssigne &&
      <AssignRole 
        open={openAssigne} 
        onClose={onCloseAssigneForm} 
        userName={selectedUsername}
       />
     }
  </StyledBottomContainer>
</StyledPageCard>
  )
}

export default Users
