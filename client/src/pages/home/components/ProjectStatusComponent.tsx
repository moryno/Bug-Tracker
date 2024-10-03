import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledChartCardWrapper } from '../index.styled';

const ProjectStatusComponent = ({ projectStatus } : { projectStatus : any[]}) => {

  const formattedStatusCount = projectStatus.map((item) => {
    const [name, value] = Object.entries(item)[0]; 
    return { name, value };
  });

  return (
    <StyledChartCardWrapper>
       <StyledChartCardHeaderWrapper>
        <StyledChartCardHeaderTitle>Project Status</StyledChartCardHeaderTitle>
        <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
      </StyledChartCardHeaderWrapper> 
      <ResponsiveContainer height="90%">
        <PieChart>
          <Pie
            data={formattedStatusCount}
            cx={"50%"}
            cy={"50%"}
            innerRadius={"50%"}
            outerRadius={"70%"}
            fill="#8884d8"
            dataKey="value"
          > 
          {formattedStatusCount.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledChartCardWrapper>
  )
}

  const COLORS = ['#00C49F', '#FFBB28'];

export default ProjectStatusComponent