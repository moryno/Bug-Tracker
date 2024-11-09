import { DomianEnum } from "_constants";
import { useGetAll } from "_hooks";
import { FilterCollapseComponent, MediumDrawer, StyledDomainFilterContainer } from "_lib"
import { RoleService } from "_services";
import { Form, Input,  message,  Radio,  Select,  Space } from "antd"
import { IFilterProps } from "pages/projects/components/ProjectFilter";
import { StyledFormCheckboxWrapper, StyledStatusDot } from "pages/projects/index.styled";
import { useCallback, useState } from "react";

const { Option } = Select;

export interface UserFilterValues {
  fullName?: any;
  role?: any;
  status?: string;
}

const UserFilter = ({ open, onClose, onFilterChange} : IFilterProps) => {
    const { isLoading: isRolesLoading, data: rolesData } = useGetAll(RoleService.getRoles, `${DomianEnum.ROLES}-roles`);
    const [filterValues, setFilterValues] = useState<UserFilterValues>({});

    const handleFilterChange = (value: any) => {
      setFilterValues(prev => (
        { ...prev, ...value }
      ))
    };
  
    const onFinish = useCallback(() => {
      if(Object.entries(filterValues).length === 0 ) return message.warning("Choose the parameters to filter.");
   
      onFilterChange(filterValues)
    }, [filterValues, onFilterChange])
  

  return (
    <MediumDrawer
        onClose={onClose} 
        open={open} 
        onFinish={onFinish}
        title={`User Filters`} 
        width={450}
        submitText="Filter"
    >
     <StyledDomainFilterContainer className='scrollbar-hide'>
      <Form onValuesChange={handleFilterChange}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <FilterCollapseComponent 
            title="Full Name" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
                name="fullName"
                label={false}
            >
             <Input placeholder="Filter by full name" />
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Role" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
                name="role"
                label={false}
            >
              <Select
                placeholder="Please select role"
                loading={isRolesLoading}
                allowClear
                >
                {rolesData?.data?.data && 
                    rolesData?.data?.data?.map( (role: any) => (
                        <Option key={role?.id} value={role?.name}>{ role?.name}</Option>
                ))}
             </Select>
            </Form.Item>
        </FilterCollapseComponent>
       
        <FilterCollapseComponent 
            title="Status" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
                name="status"
                label={false}
            >
            <Radio.Group style={{ width: "100%" }}>
            <StyledFormCheckboxWrapper>
                <Radio value="Active">Active</Radio>
                <StyledStatusDot color={"active"} />
            </StyledFormCheckboxWrapper>
            <StyledFormCheckboxWrapper>
                 <Radio value="InActive">In Active</Radio>
                 <StyledStatusDot color={"cancelled"} />
            </StyledFormCheckboxWrapper>
          </Radio.Group>
          </Form.Item>
        </FilterCollapseComponent>
        </Space>
        </Form>
    </StyledDomainFilterContainer>
    </MediumDrawer>
  )
}

export default UserFilter