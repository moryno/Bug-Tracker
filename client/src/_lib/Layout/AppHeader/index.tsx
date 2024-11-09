import { ReactComponent as BugTrackerLogo } from "_assets/images/bug.svg"
import { 
  StyledAppHeader, 
  StyledAppHeaderLeft, 
  StyledAppHeaderRight, 
  StyledAppHeaderToggleSidebar,
  StyledAppHeaderAvatar,
  StyledAppHeaderAdd,
  StyledAppHeaderNotification
 } from './index.styled'
import { useCallback, useState } from "react";
import BugForm from "pages/bugs/components/BugForm";
import { useAuthUser, useNotificationHub } from "_hooks";
import AppNotification from "_lib/AppNotification";
import { Badge, Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "_redux";
import AppHeaderSearch from "_lib/AppSearchComponent";
import ProfileMenuItem from "./ProfileMenuItem";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "_constants";

const AppHeader = () => {
  useNotificationHub() 
  const { user } = useAuthUser();
  const { notificationCount } = useSelector((store: RootState) => store.notification);
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const navigate = useNavigate();

  const onNavigate = (where: string) => {
      if(where === "home"){
          navigate(HOME_ROUTE)
      }
    
  }
  

  const showDrawer = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const showNotification = useCallback(() => {
    setOpen(false);
    setOpenNotification(prev => !prev);
  }, []);
  
  const onClose = useCallback(() => {
    setOpenNotification(false)
    setOpen(false);
  }, []);

  return (
    <>
    <StyledAppHeader>
      <StyledAppHeaderLeft>
        <BugTrackerLogo style={{ cursor: "pointer" }} onClick={() => onNavigate("home")} width={144} height={24} />
        <StyledAppHeaderToggleSidebar />
      </StyledAppHeaderLeft>
      <StyledAppHeaderRight>
        <StyledAppHeaderAdd onClick={showDrawer} />
        <AppHeaderSearch />
        <Badge count={notificationCount} overflowCount={10}>
          <StyledAppHeaderNotification onClick={showNotification} />
        </Badge>
        <Popover
            key={Math.random()}
            title={null}
            content={
              <>
                <ProfileMenuItem />
              </>
            }
        >
          <StyledAppHeaderAvatar src={ user?.image || "/img/noavatar.jpg"} />
        </Popover>
      </StyledAppHeaderRight>
    </StyledAppHeader>
   
    {open &&
      <BugForm 
       key={"CreateMode"}
       open={open} 
       onClose={onClose} 
       statusMode={"CreateMode"}
       editedRecord={null}
      />
    }
    {openNotification && <AppNotification open={openNotification} onClose={onClose}  />}
    </>
  )
}

export default AppHeader