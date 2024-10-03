import { StyledTable } from '_lib';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledMiddleChartCardWrapper } from '../index.styled';
import { topProjectColumns } from './columns';

const TopProjectsComponent = ({ projects } : { projects : any[]}) => {

  return (
    <StyledMiddleChartCardWrapper>
     <StyledChartCardHeaderWrapper className='mb-2'>
      <StyledChartCardHeaderTitle>Projects</StyledChartCardHeaderTitle>
       <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
     </StyledChartCardHeaderWrapper> 
          <StyledTable 
           pagination={false}
           dataSource={projects || []} 
           columns={topProjectColumns} 
           rowKey={(record: any) => record?.id}
           onRow={(record: any, rowIndex) => {
            return {
            //   onDoubleClick: (event) => onRowDoubleClick(record),
              onContextMenu: (event) => {},
            };
           }}
          />
    </StyledMiddleChartCardWrapper>
  )
}

export default TopProjectsComponent