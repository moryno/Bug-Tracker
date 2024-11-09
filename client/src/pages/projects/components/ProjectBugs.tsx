import { DomianEnum } from "_constants";
import { useGetAllParams } from "_hooks";
import { ContainerTooltip, StyledFilterIcon, StyledIconWrapper, StyledTable, StyledTableCardWrapper } from "_lib";
import { BugService } from "_services";
import { TablePaginationConfig } from "antd";
import { bugColumns } from "pages/bugs/columns";
import BugFilter, { BugFilterValues } from "pages/bugs/components/BugFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyledFilterRightWrapper } from "../index.styled";


const ProjectBugs = ({ projectId } : { projectId: string | null}) => {
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [searchParams, setSearchParams] = useState({
    ...defaultParams,
    projectId
  });
  const [pagination, setPagination] = useState({
      ...defaultParams,
       totalPages: 1,
       totalElements: 1
  });
  const [openFilter, setOpenFilter] = useState(false);
  const { isLoading, isFetching, data:projectBugs } = useGetAllParams(BugService.getBugs, `${DomianEnum.BUGS}-projectbugs`, searchParams);

  useEffect(() => {
    if(!isLoading && !isFetching){
      const { pagination } = projectBugs?.data;
      setPagination({
        totalPages: pagination?.totalPages,
        pageSize: pagination?.itemsPerPage,
        pageNumber: pagination?.currentPage,
        totalElements: pagination?.totalItems,
      });
      setOpenFilter(false)
    }
  }, [projectBugs?.data, isFetching, isLoading])

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

  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const onFilterChange = useCallback(( filterValues: BugFilterValues) => {
    const filterParams = {
      ...filterValues,
      bugName: filterValues.bugName || null,
      projectId: projectId,
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
  } , [projectId, searchParams])

  
  return (
    <StyledTableCardWrapper>
      <StyledFilterRightWrapper>
          <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledFilterIcon onClick={showFilter} />
          </ContainerTooltip>
        </StyledFilterRightWrapper>
        <StyledTable 
        loading={isLoading} 
        dataSource={projectBugs?.data?.data || []} 
        columns={bugColumns} 
        rowKey={(record: any) => record?.id}
        scroll={{ x: 2000 }}
        onRow={(record: any, rowIndex) => {
        return {

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
        {openFilter &&
          <BugFilter 
            open={openFilter} 
            onClose={onCloseFilter} 
            onFilterChange={onFilterChange}
           />
         }
    </StyledTableCardWrapper>
  )
}

export default ProjectBugs