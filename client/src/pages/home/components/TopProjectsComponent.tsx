import { StyledTable } from '_lib';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledMiddleChartCardWrapper } from '../index.styled';
import { topProjectColumns } from './columns';
import { useCallback } from 'react';
import { IProject } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { PROJECT_ROUTE } from '_constants';

const TopProjectsComponent = ({ projects } : { projects : IProject[]}) => {
  const navigate = useNavigate();

  const onRowClick = useCallback((record: IProject) => {
    if(record){
      navigate(`${PROJECT_ROUTE}/${record.id}`)
    }
  }, [navigate]);

  const handleNavigate = useCallback(() => {
    navigate(PROJECT_ROUTE)
  }, [navigate])

  return (
    <StyledMiddleChartCardWrapper className='scrollbar-hide'>
     <StyledChartCardHeaderWrapper className='mb-2'>
      <StyledChartCardHeaderTitle>Projects</StyledChartCardHeaderTitle>
       <StyledChartCardHeaderImg onClick={handleNavigate} src="/img/moreDark.png" alt="this is an elipses" />
     </StyledChartCardHeaderWrapper> 
          <StyledTable 
           pagination={false}
           dataSource={projects || []} 
           columns={topProjectColumns} 
           rowKey={(record: any) => record?.id}
           onRow={(record: any, rowIndex) => {
            return {
              onClick: (event) => onRowClick(record),
            //   onDoubleClick: (event) => onRowDoubleClick(record),
              onContextMenu: (event) => {},
            };
           }}
          />
    </StyledMiddleChartCardWrapper>
  )
}

export default TopProjectsComponent