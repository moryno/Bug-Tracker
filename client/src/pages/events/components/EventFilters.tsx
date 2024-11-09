import { FilterCollapseComponent, MediumDrawer, StyledDomainFilterContainer } from "_lib"
import {  DatePicker, Form, Input,  message,  Space } from "antd"
import { IFilterProps } from "pages/projects/components/ProjectFilter";
import { useCallback, useState } from "react";

export interface EventFilterValues {
  startDate?: any;
  endDate?: any;
  location?: string;
  title?: string;
}

const EventFilter = ({ open, onClose, onFilterChange } : IFilterProps) => {
  const [filterValues, setFilterValues] = useState<EventFilterValues>({});

  const handleFilterChange = (value: any) => {
    setFilterValues(prev => (
      { ...prev, ...value }
    ))
  };

  const onFinish = useCallback(() => {
    if(Object.entries(filterValues).length === 0 ) return message.warning("Choose the parameters to filter.");
    if((filterValues.endDate && filterValues.startDate) && filterValues.endDate < filterValues.startDate) 
      return message.warning("End date cannot be less than the start date.");

    onFilterChange(filterValues)
  }, [filterValues, onFilterChange])


  return (
    <MediumDrawer
        onClose={onClose} 
        open={open} 
        onFinish={onFinish}
        title={`Event Filters`} 
        width={450}
        submitText="Filter"
    >
      <StyledDomainFilterContainer className='scrollbar-hide'>
      <Form onValuesChange={handleFilterChange}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <FilterCollapseComponent 
            title="Title" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="title"
              label={false}
            >
            <Input placeholder="Filter by event title" />
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="Location" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="location"
              label={false}
            >
           <Input placeholder="Filter by location" />
           </Form.Item>
        </FilterCollapseComponent>
       
        <FilterCollapseComponent 
            title="Start Date" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="startDate"
              label={false}
              style={{ width: '100%' }}
            >
              <DatePicker
                showTime
                style={{ width: "100%" }}
              />
            </Form.Item>
        </FilterCollapseComponent>
        <FilterCollapseComponent 
            title="End Date" 
            onchange={function (e: any): void {
              throw new Error("Function not implemented.")
          } }>
            <Form.Item
              name="endDate"
              label={false}
            >
              <DatePicker
                showTime
                style={{ width: "100%" }}
              />
            </Form.Item>
        </FilterCollapseComponent>
        </Space>
        </Form>
      </StyledDomainFilterContainer>
    </MediumDrawer>
  )
}

export default EventFilter