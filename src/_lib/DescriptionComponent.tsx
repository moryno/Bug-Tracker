import React from 'react'
import { PanelTitle, StyledComment } from './StyledComponents'
import { Collapse } from 'antd';

const { Panel } = Collapse;

const DescriptionComponent = () => {
  return (
    <Collapse defaultActiveKey={['1']}>
    <Panel header={<PanelTitle>Description</PanelTitle>} key="1">
        <StyledComment>A dog is a type of domesticated animal.
         Known for its loyalty and faithfulness,the world.</StyledComment>
    </Panel>
</Collapse>
  )
}

export default DescriptionComponent