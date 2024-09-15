import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StyledDonughtCardHeaderImg, StyledDonughtCardHeaderTitle, StyledDonughtCardHeaderWrapper, StyledDonughtCardWrapper } from '../index.styled';

const TicketByPriorityChart = () => {
  return (
    <StyledDonughtCardWrapper>
    <StyledDonughtCardHeaderWrapper>
     <StyledDonughtCardHeaderTitle>Tickets By Priority</StyledDonughtCardHeaderTitle>
     <StyledDonughtCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
   </StyledDonughtCardHeaderWrapper> 
   <ResponsiveContainer height="90%">
     <PieChart>
       <Pie
         data={data}
         cx={"50%"}
         cy={"50%"}
         labelLine={false}
         outerRadius={80}
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
    { name: 'Minor', value: 400 },
    { name: 'Major', value: 300 },
    { name: 'Critical', value: 200 },
    { name: 'Show Stopper', value: 100 },
  ];

  const COLORS = [ '#2CC8BA', '#08AEEA','#FFBB28', '#EF476F'];
export default TicketByPriorityChart