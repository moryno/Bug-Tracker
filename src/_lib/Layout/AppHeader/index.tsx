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

const AppHeader = () => {
  return (
    <StyledAppHeader>
      <StyledAppHeaderLeft>
        <BugTrackerLogo width={144} height={24} />
        <StyledAppHeaderToggleSidebar />
        
      </StyledAppHeaderLeft>
      <StyledAppHeaderRight>
        <StyledAppHeaderAdd />
        <StyledAppHeaderSearch />
        <StyledAppHeaderNotification />
        <StyledAppHeaderAvatar src={"/img/noavatar.jpg"} />
      </StyledAppHeaderRight>
    </StyledAppHeader>
  )
}

export default AppHeader