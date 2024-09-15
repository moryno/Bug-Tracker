import { dashCardType } from '_constants'
import Card from './components/Card'
import { StyledHomeTopContainer, StyledHomeBottomContainer, StyledHandWave, StyledHomeContainer, StyledUserAvatar, StyledHomeHeaderContainer, StyledHomeHeaderInfoContainer, StyledHomeHeaderInfoWrapper, StyledHomeHeaderInfoTitle, StyledHomeHeaderWelcomeText, StyledHomeChartSections, StyledHomeCardContainers, StyledHomeChartRightSections, StyledHomeChartLeftSections } from './index.styled'
import ProjectStatusComponent from './components/ProjectStatusComponent'
import TicketByPriorityChart from './components/TicketByPriorityChart'
import WorkItemsComponent from './components/WorkItemsComponent'

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
        <StyledHomeCardContainers>
          <Card title={dashCardType.activeProjects} count={10} />
          <Card title={dashCardType.completedProjects} count={10} />
          <Card title={dashCardType.openTickets} count={10} />
          <Card title={dashCardType.unassignedTickets} count={10} />
          <Card title={dashCardType.teamMembers} count={10} />
        </StyledHomeCardContainers>
      <StyledHomeChartSections>
        <StyledHomeChartRightSections>
          <ProjectStatusComponent />
          <TicketByPriorityChart />
        </StyledHomeChartRightSections>
        <StyledHomeChartLeftSections>
          <WorkItemsComponent />
        </StyledHomeChartLeftSections>
      </StyledHomeChartSections>
      <StyledHomeChartSections>Bottom</StyledHomeChartSections>
      <StyledHomeChartSections>Bottom Bottom</StyledHomeChartSections>
      </StyledHomeBottomContainer>
    </StyledHomeContainer>
  )
}

export default Home