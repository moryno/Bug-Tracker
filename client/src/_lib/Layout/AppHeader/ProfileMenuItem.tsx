import { StyledAppHeaderProfileAvatar, StyledMenu, StyledMenuHeader, StyledMenuInfoTitle, StyledMenuInfoWrapper, StyledMenuItem, StyledMenuItemAction, StyledMenuItemLabel, StyledMenuItemWrapper } from "./index.styled"
import { MdManageAccounts } from "react-icons/md"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { useAuthUser } from "_hooks"
import { Link, useNavigate } from "react-router-dom"
import { PROFILE_ROUTE } from "_constants"
import { useDispatch } from "react-redux"
import { logoutFn } from "_redux"


const ProfileMenuItem = () => {
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onNavigate = () => {
    navigate(`${PROFILE_ROUTE}/${user?.userName}`)
  }
  const signOut = () => {
    logoutFn(dispatch, navigate)
  }

  return (
    <StyledMenu>
      <StyledMenuHeader>
      <StyledAppHeaderProfileAvatar src={ user?.image || "/img/noavatar.jpg"} />
      </StyledMenuHeader>
      <StyledMenuInfoWrapper>
        <StyledMenuInfoTitle>{ user?.fullName }</StyledMenuInfoTitle>
        <Link to={`${PROFILE_ROUTE}/${user?.userName}`}>{ user?.email }</Link>
      </StyledMenuInfoWrapper>
      <StyledMenuItemWrapper>
          <StyledMenuItem key='settings'>
            <StyledMenuItemAction>
              <MdManageAccounts size={18} />
              <StyledMenuItemLabel onClick={onNavigate}>Account settings</StyledMenuItemLabel>
            </StyledMenuItemAction>
          </StyledMenuItem> 
          <StyledMenuItem key='logout'>
            <StyledMenuItemAction>
              <RiLogoutBoxRLine size={18} />
              <StyledMenuItemLabel onClick={signOut}>Sign out</StyledMenuItemLabel>
            </StyledMenuItemAction>
          </StyledMenuItem> 
      </StyledMenuItemWrapper>
    </StyledMenu>
  )
}

export default ProfileMenuItem