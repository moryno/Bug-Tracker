import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledMiddleChartCardWrapper } from '../index.styled';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResolvedBugsComponent = () => {
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
          data={data}
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
const data = [
    {
      name: 'Jan',
      resolved: 4000,
      submitted: 2400,
    },
    {
      name: 'Feb',
      resolved: 3000,
      submitted: 1398,
    },
    {
      name: 'Mar',
      resolved: 2000,
      submitted: 9800,
    },
    {
      name: 'April',
      resolved: 2780,
      submitted: 3908,
    },
    {
      name: 'May',
      resolved: 1890,
      submitted: 4800,
    },
    {
      name: 'Jun',
      resolved: 2390,
      submitted: 3800,
    },
    {
      name: 'Jul',
      resolved: 4300,
      submitted: 3490,
    },
    {
      name: 'Aug',
      resolved: 3490,
      submitted: 4300,
    },
    {
      name: 'Sep',
      resolved: 2780,
      submitted: 3908,
    },
    {
      name: 'Oct',
      resolved: 4300,
      submitted: 4800,
    },
    {
      name: 'Nov',
      resolved: 2100,
      submitted: 2400,
    },
    {
      name: 'Dec',
      resolved: 4300,
      submitted: 2400,
    },
  ];
export default ResolvedBugsComponent