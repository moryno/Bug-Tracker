import { StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper } from 'pages/home/index.styled';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StyledBugChartCardWrapper } from '../index.styled';

const TicketsPerProject = ({ bugPerProjectCounts } : { bugPerProjectCounts : any[]}) => {
    const formattedStatusCount = bugPerProjectCounts?.map((item) => {
        const [name, value] = Object.entries(item)[0]; 
        return { name, value };
    });

  return (
    <StyledBugChartCardWrapper>
      <StyledChartCardHeaderWrapper>
      <StyledChartCardHeaderTitle>Tickets Per Project</StyledChartCardHeaderTitle>
    </StyledChartCardHeaderWrapper> 
    <ResponsiveContainer height="90%">
      <PieChart>
        <Pie
          data={formattedStatusCount}
          cx={"50%"}
          cy={"50%"}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        > 
        {formattedStatusCount.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />

      </PieChart>
    </ResponsiveContainer>
 </StyledBugChartCardWrapper>
  )
}
const COLORS = [ '#2CC8BA', '#08AEEA','#FFBB28', '#EF476F'];
export default TicketsPerProject