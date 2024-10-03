import { getMonthName } from '_helpers';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledMiddleChartCardWrapper } from '../index.styled';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResolvedBugsComponent = ({ resolvedSubmittedBugs } : { resolvedSubmittedBugs : any[]}) => {

  const transformedBugs = resolvedSubmittedBugs?.map(bug => ({
    ...bug,
    name: getMonthName(bug.name)
}));

  return (
    <StyledMiddleChartCardWrapper>
    <StyledChartCardHeaderWrapper>
     <StyledChartCardHeaderTitle>Submitted vs Resolved Bugs</StyledChartCardHeaderTitle>
     <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
   </StyledChartCardHeaderWrapper> 
   <ResponsiveContainer height="90%">
        <LineChart
          width={500}
          height={300}
          data={transformedBugs}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd"  />
          <XAxis dataKey="name" axisLine={false}  tick={{ fill: "#d1d5db"}} tickMargin={10} tickLine={false} />
          <YAxis axisLine={false}  tick={{ fill: "#d1d5db"}} tickMargin={10} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor:"lightgray"}} />
          <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingBottom: "30px", paddingTop: "10px"}} />
          <Line type="monotone" dataKey="submitted" stroke="#08AEEA" strokeWidth={3} />
          <Line type="monotone" dataKey="resolved" stroke="#2CC8BA" strokeWidth={3} />
        </LineChart>
   </ResponsiveContainer>
 </StyledMiddleChartCardWrapper>
  )
}

export default ResolvedBugsComponent