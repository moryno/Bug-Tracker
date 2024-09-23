import { StyledTable } from '_lib';
import { StyledChartCardHeaderImg, StyledChartCardHeaderTitle, StyledChartCardHeaderWrapper, StyledMiddleChartCardWrapper } from '../index.styled';
import { useGetAll } from '_hooks';
import { ProjectService } from '_services';
import { DomianEnum } from '_constants';
import { topProjectColumns } from './columns';

const TopProjectsComponent = () => {
    const { isLoading, error, data } = useGetAll(ProjectService.getProjects, DomianEnum.PROJECTS);

  return (
    <StyledMiddleChartCardWrapper>
     <StyledChartCardHeaderWrapper className='mb-2'>
      <StyledChartCardHeaderTitle>Projects</StyledChartCardHeaderTitle>
       <StyledChartCardHeaderImg src="/img/moreDark.png" alt="this is an elipses" />
     </StyledChartCardHeaderWrapper> 
          <StyledTable 
           loading={isLoading} 
           pagination={false}
           dataSource={data?.data || []} 
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