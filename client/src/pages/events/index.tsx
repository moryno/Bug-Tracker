import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllParams } from "_hooks";
import { IEvent } from "interfaces";
import {  ContainerTooltip,  StyledFilterIcon, StyledIconWrapper, StyledNewIcon, StyledPageCard, StyledTable, StyledTableCardWrapper } from "_lib";
import {  
   StyledBottomContainer,
  StyledGroupFilterLeftWrapper,
  StyledGroupFilterWrapper,
  StyledGroupSubTitle,
  StyledGroupTableTitle,
  StyledGroupTitle,
  StyledGroupTitleWrapper
 } from "_lib/index.styled";
import { EventService } from "_services";
import { DomianEnum } from "_constants";
import SchedulerForm from "pages/calendar/components/SchedulerForm";
import { eventColumns } from "./components/columns";
import { Space, TablePaginationConfig } from "antd";
import EventFilter, { EventFilterValues } from "./components/EventFilters";


const EventPage = () => {
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [searchParams, setSearchParams] = useState(defaultParams);
  const { getAllEvents, getEventDetails } = EventService
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IEvent | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const [showDetails, setShowDetails] = useState(false);
  const { isLoading, data } = useGetAllParams(getAllEvents, DomianEnum.EVENT, searchParams);
  const [pagination, setPagination] = useState({
    ...defaultParams,
     totalPages: 1,
     totalElements: 1
});

useEffect(() => {
  if(!isLoading && data.data){
    const { pagination } = data?.data;
    setPagination({
      totalPages: pagination?.totalPages,
      pageSize: pagination?.itemsPerPage,
      pageNumber: pagination?.currentPage,
      totalElements: pagination?.totalItems,
    })
  }
}, [data?.data, isLoading])

  const showDrawer = useCallback(() => {
      setOpen(true);
  }, []);

  const refetchEvent = useCallback(() => {
    // refetch()
  }, [])

  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
    setStatusMode("CreateMode");
    setShowDetails(false);
  }, []);
  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const onRowDoubleClick = useCallback(async (record : IEvent) => {
    try {
      const { data } = await getEventDetails(record.id!);
      setSelectedRecord(data);
      setStatusMode("EditMode");
      setShowDetails(true);
      showDrawer();
    } catch (error) {
      console.log(error);
      setOpen(false);
      setStatusMode("CreateMode");
    }
  }, [getEventDetails, showDrawer]);

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

  const onFilterChange = useCallback(( filterValues: EventFilterValues) => {
    const filterParams = {
      ...filterValues,
      title: filterValues.title || null,
      location: filterValues.location || null,
      startDate: filterValues?.startDate?.format('YYYY-MM-DD HH:mm:ss') || null,
      endDate: filterValues?.endDate?.format('YYYY-MM-DD HH:mm:ss') || null,
    };
    setSearchParams(prev => ({
      ...searchParams,
      ...filterParams
    }));
  } , [searchParams])

  return (
    <StyledPageCard>
    <StyledGroupTitleWrapper>
      <StyledGroupTitle>Events</StyledGroupTitle>
      <StyledGroupSubTitle>View, schedule, and interact with events. This page allows you to create and manage events, add comments or feedback, and view event details. Users can track upcoming events and collaborate on planning and participation.</StyledGroupSubTitle>
    </StyledGroupTitleWrapper>
    <StyledGroupFilterWrapper>
    <StyledGroupFilterLeftWrapper>
      <StyledGroupTableTitle>All Events ({ pagination?.totalElements || 0 })</StyledGroupTableTitle>
    </StyledGroupFilterLeftWrapper>
    <Space wrap>
          <ContainerTooltip title="New" color="#12CC1B">
            <StyledIconWrapper><StyledNewIcon onClick={showDrawer} /></StyledIconWrapper>
          </ContainerTooltip>
          <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledIconWrapper><StyledFilterIcon onClick={showFilter} /></StyledIconWrapper>
          </ContainerTooltip>
        </Space>
  </StyledGroupFilterWrapper>
  <StyledBottomContainer>
    <StyledTableCardWrapper>
      <StyledTable 
       loading={isLoading} 
       dataSource={data?.data?.data || []} 
       columns={eventColumns} 
       rowKey={(record: any) => record?.id}
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
      <SchedulerForm 
        key={statusMode && selectedRecord?.id}
        open={open} 
        onClose={onClose} 
        refetchEvent={refetchEvent}
        editedRecord={selectedRecord} 
        statusMode={statusMode}
        showDetails={showDetails}
       />
     }
    {openFilter &&
          <EventFilter 
            open={openFilter} 
            onClose={onCloseFilter} 
            onFilterChange={onFilterChange}
           />
    }
  </StyledBottomContainer>
</StyledPageCard>
  )
}

export default EventPage