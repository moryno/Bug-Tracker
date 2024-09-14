import { dashCardType } from '_constants'
import Card from './components/Card'
import { StyledHomeTopContainer, StyledHomeBottomContainer, StyledHandWave, StyledHomeContainer, StyledUserAvatar, StyledHomeHeaderContainer, StyledHomeHeaderInfoContainer, StyledHomeHeaderInfoWrapper, StyledHomeHeaderInfoTitle, StyledHomeHeaderWelcomeText, StyledHomeChartSections, StyledHomeCardContainers } from './index.styled'

const Home = () => {
  return (
    <StyledHomeContainer>
      <StyledHomeTopContainer>
        <StyledHomeHeaderContainer>
          <StyledHomeHeaderInfoContainer>
           <StyledUserAvatar src={"/img/noavatar.jpg"} />
           <StyledHomeHeaderInfoWrapper>
            <StyledHomeHeaderInfoTitle>Hello Diana! <StyledHandWave /></StyledHomeHeaderInfoTitle>
            <StyledHomeHeaderWelcomeText>We hope you're having a great day.</StyledHomeHeaderWelcomeText>
           </StyledHomeHeaderInfoWrapper>
          </StyledHomeHeaderInfoContainer>
          <article></article>
        </StyledHomeHeaderContainer>
      </StyledHomeTopContainer>
      <StyledHomeBottomContainer>
      <StyledHomeChartSections>
        <StyledHomeCardContainers>
          <Card title={dashCardType.activeProjects} count={10} />
          <Card title={dashCardType.completedProjects} count={10} />
          <Card title={dashCardType.openTickets} count={10} />
          <Card title={dashCardType.unassignedTickets} count={10} />
          <Card title={dashCardType.teamMembers} count={10} />
        </StyledHomeCardContainers>
      </StyledHomeChartSections>
      <StyledHomeChartSections>Middle</StyledHomeChartSections>
      <StyledHomeChartSections>Bottom</StyledHomeChartSections>
      <StyledHomeChartSections>Bottom Bottom</StyledHomeChartSections>
      </StyledHomeBottomContainer>
    </StyledHomeContainer>
  )
}

export default Home