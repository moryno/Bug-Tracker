import { FaRegUserCircle } from "react-icons/fa"
import { StyledMenu, StyledMenuItem, StyledMenuItemAction, StyledMenuItemLabel } from "./index.styled"
import { StyledProfileRoleText } from "pages/profile/index.styled"
import { MdManageAccounts } from "react-icons/md"
import { RiLogoutBoxRLine } from "react-icons/ri"


const MenuItem = () => {
  return (
    <StyledMenu>
        <StyledMenuItem style={{ cursor: "pointer" }} key='profile'>
            <StyledMenuItemAction key='profile'>
             <FaRegUserCircle size={18} />
             <StyledMenuItemLabel>My profile</StyledMenuItemLabel>
             <StyledProfileRoleText>@diana</StyledProfileRoleText>
           </StyledMenuItemAction>
          </StyledMenuItem>
          <StyledMenuItem key='settings'>
            <StyledMenuItemAction>
              <MdManageAccounts size={18} />
              <StyledMenuItemLabel>Account settings</StyledMenuItemLabel>
            </StyledMenuItemAction>
          </StyledMenuItem> 
          <StyledMenuItem key='logout'>
            <StyledMenuItemAction>
              <RiLogoutBoxRLine size={18} />
              <StyledMenuItemLabel>Sign out</StyledMenuItemLabel>
            </StyledMenuItemAction>
          </StyledMenuItem> 
    </StyledMenu>
  )
}

export default MenuItem