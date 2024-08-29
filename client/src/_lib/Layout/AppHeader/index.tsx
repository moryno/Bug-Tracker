import { ReactComponent as BugTrackerLogo } from "_assets/images/bug.svg"
import { 
  StyledAppHeader, 
  StyledAppHeaderLeft, 
  StyledAppHeaderRight, 
  StyledAppHeaderToggleSidebar,
  StyledAppHeaderAvatar,
  StyledAppHeaderAdd,
  StyledAppHeaderSearch,
  StyledAppHeaderNotification
 } from './index.styled'
import { useCallback, useState } from "react";
import BugForm from "pages/bugs/components/BugForm";

const AppHeader = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(prev => !prev);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
    <StyledAppHeader>
      <StyledAppHeaderLeft>
        <BugTrackerLogo width={144} height={24} />
        <StyledAppHeaderToggleSidebar />
        
      </StyledAppHeaderLeft>
      <StyledAppHeaderRight>
        <StyledAppHeaderAdd onClick={showDrawer} />
        <StyledAppHeaderSearch />
        <StyledAppHeaderNotification />
        <StyledAppHeaderAvatar src={"/img/noavatar.jpg"} />
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
    </>
  )
}

export default AppHeader