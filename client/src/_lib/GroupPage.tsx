import React, { useCallback, useEffect, useMemo, useState } from "react";
import { message, Space, TablePaginationConfig } from 'antd';
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
} from "./index.styled";
import { StyledDeleteIcon, StyledFilterIcon, StyledIconWrapper, StyledNewIcon, StyledTable, StyledTableCardWrapper } from "./StyledComponents";
import { useDeleteRecord,  useGetAllParams, useQuery } from "_hooks";
import { AnyObject } from "antd/es/_util/type";
import { IBug, IProject } from "interfaces";
import { AxiosResponse } from "axios";
import ProjectFilter, { ProjectFilterValues } from "pages/projects/components/ProjectFilter";
import ContainerTooltip from "./ContainerTooltip";
import { DomianEnum } from "_constants";

interface Iprops {
  title: string;
  FormComponent: React.FC<{ open: boolean; onClose: () => void; editedRecord: any; statusMode: string}>;
  columns: any[],
  getAllService: () => Promise<AxiosResponse<any, any>>,
  getDetailService: (id: string) => Promise<AxiosResponse<any, any>>,
  deleteService?: (id: string) => Promise<AxiosResponse<any, any>>,
  width?: number | string
}
type PageDetailsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};

const PAGE_DETAILS: PageDetailsType = {
  "Projects" : {
    title: "Project Management",
    description: "View, create, and manage projects. This page allows you to track project progress, assign tasks, and collaborate with team members."
  },
  "Roles": {
    title: "Role Management",
    description: "Manage user roles and permissions. This page allows you to create, edit, and delete roles, assign permissions, and ensure users have the appropriate access to resources."
  },
};

const GroupPage: React.FC<Iprops> = ({ 
  title, 
  FormComponent, 
  columns, 
  getAllService, 
  getDetailService, 
  deleteService,
  width
}) => {
  const projectStatus = useQuery().get("projectStatus");
  const isActive = useQuery().get("isActive");
  const defaultParams = useMemo(() => ({ pageNumber: 1, pageSize: 10 }), []);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    ...defaultParams,
    projectStatus: projectStatus || null,
    isActive: isActive || null
  });
  const [pagination, setPagination] = useState({
      ...defaultParams,
       totalPages: 1,
       totalElements: 1
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | IBug | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<IProject[] | IBug[] | AnyObject[] | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetAllParams(getAllService, title, searchParams);
  const deleteRecord = useDeleteRecord(deleteService, title);

  useEffect(() => {
    if(!isLoading && data.data){
      const { pagination } = data.data;
      setPagination({
        totalPages: pagination?.totalPages,
        pageSize: pagination?.itemsPerPage,
        pageNumber: pagination?.currentPage,
        totalElements: pagination?.totalItems,
      })
    }
  }, [data?.data, isLoading])

  const handleDelete = useCallback(async () => {
    if(!selectedRecords) return message.warning("Please select a record to delete");
    const recordId  = selectedRecords[0]?.id
    
    try {
      await deleteRecord.mutateAsync(recordId)
    } catch (error) {
      console.log(error);
    }
  }, [deleteRecord, selectedRecords]);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);
  const showFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
    setStatusMode("CreateMode")
  }, []);

  const onRowDoubleClick = useCallback(async (record : AnyObject) => {
    try {
      const { data } = await getDetailService(record.id);
      setSelectedRecord(data);
      setStatusMode("EditMode");
      showDrawer();
    } catch (error) {
      console.log(error);
      setOpen(false);
      setStatusMode("CreateMode");
    }
  }, [getDetailService, showDrawer]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: unknown[]) => {
      setSelectedRecords(selectedRows as AnyObject[])
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

  const onFilterChange = useCallback(( filterValues: ProjectFilterValues) => {
    const filterParams = {
      ...filterValues,
      projectName: filterValues.projectName || null,
      priority: filterValues.priority || null,
      currentStatus: filterValues.currentStatus || null,
      owner: filterValues.owner || null,
      startDate: filterValues?.startDate?.format('YYYY-MM-DD') || null,
      endDate: filterValues?.endDate?.format('YYYY-MM-DD') || null,
    };
    setSearchParams(prev => ({
      ...searchParams,
      ...filterParams
    }));
  } , [searchParams])

  return (
    <StyledPageCard>
        <StyledGroupTitleWrapper>
          <StyledGroupTitle>{PAGE_DETAILS[title].title}</StyledGroupTitle>
          <StyledGroupSubTitle>{PAGE_DETAILS[title].description}</StyledGroupSubTitle>
        </StyledGroupTitleWrapper>
        <StyledGroupFilterWrapper>
        <StyledGroupFilterLeftWrapper>
          <StyledGroupTableTitle>All {title} ({ pagination?.totalElements || 0 })</StyledGroupTableTitle>
        </StyledGroupFilterLeftWrapper>
        <StyledGroupFilterRightWrapper>
        <Space wrap>
          <ContainerTooltip title="New" color="#12CC1B">
            <StyledIconWrapper><StyledNewIcon onClick={showDrawer} /></StyledIconWrapper>
          </ContainerTooltip>
          {title !== DomianEnum.ROLES &&
          <>
          <ContainerTooltip title="Delete record" color="#f50">
          <StyledIconWrapper><StyledDeleteIcon onClick={handleDelete} /></StyledIconWrapper>
          </ContainerTooltip>
          <ContainerTooltip title="Filter record" color="#FBC11E">
            <StyledIconWrapper><StyledFilterIcon onClick={showFilter} /></StyledIconWrapper>
          </ContainerTooltip>
          </>
         }
        </Space>
        </StyledGroupFilterRightWrapper>
      </StyledGroupFilterWrapper>
      <StyledBottomContainer>
        <StyledTableCardWrapper>
          <StyledTable 
           loading={isLoading} 
           dataSource={data?.data?.data || []} 
           columns={columns} 
           rowKey={(record: any) => record?.id}
           scroll={{ x: width ? width : 2000 }}
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
          <FormComponent 
            key={statusMode && selectedRecord?.id}
            open={open} 
            onClose={onClose} 
            editedRecord={selectedRecord} 
            statusMode={statusMode}
           />
         }
        {openFilter &&
          <ProjectFilter 
            open={openFilter} 
            onClose={onCloseFilter} 
            onFilterChange={onFilterChange}
           />
         }
      </StyledBottomContainer>
    </StyledPageCard>
  );
};

export default GroupPage;
