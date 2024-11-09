import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StyledChartCardHeaderImg, 
  StyledChartCardHeaderTitle, 
  StyledChartCardHeaderWrapper,
  StyledChartCardWrapper 
  } from '../index.styled';
import { setParams } from '_helpers';
import { BUG_ROUTE } from '_constants';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const TicketByPriorityChart = ({ bugSeverityCounts } : { bugSeverityCounts : any[]}) => {

  const formattedStatusCount = bugSeverityCounts?.map((item) => {
    const [name, value] = Object.entries(item)[0]; 
    return { name, value };
  });
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    if(e){
      if(e.name === "Minor"){
        let url = setParams("severity", "Minor");
        navigate(`${BUG_ROUTE}?${url}`)
      }
      else if(e.name === "Major"){
         const url = setParams("severity", "Major");
        navigate(`${BUG_ROUTE}?${url}`)
      }
      else if(e.name === "Critical"){
         const url = setParams("severity", "Critical");
        navigate(`${BUG_ROUTE}?${url}`)
      }
      else if(e.name === "ShowStopper"){
         const url = setParams("severity", "ShowStopper");
        navigate(`${BUG_ROUTE}?${url}`)
      }
      else{
        navigate(BUG_ROUTE)
      }
      
    }
}

const handleNavigate = useCallback(() => {
  navigate(BUG_ROUTE)
}, [navigate])

  return (
  <StyledChartCardWrapper>
      <StyledChartCardHeaderWrapper>
      <StyledChartCardHeaderTitle>Tickets By Priority</StyledChartCardHeaderTitle>
      <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
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
          onClick={handleClick}
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


  const COLORS = [ '#2CC8BA', '#08AEEA','#FFBB28', '#EF476F'];
export default TicketByPriorityChart