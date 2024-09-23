import { StyledChartCardWrapper } from 'pages/home/index.styled';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Circle, PercentageText, ProgressDetailContainer, ProgressDetailWrapper, RatingDescription, RatingValue, StyledPerfomanceChartDetails, StyledProfileChartTitle } from '../index.styled';

const Performance = () => {
  return (
    <StyledChartCardWrapper className='scrollbar-hide'>
         <StyledProfileChartTitle>Amelia's Progress</StyledProfileChartTitle>
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                fill="#8884d8"
            />
            </PieChart>
      </ResponsiveContainer>
      <StyledPerfomanceChartDetails>
        <RatingValue>9.2</RatingValue>
        <RatingDescription>of 10 STS</RatingDescription>
      </StyledPerfomanceChartDetails>
      <ProgressDetailContainer>
        <ProgressDetailWrapper>
            <Circle color='green' />
            <PercentageText>Completed</PercentageText>
        </ProgressDetailWrapper>
        <ProgressDetailWrapper>
            <Circle color='yellow' />
            <PercentageText>InComplete</PercentageText>
        </ProgressDetailWrapper>
      </ProgressDetailContainer>
    </StyledChartCardWrapper>
  )
}
const data = [
    { name: 'Completed', value: 92, fill: "#00C49F" },
    { name: 'InComplete', value: 8, fill: "#FFBB28" },
  ];
export default Performance