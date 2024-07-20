import { Collapse, Tabs, TabsProps, Tag } from 'antd'
import React from 'react'
import { PanelTitle, StyledComment, StyledInfo, StyledPageCard, StyledPageCardWrapper, StyledProgress, StyledTagContainer, StyledTitle, StyledTitleContainer, StyledTopContainer } from '../index.styled';
import ProjectInformation from './ProjectInformation';
import { Comment, CommentForm } from '_lib';

const { Panel } = Collapse;

const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: <>
        <CommentForm />
        <Comment />
      </>,
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
];
  
const ProjectDetail = () => {
    const onChange = (key: string) => {
        console.log(key);
      };
  return (
    <StyledPageCard>
    <StyledPageCardWrapper>
      <StyledTopContainer>
        <StyledProgress size="small" type="circle" strokeColor={"#12CC1B"} percent={75} />
        <StyledTitleContainer>
            <StyledTitle>Project 1</StyledTitle>
            <StyledTagContainer>
              <Tag>Completed</Tag> {"|"}
              <StyledComment /> |
              <StyledInfo /> 
            </StyledTagContainer>
        </StyledTitleContainer>
      </StyledTopContainer>
      
      <Collapse defaultActiveKey={['1']}>
        <Panel header={<PanelTitle>Description</PanelTitle>} key="1">
            <span>A dog is a type of domesticated animal.
             Known for its loyalty and faithfulness,the world.</span>
        </Panel>
    </Collapse>
    <ProjectInformation />
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </StyledPageCardWrapper>
    </StyledPageCard>
  )
}

export default ProjectDetail