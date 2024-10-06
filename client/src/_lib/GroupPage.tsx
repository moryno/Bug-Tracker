import React, { useCallback, useMemo, useState } from "react";
import { MenuProps, message, Space } from 'antd';
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
import ContainerButton from "./ContainerButton";
import { StyledTable, StyledTableCardWrapper } from "./StyledComponents";
import { useDeleteRecord, useGetAll } from "_hooks";
import { AnyObject } from "antd/es/_util/type";
import { IBug, IProject } from "interfaces";
import ContainerDropDown from "./ContainerDropDown";
import { actionDropdownItems as items } from "_constants";
import { AxiosResponse } from "axios";
import { StyledAppHeaderSearch } from "./Layout/AppHeader/index.styled";
import { FaPlus } from "react-icons/fa6";

interface Iprops {
  title: string;
  FormComponent: React.FC<{ open: boolean; onClose: () => void; editedRecord: any; statusMode: string}>;
  columns: any[],
  getAllService: () => Promise<AxiosResponse<any, any>>,
  getDetailService: (id: string) => Promise<AxiosResponse<any, any>>,
  deleteService?: (id: string) => Promise<AxiosResponse<any, any>>,
  width?: number | string
}

const GroupPage: React.FC<Iprops> = ({ 
  title, 
  FormComponent, 
  columns, 
  getAllService, 
  getDetailService, 
  deleteService,
  width
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | IBug | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<IProject[] | IBug[] | AnyObject[] | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, data } = useGetAll(getAllService, title);
  const deleteRecord = useDeleteRecord(deleteService, title)

  
  const handleDelete = useCallback(async () => {
    if(!selectedRecords) return message.warning("Please select a record to delete");
    const recordId  = selectedRecords[0]?.id
    
    try {
      await deleteRecord.mutateAsync(recordId)
    } catch (error) {
      console.log(error);
    }
  }, [deleteRecord, selectedRecords]);

  const handleMenuClick: MenuProps['onClick'] = useCallback((e: any) => {
    if(e && e.key === "1"){
     handleDelete()
    }
 },[handleDelete]);

  const menuProps = useMemo(() => ({
    items,
    onClick: handleMenuClick,
  }), [handleMenuClick]);

  const showDrawer = useCallback(() => {
    setOpen(true);
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

  return (
    <StyledPageCard>
        <StyledGroupTitleWrapper>
          <StyledGroupTitle>Team management</StyledGroupTitle>
          <StyledGroupSubTitle>Manage your team members and their account permissions and roles here.</StyledGroupSubTitle>
        </StyledGroupTitleWrapper>
        <StyledGroupFilterWrapper>
        <StyledGroupFilterLeftWrapper>
          <StyledGroupTableTitle>All users 44</StyledGroupTableTitle>
        </StyledGroupFilterLeftWrapper>
        <StyledGroupFilterRightWrapper>
        <Space wrap>
           <StyledAppHeaderSearch />
           <ContainerDropDown menuProps={menuProps} />
           <ContainerButton
            title={`Add ${title}`}
            size="middle"
            icon={<FaPlus size={16} /> }
            onClick={showDrawer}
            type="primary"
           />
        </Space>
        </StyledGroupFilterRightWrapper>
      </StyledGroupFilterWrapper>
      <StyledBottomContainer>
        <StyledTableCardWrapper>
          <StyledTable 
           loading={isLoading} 
           dataSource={data?.data || []} 
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
      </StyledBottomContainer>
    </StyledPageCard>
  );
};

export default GroupPage;
