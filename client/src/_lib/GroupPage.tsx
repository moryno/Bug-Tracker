import React, { useCallback, useState } from "react";
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
import { useGetAll } from "_hooks";
import { ProjectService } from "_services";

interface Iprops {
  title: string;
  FormComponent: React.FC<{ open: boolean; onClose: () => void }>;
  columns: any[]
}

const GroupPage: React.FC<Iprops> = ({ title, FormComponent, columns }) => {
  const [open, setOpen] = useState(false);
   const { isLoading, error, data } = useGetAll(ProjectService.getProjects, title)

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <StyledPageCard>
      <StyledTopContainer>
        <StyledFilterContainer>
          All Projects <MdOutlineArrowDropDown />
        </StyledFilterContainer>
        <StyledButtonContainer>
          <ContainerButton
            title={`New ${title}`}
            size="middle"
            onClick={showDrawer}
          />
        </StyledButtonContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledTableCardWrapper>
          <StyledTable loading={isLoading} dataSource={data?.data || []} columns={columns} rowKey={(record) => record.id} />
        </StyledTableCardWrapper>
          <FormComponent open={open} onClose={onClose} />
      </StyledBottomContainer>
    </StyledPageCard>
  );
};

export default GroupPage;
