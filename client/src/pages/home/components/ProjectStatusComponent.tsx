import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledChartCardWrapper } from '../index.styled';
import { useNavigate } from 'react-router-dom';
import { setParams } from '_helpers';
import { PROJECT_ROUTE } from '_constants';
import { useCallback } from 'react';

const ProjectStatusComponent = ({ projectStatus } : { projectStatus : any[]}) => {

  const formattedStatusCount = projectStatus.map((item) => {
    const [name, value] = Object.entries(item)[0]; 
    return { name, value };
  });
  const navigate = useNavigate();
  
  const handleClick = (e: any) => {
      if(e){
        if(e.name === "Active"){
          let url = setParams("isActive", "True");
          navigate(`${PROJECT_ROUTE}?${url}`)
        }else{
          let url = setParams("isActive", "False");
          navigate(`${PROJECT_ROUTE}?${url}`)
        }
      }
  }
  const handleNavigate = useCallback(() => {
    navigate(PROJECT_ROUTE)
  }, [navigate])

  return (
    <StyledChartCardWrapper>
       <StyledChartCardHeaderWrapper>
        <StyledChartCardHeaderTitle>Project Status</StyledChartCardHeaderTitle>
        <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
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

  const COLORS = ['#00C49F', '#FFBB28'];

export default ProjectStatusComponent