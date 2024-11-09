import { useCallback, useEffect, useMemo, useState } from "react";
import { AppLoader, ContainerTooltip, EmailContainer, StyledFilterIcon, StyledTable, StyledTableCardWrapper } from "_lib";
import { StyledGroupTitle } from "_lib/index.styled";
import {  StyledChartCardWrapper, StyledHomeHeaderInfoContainer, StyledWorkItemMailIcon } from "pages/home/index.styled"
import { 
  StyledFilterRightWrapper,
  StyledProfileAvatar, 
  StyledProfileChartTitle,
  StyledProfileContainer,
  StyledProfileEmailText, 
  StyledProfileHeaderInfoTitle, 
  StyledProfileHeaderInfoWrapper, 
  StyledProfileIconWrapper, 
  StyledProfileInfoContainer, 
  StyledProfileMiddleContainer, 
  StyledProfileMiddleLeftContainer, 
  StyledProfileMiddleRightContainer, 
  StyledProfileRoleText, 
  StyledProfileTitleContainer, 
  StyledTableHeaderWrapper, 
  StyledTableTitle 
} from "./index.styled";
import { useAuthUser,  useGetAllParams, useGetById } from "_hooks";
import {BugService, RoleService, UserService } from "_services";
import { DomianEnum } from "_constants";
import Performance from "./components/Performance";
import { Space, TablePaginationConfig } from "antd";
import ProfileForm from "./components/ProfileForm";
import { useParams } from "react-router-dom";
import { profileProjectColumns } from "pages/home/components/columns";
import { StyledDetailEditIcon } from "pages/projects/index.styled";
import { profileBugColumns } from "./columns";
import BugFilter, { BugFilterValues } from "pages/bugs/components/BugFilter";

const ProfilePage = () => {
  const { user } = useAuthUser();
  const { username } = useParams();
  const currentUser = username || user?.userName;
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [searchParams, setSearchParams] = useState({
    ...defaultParams,
    assignee : currentUser
  });
  const { isLoading: loadingProfile, data: profileData } = useGetById(UserService.getProfile, DomianEnum.PROFILE, currentUser);
  const { data: userRolesData } = useGetById(RoleService.getUserRole, `${DomianEnum.ROLES}-user-role`, currentUser);
  const [open, setOpen] = useState(false);
  const { isLoading, isFetching, data:userBugs } = useGetAllParams(BugService.getBugs, `${DomianEnum.BUGS}-userbugs`, searchParams);
  const [pagination, setPagination] = useState({
    ...defaultParams,
     totalPages: 1,
     totalElements: 1
});
const [openFilter, setOpenFilter] = useState(false);
const [openMail, setOpenMail] = useState(false);
const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

useEffect(() => {
  if(!isLoading && !isFetching){
    const { pagination } = userBugs?.data;
    setPagination({
      totalPages: pagination?.totalPages,
      pageSize: pagination?.itemsPerPage,
      pageNumber: pagination?.currentPage,
      totalElements: pagination?.totalItems,
    });
    setOpenFilter(false)
  }
}, [userBugs?.data, isFetching, isLoading]);

const onClose = useCallback(() => {
  setOpen(false);
  setOpenFilter(false);
  setOpenMail(false);
  setSelectedEmail(null)
}, [])

  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onFilterChange = useCallback(( filterValues: BugFilterValues) => {
    const filterParams = {
      ...filterValues,
      bugName: filterValues.bugName || null,
      projectId: filterValues.projectId || null,
      severity: filterValues.severity || null,
      classification: filterValues.classification || null,
      assignee: currentUser,
      bugStatus: filterValues?.bugStatus|| null,
      dueDate: filterValues?.dueDate?.format('YYYY-MM-DD') || null,
    };
    setSearchParams(prev => ({
      ...searchParams,
      ...filterParams
    }));
  } , [currentUser, searchParams]);

  const sendMailToMember = useCallback((email: string | undefined) => {
    if(email){
      setOpenMail(true);
      setSelectedEmail(email)
    }

}, [])


  if (loadingProfile) {
    return <AppLoader />;
  }

  const { profile, projects, progress} = profileData?.data;

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
  
  return (
    <StyledProfileContainer>
      <>
        <StyledProfileTitleContainer>
          <StyledGroupTitle>Member Profile</StyledGroupTitle>
        </StyledProfileTitleContainer>
        <StyledHomeHeaderInfoContainer>
          <StyledProfileAvatar src={ profile?.image || "/img/noavatar.jpg" } />
          <StyledProfileInfoContainer>
            <StyledProfileHeaderInfoWrapper>
            <StyledProfileHeaderInfoTitle>{ profile?.fullName }</StyledProfileHeaderInfoTitle>
            <Space wrap>
              {user?.userName === profile?.userName &&
              <StyledProfileIconWrapper>
                <ContainerTooltip title="Edit profile" color="#08AEEA">
                 <StyledDetailEditIcon onClick={showDrawer} />
              </ContainerTooltip>
              </StyledProfileIconWrapper>
              }
            {user?.userName !== profile?.userName &&
              <StyledProfileIconWrapper>
                <ContainerTooltip title="Contact member" color="#A593FF">
                <StyledWorkItemMailIcon onClick={() => sendMailToMember(profile?.email)} />
              </ContainerTooltip>
              </StyledProfileIconWrapper>  
            }                    
            </Space>
            </StyledProfileHeaderInfoWrapper>
            <StyledProfileRoleText>{ userRolesData?.data?.map((role: any) => role.name).join(", ") }</StyledProfileRoleText>
            <StyledProfileEmailText>{ profile?.email }</StyledProfileEmailText>
          </StyledProfileInfoContainer>
        </StyledHomeHeaderInfoContainer>
      </>
      <StyledProfileMiddleContainer>
        <StyledProfileMiddleLeftContainer>
          <StyledChartCardWrapper className="scrollbar-hide">
            <StyledProfileChartTitle>{`${profile?.fullName}'s Projects`}</StyledProfileChartTitle>
            <StyledTable 
              style={{ marginTop: 10}}
              loading={loadingProfile} 
              pagination={false}
              dataSource={projects || []} 
              columns={profileProjectColumns} 
              rowKey={(record: any) => record?.id}
              onRow={(record: any, rowIndex) => {
                return {
                //   onDoubleClick: (event) => onRowDoubleClick(record),
                  onContextMenu: (event) => {},
                };
              }}
            />
          </StyledChartCardWrapper>
        </StyledProfileMiddleLeftContainer>
        <StyledProfileMiddleRightContainer>
          <Performance fullName={profile?.fullName} performance={progress?.progressCount} />
        </StyledProfileMiddleRightContainer>
      </StyledProfileMiddleContainer>
      <StyledTableCardWrapper>
        <StyledTableHeaderWrapper>
           <StyledTableTitle>{`${profile?.fullName}'s Bugs`}</StyledTableTitle>
           <StyledFilterRightWrapper>
           <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledFilterIcon onClick={showFilter} />
          </ContainerTooltip>
           </StyledFilterRightWrapper>
        </StyledTableHeaderWrapper>
          <StyledTable 
           loading={isLoading} 
           dataSource={userBugs?.data?.data || []} 
           columns={profileBugColumns} 
           rowKey={(record: any) => record?.id}
           onRow={(record: any, rowIndex) => {
            return {
              // onDoubleClick: (event) => onRowDoubleClick(record),
              onContextMenu: (event) => {},
            };
           }}
           pagination = {{
            current: pagination.pageNumber,
            pageSize: pagination.pageSize,
            total: pagination.totalElements
           }}
           onChange={(pagination) => handleTableChange(pagination)}
          />
        </StyledTableCardWrapper>
        {open &&
          <ProfileForm 
            // key={statusMode && selectedRecord?.id}
            open={open} 
            onClose={onClose} 
            profile={profile} 
           />
         }
        {openFilter &&
          <BugFilter 
            open={openFilter} 
            onClose={onClose} 
            onFilterChange={onFilterChange}
           />
         }
       {
        openMail &&
        <EmailContainer 
            open={openMail} 
            onClose={onClose} 
            recipientEmail={selectedEmail}
        />
        }
    </StyledProfileContainer>
  )
}

export default ProfilePage