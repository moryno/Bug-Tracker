import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StyledDonughtCardHeaderImg, StyledDonughtCardHeaderTitle, StyledDonughtCardHeaderWrapper, StyledDonughtCardWrapper } from '../index.styled';

const ProjectStatusComponent = () => {
  return (
    <StyledDonughtCardWrapper>
       <StyledDonughtCardHeaderWrapper>
        <StyledDonughtCardHeaderTitle>Project Status</StyledDonughtCardHeaderTitle>
        <StyledDonughtCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
      </StyledDonughtCardHeaderWrapper> 
      <ResponsiveContainer height="90%">
        <PieChart>
          <Pie
            data={data}
            cx={"50%"}
            cy={"50%"}
            innerRadius={"50%"}
            outerRadius={"70%"}
            fill="#8884d8"
            dataKey="value"
          > 
          {data.map((entry, index) => (
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
    </StyledDonughtCardWrapper>
  )
}
const data = [
    { name: 'Active', value: 400 },
    { name: 'InActive', value: 300 },
  ];
  const COLORS = ['#00C49F', '#FFBB28'];

export default ProjectStatusComponent