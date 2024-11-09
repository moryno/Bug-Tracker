import { useCallback, useEffect, useMemo, useState } from "react";
import { Dropdown, MenuProps, Space, TablePaginationConfig } from 'antd';
import { useAuthUser, useGetAllParams } from "_hooks";
import { IBug, IProject, IUser } from "interfaces";
import {  ContainerTooltip, StyledFilterIcon, StyledIconWrapper, StyledNewIcon, StyledPageCard, StyledTable, StyledTableCardWrapper } from "_lib";
import {  
   StyledBottomContainer,
  StyledGroupFilterLeftWrapper,
  StyledGroupFilterRightWrapper,
  StyledGroupFilterWrapper,
  StyledGroupSubTitle,
  StyledGroupTableTitle,
  StyledGroupTitle,
  StyledGroupTitleWrapper, } from "_lib/index.styled";
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
import UserFilter, { UserFilterValues } from "./components/UserFilter";


const Users = () => {
  const { user: currentUser } = useAuthUser();
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [searchParams, setSearchParams] = useState(defaultParams);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openAssigne, setOpenAssigne] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | IBug | null>(null);
  const [selectedUsername, setUsername] = useState<string | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetAllParams(UserService.getTeamMembers, DomianEnum.TEAM, searchParams);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    ...defaultParams,
     totalPages: 1,
     totalElements: 1
});

useEffect(() => {
  if(!isLoading && data.data){
    const { pagination } = data?.data;
    setPagination({
      totalPages: pagination?.totalPages,
      pageSize: pagination?.itemsPerPage,
      pageNumber: pagination?.currentPage,
      totalElements: pagination?.totalItems,
    });
    setOpenFilter(false);
  }
}, [data?.data, isLoading])

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

  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);
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
      ...(currentUser?.userName === row.userName ? [{
        key: 'edit',
        label: (
          <StyledMenuItemActions>
            <StyledUserEditIcon />
            <StyledActionTitle>Edit details</StyledActionTitle>
          </StyledMenuItemActions>
        ),
        onClick: (e: any) => handleMenuClick(row, e),
      }] : []),
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
  }, [currentUser?.userName, handleMenuClick]);

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
  ), [menuItems]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10, total = 1 } = pagination;
    const page = {
      pageNumber: current,
      pageSize
    }
    setSearchParams(prev => ({
      ...prev,
      ...page!
    }));
    setPagination(prev => ({
      ...prev,
      totalElements: total,
      ...page
    }))
  };
  const onFilterChange = useCallback(( filterValues: UserFilterValues) => {
    const filterParams = {
      ...filterValues,
      fullName: filterValues?.fullName || null,
      role: filterValues?.role || null,
      status: filterValues?.status || null
    };
    setSearchParams(prev => ({
      ...searchParams,
      ...filterParams
    }));
  } , [searchParams])
  return (
    <StyledPageCard>
    <StyledGroupTitleWrapper>
      <StyledGroupTitle>User Management</StyledGroupTitle>
      <StyledGroupSubTitle>Manage users of the company. This page allows you to invite, edit, view, and assign roles to users, as well as monitor their activity and permissions.</StyledGroupSubTitle>
    </StyledGroupTitleWrapper>
    <StyledGroupFilterWrapper>
    <StyledGroupFilterLeftWrapper>
      <StyledGroupTableTitle>All Users ({ data?.data?.data?.length || 0 })</StyledGroupTableTitle>
    </StyledGroupFilterLeftWrapper>
    <StyledGroupFilterRightWrapper>
    <Space wrap>
          <ContainerTooltip title="New" color="#12CC1B">
            <StyledIconWrapper><StyledNewIcon onClick={showDrawer} /></StyledIconWrapper>
          </ContainerTooltip>
          <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledIconWrapper><StyledFilterIcon onClick={showFilter} /></StyledIconWrapper>
          </ContainerTooltip>
        </Space>
    </StyledGroupFilterRightWrapper>
  </StyledGroupFilterWrapper>
  <StyledBottomContainer>
    <StyledTableCardWrapper>
      <StyledTable 
       loading={isLoading} 
       dataSource={data?.data?.data || []} 
       columns={columns} 
       rowKey={(record: any) => record?.id}
       pagination = {{
        current: pagination.pageNumber,
        pageSize: pagination.pageSize,
        total: pagination.totalElements
       }}
       onChange={(pagination) => handleTableChange(pagination)}
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
    {openFilter &&
          <UserFilter 
            open={openFilter} 
            onClose={onCloseFilter} 
            onFilterChange={onFilterChange}
           />
    }
  </StyledBottomContainer>
</StyledPageCard>
  )
}

export default Users
