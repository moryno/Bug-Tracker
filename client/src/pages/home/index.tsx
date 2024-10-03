import { dashCardType } from '_constants'
import Card from './components/Card'
import { 
  StyledHomeTopContainer, 
  StyledHomeBottomContainer, 
  StyledHandWave, 
  StyledHomeContainer, 
  StyledUserAvatar, 
  StyledHomeHeaderContainer, 
  StyledHomeHeaderInfoContainer, 
  StyledHomeHeaderInfoWrapper, 
  StyledHomeHeaderInfoTitle, 
  StyledHomeHeaderWelcomeText, 
  StyledHomeChartSections, 
  StyledHomeCardContainers, 
  StyledHomeChartRightSections, 
  StyledHomeChartLeftSections 
} from './index.styled'
import ProjectStatusComponent from './components/ProjectStatusComponent'
import TicketByPriorityChart from './components/TicketByPriorityChart'
import WorkItemsComponent from './components/WorkItemsComponent'
import TopProjectsComponent from './components/TopProjectsComponent'
import { TeamMembersComponent } from './components/TeamMembersComponent'
import ResolvedBugsComponent from './components/ResolvedBugsComponent'
import NotificationComponent from './components/NotificationComponent'
import { useAuthUser, useGetDashboardStats } from '_hooks'

const Home = () => {
  const { user } = useAuthUser();
  const dashboardStats = useGetDashboardStats();
  if (dashboardStats.isLoading) {
    return <div>Hello...</div>;
  }

  if (dashboardStats.error) {
    return <div>Error loading data</div>;
  }

  const [countStats, gridStats] = dashboardStats?.data || [];
  const { dashboardCount, weeklyBugDtos } = countStats?.data
  const { topProjects, users, resolvedSubmittedBugs } = gridStats?.data


  return (
    <StyledHomeContainer>
      <StyledHomeTopContainer>
        <StyledHomeHeaderContainer>
          <StyledHomeHeaderInfoContainer>
           <StyledUserAvatar src={user?.image || "/img/noavatar.jpg"} />
           <StyledHomeHeaderInfoWrapper>
            <StyledHomeHeaderInfoTitle>{ user?.fullName }! <StyledHandWave /></StyledHomeHeaderInfoTitle>
            <StyledHomeHeaderWelcomeText>We hope you're having a great day.</StyledHomeHeaderWelcomeText>
           </StyledHomeHeaderInfoWrapper>
          </StyledHomeHeaderInfoContainer>
          <article></article>
        </StyledHomeHeaderContainer>
      </StyledHomeTopContainer>
      <StyledHomeBottomContainer>
        <StyledHomeCardContainers>
          <Card title={dashCardType.activeProjects} count={dashboardCount?.activeProjectsCount[0]?.["Active"]} />
          <Card title={dashCardType.completedProjects} count={dashboardCount?.completedProjectsCount[0]?.["CompletedProjects"]} />
          <Card title={dashCardType.openTickets} count={dashboardCount?.openBugsCount[0]?.["OpenBugs"]} />
          <Card title={dashCardType.unassignedTickets} count={dashboardCount?.unassignedBugsCount[0]?.["UnassignedBugs"]} />
          <Card title={dashCardType.teamMembers} count={dashboardCount?.teamCount[0]?.["teamMembers"]} />
        </StyledHomeCardContainers>
      <StyledHomeChartSections>
        <StyledHomeChartRightSections>
          <ProjectStatusComponent projectStatus={dashboardCount?.projectStatusCount} />
          <TicketByPriorityChart bugSeverityCounts={dashboardCount?.bugSeverityCounts} />
        </StyledHomeChartRightSections>
        <StyledHomeChartLeftSections>
          <WorkItemsComponent workItems={weeklyBugDtos} />
        </StyledHomeChartLeftSections>
      </StyledHomeChartSections>
      <StyledHomeChartSections>
      <StyledHomeChartRightSections>
          <TopProjectsComponent projects={topProjects} />
        </StyledHomeChartRightSections>
        <StyledHomeChartLeftSections>
          <TeamMembersComponent team={users} />
        </StyledHomeChartLeftSections>
      </StyledHomeChartSections>
      <StyledHomeChartSections>
        <StyledHomeChartRightSections>
          <ResolvedBugsComponent resolvedSubmittedBugs={resolvedSubmittedBugs} />
        </StyledHomeChartRightSections>
        <StyledHomeChartLeftSections>
          <NotificationComponent />
        </StyledHomeChartLeftSections>
      </StyledHomeChartSections>
      </StyledHomeBottomContainer>
    </StyledHomeContainer>
  )
}

export default Home