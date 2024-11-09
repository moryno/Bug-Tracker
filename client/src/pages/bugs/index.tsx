import { useCallback, useEffect, useMemo, useState } from 'react'
import {  
  ContainerTooltip, 
  StyledDeleteIcon, 
  StyledFilterIcon, 
  StyledIconWrapper, 
  StyledNewIcon, 
  StyledTable, 
  StyledTableCardWrapper 
} from '_lib'
import BugForm from './components/BugForm'
import { DomianEnum } from '_constants'
import { BugService } from '_services'
import { bugColumns } from './columns'
import { IBug } from 'interfaces'
import { useDeleteRecord, useGetAll, useGetAllParams, useQuery } from '_hooks'
import {   
  StyledBottomContainer,
  StyledGroupFilterLeftWrapper,
  StyledGroupFilterRightWrapper,
  StyledGroupFilterWrapper,
  StyledGroupSubTitle,
  StyledGroupTableTitle,
  StyledGroupTitle,
  StyledGroupTitleWrapper,
  StyledPageCard,
 } from '_lib/index.styled'
import { message, Space, TablePaginationConfig } from 'antd'
import TicketsPerProject from 'pages/bugs/components/TicketsPerProject'
import TicketStatusProgressComponent from './components/TicketStatusProgressComponent'
import { StyledGroupChartContainer } from './index.styled'
import BugFilter, { BugFilterValues } from './components/BugFilter'

const Bugs = () => {
  const bugStatus = useQuery().get("bugStatus");
  const unAssigneed = useQuery().get("unAssigneed");
  const severity = useQuery().get("severity");
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [searchParams, setSearchParams] = useState({
    ...defaultParams,
    bugStatus: bugStatus || null,
    unAssigneed: unAssigneed || null,
    severity: severity || null,
  });
  const { getBugs,getBug, deleteBug, getBugsStatus} = BugService
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IBug | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<IBug[]  | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetAllParams(getBugs, DomianEnum.BUGS, searchParams);
  const { data: bugStatsData } = useGetAll(getBugsStatus, `${DomianEnum.BUGS}-status`);
  const deleteRecord = useDeleteRecord(deleteBug, DomianEnum.BUGS);
  const [pagination, setPagination] = useState({
      ...defaultParams,
       totalPages: 1,
       totalElements: 1
});

useEffect(() => {
  if(!isLoading && data.data){
    const { pagination } = data.data;
    setPagination({
      totalPages: pagination?.totalPages,
      pageSize: pagination?.itemsPerPage,
      pageNumber: pagination?.currentPage,
      totalElements: pagination?.totalItems,
    });
    setOpenFilter(false);
  }
}, [data?.data, isLoading])

  const handleDelete = useCallback(async () => {
    if(!selectedRecords) return message.warning("Please select a record to delete");
    const recordId  = selectedRecords[0].id!
    
    try {
      await deleteRecord.mutateAsync(recordId)
    } catch (error) {
      console.log(error);
    }
  }, [deleteRecord, selectedRecords]);


  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);
  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
    setStatusMode("CreateMode")
  }, []);

  const onRowDoubleClick = useCallback(async (record : IBug) => {
    try {
      const { data } = await getBug(record.id!);
      setSelectedRecord(data);
      setStatusMode("EditMode");
      showDrawer();
    } catch (error) {
      console.log(error);
      setOpen(false);
      setStatusMode("CreateMode");
    }
  }, [getBug, showDrawer]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: unknown[]) => {
      setSelectedRecords(selectedRows as IBug[])
    },
    getCheckboxProps: (record: unknown) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      // name: record.name,
    }),
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10, total = 1 } = pagination;
    const page = {
      pageNumber: current,
      pageSize
    }
    setSearchParams(prev => ({
      ...prev,
      ...page!
    }));
    setPagination(prev => ({
      ...prev,
      totalElements: total,
      ...page
    }))
  };
  const onFilterChange = useCallback(( filterValues: BugFilterValues) => {
    const filterParams = {
      ...filterValues,
      bugName: filterValues.bugName || null,
      projectId: filterValues.projectId || null,
      severity: filterValues.severity || null,
      classification: filterValues.classification || null,
      assinee: filterValues.assinee || null,
      bugStatus: filterValues?.bugStatus|| null,
      dueDate: filterValues?.dueDate?.format('YYYY-MM-DD') || null,
    };
    setSearchParams(prev => ({
      ...searchParams,
      ...filterParams
    }));
  } , [searchParams])

  return (
    <StyledPageCard>
        <StyledGroupTitleWrapper>
          <StyledGroupTitle>Bugs</StyledGroupTitle>
          <StyledGroupSubTitle>View, create, and manage bugs for ongoing projects. Track their status, assign team members, set priorities, and ensure issues are resolved efficiently. Stay on top of updates and progress with a detailed overview of each bug.</StyledGroupSubTitle>
        </StyledGroupTitleWrapper>
        <StyledGroupChartContainer>
          <TicketsPerProject bugPerProjectCounts={bugStatsData?.data?.bugsPerProject || [] } />
          <TicketStatusProgressComponent title="Open" count={bugStatsData?.data?.bugsStatus["Open"]} />
          <TicketStatusProgressComponent title="InProgress" count={bugStatsData?.data?.bugsStatus["InProgress"]} />
          <TicketStatusProgressComponent title="Completed" count={bugStatsData?.data?.bugsStatus["Completed"]} />
        </StyledGroupChartContainer>
        <StyledGroupFilterWrapper>
        <StyledGroupFilterLeftWrapper>
          <StyledGroupTableTitle>All Bugs ({pagination?.totalElements || 0  })</StyledGroupTableTitle>
        </StyledGroupFilterLeftWrapper>
        <StyledGroupFilterRightWrapper>
        <Space wrap>
          <ContainerTooltip title="New" color="#12CC1B">
            <StyledIconWrapper><StyledNewIcon onClick={showDrawer} /></StyledIconWrapper>
          </ContainerTooltip>
          <ContainerTooltip title="Delete record" color="#f50">
          <StyledIconWrapper><StyledDeleteIcon onClick={handleDelete} /></StyledIconWrapper>
          </ContainerTooltip>
          <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledIconWrapper><StyledFilterIcon onClick={showFilter} /></StyledIconWrapper>
          </ContainerTooltip>
        </Space>
        </StyledGroupFilterRightWrapper>
      </StyledGroupFilterWrapper>
      <StyledBottomContainer>
        <StyledTableCardWrapper>
          <StyledTable 
           loading={isLoading} 
           dataSource={data?.data?.data || []} 
           columns={bugColumns} 
           rowKey={(record: any) => record?.id}
           scroll={{ x: 2000 }}
           rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
           onRow={(record: any, rowIndex) => {
            return {
              onDoubleClick: (event) => onRowDoubleClick(record),
              onContextMenu: (event) => {},
            };
           }}
           pagination = {{
            current: pagination.pageNumber,
            pageSize: pagination.pageSize,
            total: pagination.totalElements
           }}
           onChange={(pagination) => handleTableChange(pagination)}
          />
        </StyledTableCardWrapper>
        {open &&
          <BugForm 
            key={statusMode && selectedRecord?.id}
            open={open} 
            onClose={onClose} 
            editedRecord={selectedRecord} 
            statusMode={statusMode}
           />
         }
        {openFilter &&
          <BugFilter 
            open={openFilter} 
            onClose={onCloseFilter} 
            onFilterChange={onFilterChange}
           />
         }
      </StyledBottomContainer>
    </StyledPageCard>
  )
}

export default Bugs
