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
import { useGetAll } from "_hooks";
import { ProjectService } from "_services";
import { DomianEnum } from "_constants";
import { profileProjectColumns } from "./columns";
import Performance from "./components/Performance";
import { Space } from "antd";
import { useCallback, useState } from "react";
import ProfileForm from "./components/ProfileForm";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, error, data } = useGetAll(ProjectService.getProjects, DomianEnum.PROJECTS);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    // setSelectedRecord(null);
  }, []);


  return (
    <StyledProfileContainer>
      <>
        <StyledProfileTitleContainer>
          <StyledGroupTitle>Member Profile</StyledGroupTitle>
        </StyledProfileTitleContainer>
        <StyledHomeHeaderInfoContainer>
          <StyledProfileAvatar src={"/img/noavatar.jpg"} />
          <StyledProfileInfoContainer>
            <StyledProfileHeaderInfoWrapper>
            <StyledProfileHeaderInfoTitle>Amelia Wilson</StyledProfileHeaderInfoTitle>
            <Space wrap>
              <StyledEditIcon onClick={showDrawer} />
              <StyledWorkItemMailIcon />
            </Space>
            </StyledProfileHeaderInfoWrapper>
            <StyledProfileRoleText>Project Manager</StyledProfileRoleText>
            <StyledProfileEmailText>amelia.wilson@democorp.com</StyledProfileEmailText>
          </StyledProfileInfoContainer>
        </StyledHomeHeaderInfoContainer>
      </>
      <StyledProfileMiddleContainer>
        <StyledProfileMiddleLeftContainer>
          <StyledChartCardWrapper>
            <StyledProfileChartTitle>Amelia's Projects</StyledProfileChartTitle>
            <StyledTable 
            style={{ marginTop: 10}}
            loading={isLoading} 
            pagination={false}
            dataSource={data?.data || []} 
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
          <Performance />
        </StyledProfileMiddleRightContainer>
      </StyledProfileMiddleContainer>
      <StyledTableCardWrapper>
        <StyledTableTitle>Amelia's Tickets</StyledTableTitle>
          <StyledTable 
          //  loading={isLoading} 
          //  dataSource={data?.data || []} 
          //  columns={columns} 
          //  rowKey={(record: any) => record?.id}
          //  scroll={{ x: 2000 }}
          //  rowSelection={{
          //   type: "radio",
          //   ...rowSelection,
          // }}
          //  onRow={(record: any, rowIndex) => {
          //   return {
          //     onDoubleClick: (event) => onRowDoubleClick(record),
          //     onContextMenu: (event) => {},
          //   };
          //  }}
          />
        </StyledTableCardWrapper>
        {open &&
          <ProfileForm 
            // key={statusMode && selectedRecord?.id}
            open={open} 
            onClose={onClose} 
            // editedRecord={selectedRecord} 
            statusMode={"statusMode"}
           />
         }
    </StyledProfileContainer>
  )
}

export default ProfilePage