import React, { useCallback, useMemo, useState } from "react";
import { MenuProps, message, Space } from 'antd';
import {
  StyledBottomContainer,
  StyledButtonContainer,
  StyledFilterContainer,
  StyledPageCard,
  StyledTopContainer,
} from "./index.styled";
import ContainerButton from "./ContainerButton";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { StyledTable, StyledTableCardWrapper } from "./StyledComponents";
import { useDeleteRecord, useGetAll } from "_hooks";
import { AnyObject } from "antd/es/_util/type";
import { IBug, IProject } from "interfaces";
import ContainerDropDown from "./ContainerDropDown";
import { actionDropdownItems as items } from "_constants";
import { AxiosResponse } from "axios";

interface Iprops {
  title: string;
  FormComponent: React.FC<{ open: boolean; onClose: () => void; editedRecord: any; statusMode: string}>;
  columns: any[],
  getAllService: () => Promise<AxiosResponse<any, any>>,
  getDetailService: (id: string) => Promise<AxiosResponse<any, any>>,
  deleteService: (id: string) => Promise<AxiosResponse<any, any>>
}

const GroupPage: React.FC<Iprops> = ({ 
  title, 
  FormComponent, 
  columns, 
  getAllService, 
  getDetailService, 
  deleteService
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | IBug | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<IProject[] | IBug[] | AnyObject[] | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, error, data } = useGetAll(getAllService, title);
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: AnyObject[]) => {
      setSelectedRecords(selectedRows)
    },
    getCheckboxProps: (record: AnyObject) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      // name: record.name,
    }),
  };

  return (
    <StyledPageCard>
      <StyledTopContainer>
        <StyledFilterContainer>
          All Projects <MdOutlineArrowDropDown />
        </StyledFilterContainer>
        <StyledButtonContainer>
          <Space wrap>
           <ContainerDropDown menuProps={menuProps} />
           <ContainerButton
            title={`New ${title}`}
            size="middle"
            onClick={showDrawer}
            type="primary"
           />
         </Space>
        </StyledButtonContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledTableCardWrapper>
          <StyledTable 
           loading={isLoading} 
           dataSource={data?.data || []} 
           columns={columns} 
           rowKey={(record) => record.id}
           scroll={{ x: 2000 }}
           rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
           onRow={(record, rowIndex) => {
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
