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
import { ProjectService } from "_services";
import { AnyObject } from "antd/es/_util/type";
import { IProject } from "interfaces";
import ContainerDropDown from "./ContainerDropDown";
import { actionDropdownItems as items } from "_constants";

interface Iprops {
  title: string;
  FormComponent: React.FC<{ open: boolean; onClose: () => void; editedRecord: IProject | null; statusMode: string}>;
  columns: any[]
}

const GroupPage: React.FC<Iprops> = ({ title, FormComponent, columns }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IProject | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<IProject[] | AnyObject[] | null>(null);
  const [statusMode, setStatusMode] = useState("CreateMode");
  const { isLoading, error, data } = useGetAll(ProjectService.getProjects, title);
  const deleteService = useDeleteRecord(ProjectService.deleteProject, title)

  
  const handleDelete = useCallback(async () => {
    if(!selectedRecords) return message.warning("Please select a record to delete");
    const recordId  = selectedRecords[0]?.id
    
    try {
      await deleteService.mutateAsync(recordId)
    } catch (error) {
      console.log(error);
    }
  }, [deleteService, selectedRecords]);

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
      const { data } = await ProjectService.getProject(record.id);
      setSelectedRecord(data);
      setStatusMode("EditMode");
      showDrawer();
    } catch (error) {
      console.log(error);
      setOpen(false)
    }
  }, [showDrawer]);

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
           scroll={{ x: 1900 }}
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
          <FormComponent 
           key={statusMode && selectedRecord?.id}
           open={open} 
           onClose={onClose} 
           editedRecord={selectedRecord} 
           statusMode={statusMode} />
      </StyledBottomContainer>
    </StyledPageCard>
  );
};

export default GroupPage;
