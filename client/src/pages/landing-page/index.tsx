import { Space } from "antd"
import { 
  StyledLandingPageInfoContainer, 
  StyledLandingPageInfoHighlight, 
  StyledLandingPageInfoImage, 
  StyledLandingPageInfoSubTitle, 
  StyledLandingPageInfoTitle 
} from "./index.styled"
import { AppDemoLogin, ContainerButton } from "_lib"
import { useNavigate } from "react-router-dom";
import { REGISTER_ROUTE } from "_constants";
import { useModal } from "_hooks";

const LandingPage = () => {
  const navigate = useNavigate();
  const { open, toggle } = useModal();

  const onNavigate = (where: string) => {
    if(where === "register"){
          navigate(REGISTER_ROUTE);
      }else{
        toggle();
      }
  }

  return (
 <StyledLandingPageInfoContainer>
    <StyledLandingPageInfoTitle>
      <div>
        Track <StyledLandingPageInfoHighlight variant="danger">Bugs</StyledLandingPageInfoHighlight>
      </div>
      <div>
        Manage <StyledLandingPageInfoHighlight variant="success">Projects</StyledLandingPageInfoHighlight>
      </div>
    </StyledLandingPageInfoTitle>

    <StyledLandingPageInfoSubTitle>
    Unleash the power of seamless project tracking with BugTracker! Streamline bug management and elevate collaboration with a tool designed for clarity, efficiency, and results.
    </StyledLandingPageInfoSubTitle>

    <Space>
      <ContainerButton title="Demo" size="large" color="#08AEEA" onClick={() => onNavigate("demo")} />
      <ContainerButton title="Get Started" size="large" color="#2CC8BA" onClick={() => onNavigate("register")} />
    </Space>

    <StyledLandingPageInfoImage src="/img/hero-logo.png" alt="Bugscape" />
    {open &&
      <AppDemoLogin open={open} onClose={toggle} />
      }
  </StyledLandingPageInfoContainer>
  )
}

export default LandingPage