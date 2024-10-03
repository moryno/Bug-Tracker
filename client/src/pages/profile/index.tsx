import { StyledEditIcon, StyledTable, StyledTableCardWrapper } from "_lib";
import { StyledGroupTitle } from "_lib/index.styled";
import {  StyledChartCardWrapper, StyledHomeHeaderInfoContainer, StyledWorkItemMailIcon } from "pages/home/index.styled"
import { 
  StyledProfileAvatar, 
  StyledProfileChartTitle,
  StyledProfileContainer,
  StyledProfileEmailText, 
  StyledProfileHeaderInfoTitle, 
  StyledProfileHeaderInfoWrapper, 
  StyledProfileInfoContainer, 
  StyledProfileMiddleContainer, 
  StyledProfileMiddleLeftContainer, 
  StyledProfileMiddleRightContainer, 
  StyledProfileRoleText, 
  StyledProfileTitleContainer, 
  StyledTableTitle 
} from "./index.styled";
import { useGetAll, useGetById } from "_hooks";
import { ProjectService, RoleService, UserService } from "_services";
import { DomianEnum } from "_constants";
import Performance from "./components/Performance";
import { Space } from "antd";
import { useCallback, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import { useParams } from "react-router-dom";
import { topProjectColumns } from "pages/home/components/columns";
import { profileBugColumns } from "./columns";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading: loadingProfile, data: profileData } = useGetById(UserService.getProfile, DomianEnum.PROFILE, username);
  const { isLoading: isUserRoleLoading, data: userRolesData } = useGetById(RoleService.getUserRole, `${DomianEnum.ROLES}-user-role`, username);
  const [open, setOpen] = useState(false);
  const { isLoading, error, data } = useGetAll(ProjectService.getProjects, DomianEnum.PROJECTS);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    // setSelectedRecord(null);
  }, []);

  if (loadingProfile) {
    return <div>Hello...</div>;
  }

  const { profile, projects, bugs, progress} = profileData?.data
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
              <StyledEditIcon onClick={showDrawer} />
              <StyledWorkItemMailIcon />
            </Space>
            </StyledProfileHeaderInfoWrapper>
            <StyledProfileRoleText>{ userRolesData?.data?.map((role: any) => role.name).join(", ") }</StyledProfileRoleText>
            <StyledProfileEmailText>{ profile?.email }</StyledProfileEmailText>
          </StyledProfileInfoContainer>
        </StyledHomeHeaderInfoContainer>
      </>
      <StyledProfileMiddleContainer>
        <StyledProfileMiddleLeftContainer>
          <StyledChartCardWrapper>
            <StyledProfileChartTitle>{`${profile?.fullName}'s Projects`}</StyledProfileChartTitle>
            <StyledTable 
              style={{ marginTop: 10}}
              loading={loadingProfile} 
              pagination={false}
              dataSource={projects || []} 
              columns={topProjectColumns} 
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
        <StyledTableTitle>{`${profile?.fullName}'s Bugs`}</StyledTableTitle>
          <StyledTable 
           loading={loadingProfile} 
           dataSource={bugs || []} 
           columns={profileBugColumns} 
           rowKey={(record: any) => record?.id}
           onRow={(record: any, rowIndex) => {
            return {
              // onDoubleClick: (event) => onRowDoubleClick(record),
              onContextMenu: (event) => {},
            };
           }}
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
    </StyledProfileContainer>
  )
}

export default ProfilePage