import React, { useCallback, useState } from 'react'
import { 
    StyledBottomContainer, 
    StyledButtonContainer, 
    StyledFilterContainer, 
    StyledPageCard, 
    StyledTopContainer 
} from './index.styled'
import ContainerButton from './ContainerButton'
import { Table } from 'antd'
import ContainerDrawer from './ContainerDrawer'
import { MdOutlineArrowDropDown } from 'react-icons/md';

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

interface Iprops{
    title: string;
    FormComponent: () => JSX.Element;
}

const GroupPage: React.FC<Iprops> = ({ title, FormComponent,}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <StyledPageCard>
    <StyledTopContainer>
      <StyledFilterContainer>All Projects <MdOutlineArrowDropDown /></StyledFilterContainer>
      <StyledButtonContainer>
          <ContainerButton
            title={`New ${title}`}
            size="middle" 
            onClick={showDrawer}
           />
      </StyledButtonContainer>
     </StyledTopContainer>
    <StyledBottomContainer>
    <Table dataSource={dataSource} columns={columns} />;
    <ContainerDrawer 
      onClose={onClose} 
      open={open}
      title={`New ${title}`}
      width={720}
      >
      <FormComponent />
    </ContainerDrawer>
    </StyledBottomContainer>
  </StyledPageCard>
  )
}

export default GroupPage