import { Space } from "antd"
import { StyledLandingPageBackgroundBlur, StyledLandingPageBackgroundContainer, StyledLandingPageNavbar, StyledLandingPagePolygon } from "../index.styled"
import { ReactComponent as BugTrackerLogo } from "_assets/images/bug.svg"
import { ContainerButton } from "_lib"
import { useLocation, useNavigate } from "react-router-dom"
import { getIsLandingPageRoute } from "_helpers"
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "_constants"

const LandingPageNavbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isLandingPage = getIsLandingPageRoute(pathname);

    const onNavigate = (where: string) => {
        if(where === "home"){
            navigate(LANDING_PAGE_ROUTE)
        }
        else if(where === "register"){
            navigate(REGISTER_ROUTE);
        }else{
            navigate(LOGIN_ROUTE);
        }
    }
    
  return (
    <>
  <StyledLandingPageNavbar>
      <BugTrackerLogo style={{ cursor: "pointer" }} width={144} height={24} onClick={() => onNavigate("home")} />
      {isLandingPage &&
        <Space>
            <ContainerButton title="Register" size="middle" color="#2CC8BA" onClick={() => onNavigate("register")} />
            <ContainerButton title="Sign In" size="middle" color="#08AEEA" onClick={() => onNavigate("login")} />
        </Space>
      }
  </StyledLandingPageNavbar>
   <StyledLandingPageBackgroundContainer>
    <StyledLandingPageBackgroundBlur>
        <StyledLandingPagePolygon />
    </StyledLandingPageBackgroundBlur>
  </StyledLandingPageBackgroundContainer>
  </>
  )
}

export default LandingPageNavbar