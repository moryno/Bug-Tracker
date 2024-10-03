import { StyledChartCardWrapper } from 'pages/home/index.styled';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Circle, PercentageText, ProgressDetailContainer, ProgressDetailWrapper, RatingDescription, RatingValue, StyledPerfomanceChartDetails, StyledProfileChartTitle } from '../index.styled';

const Performance = ({ performance, fullName} : { performance: any[], fullName: string },) => {
  const progressCount = performance?.map((item, i) => {
    const fills = ["#00C49F", "#FFBB28"]
    const [name, value] = Object.entries(item)[0]; 
    return { name, value: value as number, fill: fills[i] };
  });

  return (
    <StyledChartCardWrapper className='scrollbar-hide'>
         <StyledProfileChartTitle>{`${fullName}'s Progress`}</StyledProfileChartTitle>
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                dataKey="value"
                startAngle={180}
                endAngle={0}
                data={progressCount}
                cx="50%"
                cy="50%"
                innerRadius={70}
                fill="#8884d8"
            />
            </PieChart>
      </ResponsiveContainer>
      <StyledPerfomanceChartDetails>
        <RatingValue>{progressCount?.length > 0 && progressCount[0].value}</RatingValue>
        <RatingDescription>of {progressCount?.length > 0 && progressCount[0].value + progressCount[0].value} ATS</RatingDescription>
      </StyledPerfomanceChartDetails>
      <ProgressDetailContainer>
        <ProgressDetailWrapper>
            <Circle color='#00C49F' />
            <PercentageText>Completed</PercentageText>
        </ProgressDetailWrapper>
        <ProgressDetailWrapper>
            <Circle color='#FFBB28' />
            <PercentageText>InComplete</PercentageText>
        </ProgressDetailWrapper>
      </ProgressDetailContainer>
    </StyledChartCardWrapper>
  )
}

export default Performance